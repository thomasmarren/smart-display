import { Controller } from "@/config/controller";
import prisma from "@/config/prisma";
import { routeHandler } from "@/config/routeHandler";
import { HttpStatus } from "@/constants";
import { Holiday } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export type GetData = Holiday[];
export type PostData = Holiday[];
export type HolidaysControllerData = GetData;

export class HolidaysController extends Controller {
  async GET(_req: NextApiRequest, res: NextApiResponse<GetData>) {
    const holidays = await prisma.holiday.findMany();
    res.status(HttpStatus.OK).json(holidays);
  }

  async POST(req: NextApiRequest, res: NextApiResponse<PostData>) {
    const holidays = [];
    for (const data of req.body) {
      let holiday = await prisma.holiday.findFirst({
        where: { name: data.name },
      });
      if (holiday) continue;

      holiday = await prisma.holiday.create({ data });
      holidays.push(holiday);
    }
    res.status(HttpStatus.OK).json(holidays);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HolidaysControllerData>
) {
  return routeHandler(new HolidaysController(), req, res);
}
