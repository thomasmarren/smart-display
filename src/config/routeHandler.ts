import { HttpMethod } from "@/constants";
import { AlbumsController } from "@/pages/api/albums";
import { EcobeeController } from "@/pages/api/ecobee";
import { EcobeeAuthController } from "@/pages/api/ecobee_auth";
import { GoogleAuthController } from "@/pages/api/google_auth";
import { HolidaysController } from "@/pages/api/holidays";
import { PhotosController } from "@/pages/api/photos";
import { SpotifyController } from "@/pages/api/spotify";
import { NextApiRequest, NextApiResponse } from "next";

export const routeHandler = async (
  controller:
    | typeof AlbumsController.prototype
    | typeof GoogleAuthController.prototype
    | typeof PhotosController.prototype
    | typeof SpotifyController.prototype
    | typeof EcobeeAuthController.prototype
    | typeof EcobeeController.prototype
    | typeof HolidaysController.prototype,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const notFound = typeof controller[req.method as HttpMethod] !== "function";
  return controller[req.method as HttpMethod](req, res);
};
