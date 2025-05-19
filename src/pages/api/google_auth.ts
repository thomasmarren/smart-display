import { Controller } from "@/config/controller";
import prisma from "@/config/prisma";
import { routeHandler } from "@/config/routeHandler";
import { CALENDAR_READ_ONLY, PHOTOS_READ_ONLY } from "@/constants";
import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";

export const revalidate = 0;

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_AUTH_CLIENT_ID,
  process.env.GOOGLE_AUTH_CLIENT_SECRET,
  `${process.env.API_URL}/google_callback`
);

type GetData =
  | {
      isAuthenticated: boolean;
    }
  | { message: string };
type PostData = any;
export type GoogleAuthData = GetData | PostData;

export class GoogleAuthController extends Controller {
  async GET(req: NextApiRequest, res: NextApiResponse<GetData>) {
    try {
      if (!req.query.code) {
        const googleToken = await prisma.googleToken.findFirstOrThrow({});

        let isAuthenticated = false;
        if (googleToken) isAuthenticated = true;
        return res.status(200).send({ isAuthenticated });
      }

      const { tokens } = await oauth2Client.getToken(req.query.code as string);
      const googleToken = await prisma.googleToken.findFirst();
      await prisma.googleToken.upsert({
        create: {
          accessToken: tokens.access_token as string,
          refreshToken: tokens.refresh_token as string,
          expiryDate: tokens.expiry_date as number,
        },
        update: {
          accessToken: tokens.access_token as string,
          refreshToken: tokens.refresh_token as string,
          expiryDate: tokens.expiry_date as number,
        },
        where: {
          id: googleToken?.id || 0,
        },
      });

      res.status(200).json({ isAuthenticated: true });
    } catch (e: any) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  }

  async POST(_req: NextApiRequest, res: NextApiResponse<PostData>) {
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: [PHOTOS_READ_ONLY, CALENDAR_READ_ONLY],
      prompt: "consent",
      include_granted_scopes: true,
    });

    res.status(200).json({ url });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoogleAuthData>
) {
  return routeHandler(new GoogleAuthController(), req, res);
}
