import { Controller } from "@/config/controller";
import prisma from "@/config/prisma";
import { routeHandler } from "@/config/routeHandler";
import type { NextApiRequest, NextApiResponse } from "next";

type GetData = any;
type PostData = any;
export type SpotifyAuthData = any;

export class SpotifyAuthController extends Controller {
  async GET(req: NextApiRequest, res: NextApiResponse<GetData>) {
    try {
      if (!req.query.code) {
        const spotifyToken = await prisma.spotifyToken.findFirst({
          where: { id: 1 },
        });

        let isAuthenticated = false;
        if (spotifyToken) isAuthenticated = true;
        return res.status(200).send({ isAuthenticated });
      }

      const code = req.query.code || null;
      const state = req.query.state || null;

      if (state === null) throw new Error();
      const clientString = `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`;

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        body: new URLSearchParams({
          code: code as string,
          redirect_uri: `${process.env.API_URL}/spotify_callback`,
          grant_type: "authorization_code",
        }).toString(),
        headers: {
          Authorization: `Basic ${Buffer.from(clientString).toString(
            "base64"
          )}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const tokens = await response.json();

      await prisma.spotifyToken.upsert({
        create: {
          accessToken: tokens.access_token as string,
          refreshToken: tokens.refresh_token as string,
          expiryDate: (new Date().getTime() + tokens.expires_in) as number,
        },
        update: {
          accessToken: tokens.access_token as string,
          refreshToken: tokens.refresh_token as string,
          expiryDate: (new Date().getTime() + tokens.expires_in) as number,
        },
        where: {
          id: 1,
        },
      });

      res.status(200).json({ isAuthenticated: true });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  }

  async POST(_req: NextApiRequest, res: NextApiResponse<PostData>) {
    var state = "123";
    var scope = "user-read-currently-playing";

    const url =
      "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID as string,
        scope: scope,
        redirect_uri: `${process.env.API_URL}/spotify_callback`,
        state: state,
      }).toString();

    res.status(200).json({ url });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SpotifyAuthData>
) {
  return routeHandler(new SpotifyAuthController(), req, res);
}
