import prisma from "@/config/prisma";
import { Album, Photo } from "@prisma/client";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_AUTH_CLIENT_ID,
  process.env.GOOGLE_AUTH_CLIENT_SECRET,
  `${process.env.API_URL}/google_callback`
);

type GooglePhotosAlbum = {
  id: string;
  title: string;
  productUrl: string;
  mediaItemsCount: string;
  coverPhotoBaseUrl: string;
  coverPhotoMediaItemId: string;
};
type GooglePhotosAlbumResponse = {
  albums: GooglePhotosAlbum[];
  nextPageToken?: string;
};

type GooglePhotosMediaItem = {
  id: string;
  baseUrl: string;
  mimeType: string;
  mediaMetadata: {
    creationTime: string;
    height: string;
    width: string;
  };
};
export type GooglePhotosPhotoResponse = {
  mediaItems: GooglePhotosMediaItem[];
  nextPageToken?: string;
};

// https://developers.google.com/photos/library/reference/rest
export class GooglePhotos {
  accessToken: string;

  constructor() {
    this.accessToken = "";
  }

  public async connect() {
    let {
      accessToken: googleAccessToken,
      expiryDate,
      refreshToken,
    } = await prisma.googleToken.findUniqueOrThrow({
      where: { id: 1 },
    });

    let accessToken = googleAccessToken;
    if (new Date(Number(expiryDate)) < new Date()) {
      console.log(
        `Google access token expired at ${new Date(
          Number(expiryDate)
        ).toLocaleString()}. Refreshing...`
      );
      oauth2Client.setCredentials({
        refresh_token: refreshToken,
      });
      const response = await oauth2Client.refreshAccessToken();
      accessToken = response.credentials.access_token as string;
      expiryDate = response.credentials.expiry_date as unknown as bigint;
      await prisma.googleToken.update({
        where: { id: 1 },
        data: {
          accessToken,
          expiryDate,
        },
      });
    }

    this.accessToken = accessToken;

    return this;
  }

  public async albums(): Promise<GooglePhotosAlbumResponse> {
    const response = await fetch(
      `https://photoslibrary.googleapis.com/v1/albums?pageSize=50`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.json();
  }

  public async photosForAlbum({
    albumId,
    pageToken,
  }: {
    albumId: Album["id"];
    pageToken?: string;
  }): Promise<GooglePhotosPhotoResponse> {
    const response = await fetch(
      `https://photoslibrary.googleapis.com/v1/mediaItems:search`,
      {
        method: "POST",
        body: JSON.stringify({
          albumId,
          ...(pageToken ? { pageToken } : {}),
          pageSize: 100,
        }),
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status >= 400) throw new Error(response.statusText);

    const data = await response.json();
    const photos = data.mediaItems.filter((item: GooglePhotosMediaItem) =>
      item.mimeType.match(/image/)
    );
    return { ...data, mediaItems: photos };
  }

  public async photosForIds({ ids }: { ids: Photo["id"][] }) {
    const url = `https://photoslibrary.googleapis.com/v1/mediaItems:batchGet?${new URLSearchParams(
      new URLSearchParams(ids.map((id) => ["mediaItemIds", id]))
    )}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    const data = await response.json();

    return data.mediaItemResults.map(
      (result: { mediaItem: object }) => result.mediaItem
    );
  }
}
