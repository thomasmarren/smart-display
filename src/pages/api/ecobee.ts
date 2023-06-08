import { Controller } from "@/config/controller";
import prisma from "@/config/prisma";
import { routeHandler } from "@/config/routeHandler";
import { HttpStatus } from "@/constants";
import type { NextApiRequest, NextApiResponse } from "next";

export type GetData = {
  humidity: number;
  temperature: number;
  hvacMode: "heat" | "cool" | "off";
  running: boolean;
};
export type EcobeeControllerData = GetData;

export class EcobeeController extends Controller {
  async GET(_req: NextApiRequest, res: NextApiResponse<GetData>) {
    try {
      const token = await prisma.ecobeeToken.findFirstOrThrow();
      let accessToken = token.accessToken;

      if (new Date(Number(token.expiryDate)) < new Date()) {
        const response = await fetch(
          `https://api.ecobee.com/token?${new URLSearchParams({
            code: token.refreshToken as string,
            grant_type: "refresh_token",
            client_id: process.env.ECOBEE_API_KEY as string,
          }).toString()}`,
          {
            method: "POST",
          }
        );
        const tokens = await response.json();

        await prisma.ecobeeToken.update({
          where: { id: token.id },
          data: {
            accessToken: tokens.access_token,
            expiryDate: this.newExpiryDate(tokens.expires_in),
          },
        });
      }

      const thermostatSummaryResponse = await fetch(
        'https://api.ecobee.com/1/thermostat?format=json&body={"selection":{"selectionType":"registered","selectionMatch":"","includeRuntime":true,"includeSettings":true,"includeEquipmentStatus":true}}',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const thermostatSummary = await thermostatSummaryResponse.json();

      if (!thermostatSummary.thermostatList) {
        return res.status(HttpStatus.OK).json({
          humidity: 0,
          temperature: 0,
          hvacMode: "off",
          running: false,
        });
      }

      const thermostat = thermostatSummary.thermostatList[0];
      const thermostatRuntime = thermostat.runtime;
      const thermostatSettings = thermostat.settings;
      const thermostatStatus = thermostat.equipmentStatus;

      const data = {
        humidity: Math.round(thermostatRuntime.actualHumidity * 0.1),
        temperature: Math.round(thermostatRuntime.actualTemperature * 0.1),
        hvacMode: thermostatSettings.hvacMode,
        running: !(thermostatStatus === "fan" || thermostatStatus === ""),
      };

      res.status(HttpStatus.OK).json(data);
    } catch (e) {
      console.error(e);
      res.status(HttpStatus.OK).json({
        humidity: 0,
        temperature: 0,
        hvacMode: "off",
        running: false,
      });
    }
  }

  private newExpiryDate(expiresIn: number) {
    return new Date().getTime() + expiresIn * 1000;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EcobeeControllerData>
) {
  return routeHandler(new EcobeeController(), req, res);
}
