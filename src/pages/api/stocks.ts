import { Controller } from "@/config/controller";
import { routeHandler } from "@/config/routeHandler";
import { HttpStatus } from "@/constants";
import type { NextApiRequest, NextApiResponse } from "next";

export type GetData = any;
export type StocksControllerData = GetData;

export class StocksController extends Controller {
  async GET(_req: NextApiRequest, res: NextApiResponse<GetData>) {
    // const params = {
    //   apikey: process.env.ALPHA_ADVANTAGE_API_KEY as string,
    //   function: "TIME_SERIES_WEEKLY_ADJUSTED",
    //   symbol: "VTI",
    // };

    // const response = await fetch(
    //   `https://www.alphavantage.co/query?${new URLSearchParams(params)}`
    // );
    // const data = await response.json();
    // if (data.Note) {
    //   return res.status(HttpStatus.OK).json([]);
    // }
    // const formattedData = Object.keys(data["Weekly Adjusted Time Series"])
    //   .slice(0, 24)
    //   .map((date) => ({ time: new Date(date).getTime(), key: date }))
    //   .sort((a, b) => a.time + b.time);

    // const responseData = formattedData.map((row) => {
    //   const section = data["Weekly Adjusted Time Series"][row.key];
    //   return {
    //     time: row.time,
    //     high: parseFloat(section["2. high"]),
    //     low: parseFloat(section["3. low"]),
    //     close: parseFloat(section["4. close"]),
    //   };
    // });

    const responseData = [
      { time: 1689292800000, high: 224.86, low: 217.8004, close: 223.95 },
      { time: 1688688000000, high: 220.94, low: 216.8319, close: 218.04 },
      { time: 1688083200000, high: 220.86, low: 214.14, close: 220.28 },
      { time: 1687478400000, high: 218.67, low: 214.58, close: 214.94 },
      { time: 1686873600000, high: 221.42, low: 214.05, close: 219.26 },
      { time: 1686268800000, high: 215.08, low: 207.465, close: 213.93 },
      { time: 1685664000000, high: 213.085, low: 206.3031, close: 212.71 },
      { time: 1685059200000, high: 208.81, low: 203.69, close: 208.36 },
      { time: 1684454400000, high: 208.84, low: 203.47, close: 207.69 },
      { time: 1683849600000, high: 205.9395, low: 202.93, close: 204.22 },
      { time: 1683244800000, high: 207.18, low: 200.2, close: 204.69 },
      { time: 1682640000000, high: 206.3, low: 200.41, close: 206.3 },
      { time: 1682035200000, high: 206.83, low: 203.92, close: 205 },
      { time: 1681430400000, high: 206.5, low: 201.65, close: 205.08 },
      { time: 1680739200000, high: 205.06, low: 201.45, close: 203.2 },
      { time: 1680220800000, high: 204.19, low: 196.14, close: 204.1 },
      { time: 1679616000000, high: 201.405, low: 193.65, close: 196.93 },
      { time: 1679011200000, high: 197.91, low: 190.18, close: 195.19 },
      { time: 1678406400000, high: 204.98, low: 192.26, close: 193.26 },
      { time: 1677801600000, high: 203.7, low: 197.495, close: 203.57 },
      { time: 1677196800000, high: 203.5, low: 198.16, close: 199.48 },
      { time: 1676592000000, high: 208.6593, low: 203.531, close: 205.08 },
      { time: 1675987200000, high: 209.563, low: 203.47, close: 205.01 },
      { time: 1675382400000, high: 210.88, low: 201.09, close: 207.84 },
    ];

    res.status(HttpStatus.OK).json(responseData);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StocksControllerData>
) {
  return routeHandler(new StocksController(), req, res);
}
