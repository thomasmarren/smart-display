import prisma from "@/config/prisma";
import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_AUTH_CLIENT_ID,
  process.env.GOOGLE_AUTH_CLIENT_SECRET,
  `${process.env.API_URL}/google_callback`
);

type GoogleCalendarResponse = {
  items: {
    colorId: string;
    description?: string;
    summary: string;
    start: {
      dateTime?: string;
      date?: string;
      timeZone?: string;
    };
  }[];
};

// https://developers.google.com/calendar/api/v3/reference
export class GoogleCalendar {
  accessToken: string;

  constructor() {
    this.accessToken = "";
  }

  public async connect() {
    const {
      accessToken: googleAccessToken,
      expiryDate,
      refreshToken,
    } = await prisma.googleToken.findFirstOrThrow();

    let accessToken = googleAccessToken;
    if (new Date(Number(expiryDate)) < new Date()) {
      oauth2Client.setCredentials({
        refresh_token: refreshToken,
      });
      const response = await oauth2Client.refreshAccessToken();
      accessToken = response.credentials.access_token as string;
    }

    this.accessToken = accessToken;

    return this;
  }

  public async events({ calendarId }: { calendarId: string }) {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${new URLSearchParams(
      {
        timeMin: new Date().toISOString(),
        orderBy: "startTime",
        singleEvents: "true",
      }
    )}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    const data: GoogleCalendarResponse = await response.json();

    const colors = await this.colors();

    return data.items.flatMap((item) => {
      if (item.description?.match(/hideFromDisplay/)) return [];

      const {
        start: { dateTime, date, timeZone },
        summary: name,
        colorId,
      } = item;

      return [
        {
          date: dateTime || date,
          time: dateTime
            ? new Date(dateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: timeZone || "EST",
              })
            : null,
          name,
          color: colors.event?.[colorId]?.background || "#4285F4",
        },
      ];
    });
  }

  private async colors() {
    const url = `https://www.googleapis.com/calendar/v3/colors`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    const data: { event: { [key: string]: { background: string } } } =
      await response.json();

    return data;
  }
}
