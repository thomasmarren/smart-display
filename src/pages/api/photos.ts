import { GooglePhotos } from "@/clients/googlePhotos";
import { Controller } from "@/config/controller";
import prisma from "@/config/prisma";
import { routeHandler } from "@/config/routeHandler";
import { HttpStatus } from "@/constants";
import { PhotoService } from "@/services/photoService";
import { hoursAgo } from "@/utils/dates";
import { shuffle } from "@/utils/shuffle";
import { Photo } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { Orientation } from "./types";

type GetData = Photo[];
type PostData = Photo[] | { message: string };
export type PhotosControllerData = GetData | PostData;

const TAKE = 50;

export class PhotosController extends Controller {
  async GET(_req: NextApiRequest, res: NextApiResponse<GetData>) {
    try {
      const orderDir = this.randomPick(["asc", "desc"]) as "asc" | "desc";
      let photos = await prisma.photo.findMany({
        take: TAKE,
        orderBy: [{ displayedCount: "asc" }, { sortOrder: orderDir }],
        select: {
          id: true,
          creationTime: true,
          orientation: true,
          album: true,
        },
      });

      const googlePhotosClient = await new GooglePhotos().connect();

      const googlePhotosPhotos = await googlePhotosClient.photosForIds({
        ids: photos.map((photo) => photo.id),
      });

      photos = photos.flatMap((photo) => {
        const googlePhotosPhoto = googlePhotosPhotos.find(
          (p: { id: string }) => p?.id === photo.id
        );

        if (!googlePhotosPhoto) return [];

        const { height, width } = googlePhotosPhoto.mediaMetadata;

        return [
          {
            ...photo,
            url: `${googlePhotosPhoto.baseUrl}=w${Math.ceil(
              width * 0.5
            )}-h${Math.ceil(height * 0.5)}`,
          },
        ];
      });

      const ids = photos.map((photo) => `'${photo.id}'`).join(",");
      await prisma.$executeRawUnsafe(
        `UPDATE Photo SET displayedCount = displayedCount + 1, sortOrder = random() WHERE id IN (${ids})`
      );

      const portrait = photos.filter(
        (photo) => photo.orientation === Orientation.PORTRAIT
      );
      const landscape = photos.filter(
        (photo) => photo.orientation === Orientation.LANDSCAPE
      );

      const photoSlides: any[] = [];

      landscape.forEach((landscapePhoto) => {
        photoSlides.push({
          orientation: Orientation.LANDSCAPE,
          photos: [landscapePhoto],
        });
      });
      portrait.forEach((_, i) => {
        const firstIndex = i * 2;
        const secondIndex = firstIndex + 1;
        if (!portrait[secondIndex]) return;

        photoSlides.push({
          orientation: Orientation.PORTRAIT,
          photos: [portrait[firstIndex], portrait[secondIndex]],
        });
      });

      res.status(HttpStatus.OK).json(shuffle(photoSlides));
    } catch (e) {
      console.error(e);
      res.status(HttpStatus.OK).json([]);
    }
  }

  async POST(_req: NextApiRequest, res: NextApiResponse<PostData>) {
    try {
      const album = await prisma.album.findFirst({
        where: {
          show: true,
          lastRefresh: {
            lt: hoursAgo(24),
          },
        },
        include: {
          Photo: true,
        },
        orderBy: {
          lastRefresh: "asc",
        },
      });

      if (!album) {
        console.log("No albums ready to refresh");
        return res
          .status(HttpStatus.OK)
          .send({ message: "No albums ready to refresh" });
      }

      const currentPhotosCount = album.Photo.length;

      const albumPhotos = await PhotoService.createFromAlbum({
        albumId: album.id,
      });

      const totalPhotosCount = albumPhotos.length;

      await prisma.album.update({
        data: {
          lastRefresh: new Date(),
        },
        where: { id: album.id },
      });

      res.status(HttpStatus.CREATED).json({
        message: `Created ${
          totalPhotosCount - currentPhotosCount
        } photos from ${album.title} album.`,
      });
    } catch (e: any) {
      console.error("Error in PhotosController#POST");
      console.error(e);

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: e.message });
    }
  }

  private randomPick(values: string[]) {
    const index = Math.floor(Math.random() * values.length);
    return values[index];
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PhotosControllerData>
) {
  return routeHandler(new PhotosController(), req, res);
}
