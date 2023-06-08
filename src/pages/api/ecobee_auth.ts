import { Controller } from "@/config/controller";
import prisma from "@/config/prisma";
import { routeHandler } from "@/config/routeHandler";
import type { NextApiRequest, NextApiResponse } from "next";

type GetData = {
  ecobeePin: string;
  code: string;
  interval: string;
  expires_in: string;
  scope: "openid,offline_access,smartWrite";
};
type PostData =
  | {
      isAuthenticated: boolean;
    }
  | { message: string };

export type EcobeeAuthData = any;

export class EcobeeAuthController extends Controller {
  async GET(req: NextApiRequest, res: NextApiResponse<GetData>) {
    const scope = "smartWrite";

    const url =
      "https://api.ecobee.com/authorize?" +
      new URLSearchParams({
        response_type: "ecobeePin",
        client_id: process.env.ECOBEE_API_KEY as string,
        scope: scope,
      }).toString();

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data);
  }

  async POST(req: NextApiRequest, res: NextApiResponse<PostData>) {
    console.log(req.body);

    try {
      if (!req.body.code) {
        const ecobeeToken = await prisma.ecobeeToken.findFirst({
          where: { id: 1 },
        });

        let isAuthenticated = false;
        if (ecobeeToken) isAuthenticated = true;
        return res.status(200).send({ isAuthenticated });
      }

      const code = req.body.code || null;

      const response = await fetch(
        `https://api.ecobee.com/token?${new URLSearchParams({
          code: code as string,
          grant_type: "ecobeePin",
          client_id: process.env.ECOBEE_API_KEY as string,
        }).toString()}`,
        {
          method: "POST",
        }
      );
      const tokens = await response.json();

      if (tokens.error) {
        console.error(tokens);
        res.status(500).json({ message: tokens.error_description });
        return;
      }

      await prisma.ecobeeToken.upsert({
        create: {
          accessToken: tokens.access_token as string,
          refreshToken: tokens.refresh_token as string,
          expiryDate: (new Date().getTime() +
            tokens.expires_in * 1000) as number,
        },
        update: {
          accessToken: tokens.access_token as string,
          refreshToken: tokens.refresh_token as string,
          expiryDate: (new Date().getTime() +
            tokens.expires_in * 1000) as number,
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
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EcobeeAuthData>
) {
  return routeHandler(new EcobeeAuthController(), req, res);
}
