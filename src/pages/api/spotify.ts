import { Controller } from "@/config/controller";
import prisma from "@/config/prisma";
import { routeHandler } from "@/config/routeHandler";
import { HttpStatus } from "@/constants";
import type { NextApiRequest, NextApiResponse } from "next";

export type GetData = {
  isPlaying: boolean;
  album: string | null;
  artist: string | null;
  track: string | null;
  albumUrl: string;
};
export type SpotifyControllerData = GetData;

export class SpotifyController extends Controller {
  async GET(_req: NextApiRequest, res: NextApiResponse<GetData>) {
    const token = await prisma.spotifyToken.findFirstOrThrow();
    let accessToken = token.accessToken;

    if (new Date(Number(token.expiryDate)) < new Date()) {
      const clientString = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body: new URLSearchParams({
          refresh_token: token.refreshToken,
          grant_type: "refresh_token",
        }).toString(),
        headers: {
          Authorization: `Basic ${Buffer.from(clientString).toString(
            "base64"
          )}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const tokens = await response.json();
      accessToken = tokens.access_token as string;
      await prisma.spotifyToken.update({
        where: { id: token.id },
        data: {
          accessToken,
          expiryDate: new Date().getTime() + tokens.expires_in,
        },
      });
    }

    const currentlyPlayingResponse = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (currentlyPlayingResponse.status === 204) {
      return res.status(HttpStatus.OK).json({
        isPlaying: false,
        album: null,
        artist: null,
        track: null,
        albumUrl: "",
      });
    }
    const currentlyPlaying: {
      item: {
        album: {
          name: string;
          images: {
            height: 300;
            url: string;
            width: 300;
          }[];
        };
        artists: {
          name: string;
        }[];
        name: string;
      };
      is_playing: boolean;
    } = await currentlyPlayingResponse.json();

    const albumUrl = currentlyPlaying.item.album.images.find(
      (image) => image.height === 300
    ) as { url: string };
    res.status(HttpStatus.OK).json({
      isPlaying: currentlyPlaying.is_playing,
      album: currentlyPlaying.item.album.name,
      artist: currentlyPlaying.item.artists[0].name,
      track: currentlyPlaying.item.name,
      albumUrl: albumUrl.url,
    });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SpotifyControllerData>
) {
  return routeHandler(new SpotifyController(), req, res);
}
