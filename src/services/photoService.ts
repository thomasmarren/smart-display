import {
  GooglePhotos,
  GooglePhotosPhotoResponse,
} from "@/clients/googlePhotos";
import prisma from "@/config/prisma";
import { Orientation } from "@/pages/api/types";
import { Album } from "@prisma/client";

export class PhotoService {
  public static async createFromAlbum({
    albumId,
    pageToken,
  }: {
    albumId: Album["id"];
    pageToken?: string;
  }) {
    const googlePhotosClient = await new GooglePhotos().connect();

    const photos = [];
    const response: GooglePhotosPhotoResponse =
      await googlePhotosClient.photosForAlbum({
        albumId,
        pageToken,
      });

    for (let index = 0; index < response.mediaItems.length; index++) {
      const item = response.mediaItems[index];
      const orientation =
        parseInt(item.mediaMetadata.width) > parseInt(item.mediaMetadata.height)
          ? Orientation.LANDSCAPE
          : Orientation.PORTRAIT;

      const photo = await prisma.photo.upsert({
        create: {
          id: item.id,
          orientation,
          albumId,
          creationTime: item.mediaMetadata.creationTime,
        },
        update: {},
        where: {
          id: item.id,
        },
      });

      photos.push(photo);
    }

    const nextPageToken = response.nextPageToken || null;

    return { photos, nextPageToken };
  }
}
