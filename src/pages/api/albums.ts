import { GooglePhotos } from "@/clients/googlePhotos";
import { Controller } from "@/config/controller";
import prisma from "@/config/prisma";
import { routeHandler } from "@/config/routeHandler";
import { HttpStatus } from "@/constants";
import { Album } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type GetData = Album[];
type PostData = Album[];
type DeleteData = { message: string };
export type AlbumsControllerData = GetData | PostData | DeleteData;

export class AlbumsController extends Controller {
  async GET(_req: NextApiRequest, res: NextApiResponse<GetData>) {
    const albums = await prisma.album.findMany();
    res.status(HttpStatus.OK).json(albums);
  }

  async POST(_req: NextApiRequest, res: NextApiResponse<PostData>) {
    const googlePhotosClient = await new GooglePhotos().connect();
    const { albums: googlePhotosAlbums } = await googlePhotosClient.albums();

    const albums = await Promise.all(
      googlePhotosAlbums.map((album) => {
        return prisma.album.create({
          data: {
            id: album.id,
            title: album.title,
            show: false,
          },
        });
      })
    );

    res.status(HttpStatus.CREATED).json(albums);
  }

  async DELETE(_req: NextApiRequest, res: NextApiResponse<DeleteData>) {
    await prisma.album.deleteMany();
    res.status(HttpStatus.OK).json({ message: "Deleted all albums" });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AlbumsControllerData>
) {
  return routeHandler(new AlbumsController(), req, res);
}
