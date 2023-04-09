import { HttpMethod } from "@/constants";
import { AlbumsController } from "@/pages/api/albums";
import { GoogleAuthController } from "@/pages/api/google_auth";
import { PhotosController } from "@/pages/api/photos";
import { NextApiRequest, NextApiResponse } from "next";

export const routeHandler = async (
  controller:
    | typeof AlbumsController.prototype
    | typeof GoogleAuthController.prototype
    | typeof PhotosController.prototype,
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const notFound = typeof controller[req.method as HttpMethod] !== "function";
  return controller[req.method as HttpMethod](req, res);
};
