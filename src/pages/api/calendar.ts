import { GoogleCalendar } from "./../../clients/googleCalendar";
import { Controller } from "@/config/controller";
import { routeHandler } from "@/config/routeHandler";
import { HttpStatus } from "@/constants";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/config/prisma";
import { Calendar } from "@prisma/client";

export type GetData = any;
export type PostData = Calendar;
export type CalendarControllerData = GetData;

export class CalendarController extends Controller {
  async GET(_req: NextApiRequest, res: NextApiResponse<GetData>) {
    const googleCalendar = await new GoogleCalendar().connect();

    const calendars = await prisma.calendar.findMany();
    const events = await googleCalendar.events({ calendarId: calendars[0].id });

    res.status(HttpStatus.OK).json({ events });
  }

  async POST(req: NextApiRequest, res: NextApiResponse<PostData>) {
    const { id, ...rest } = req.body;
    const calendar = await prisma.calendar.upsert({
      where: { id: req.body.id },
      create: {
        ...req.body,
      },
      update: {
        ...rest,
      },
    });

    res.status(HttpStatus.OK).json(calendar);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CalendarControllerData>
) {
  return routeHandler(new CalendarController(), req, res);
}
