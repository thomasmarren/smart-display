import { HttpStatus } from "@/constants";
import { NextApiRequest, NextApiResponse } from "next";

export class Controller {
  async GET(req: NextApiRequest, res: NextApiResponse<any>) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `${req.method} - ${req.url} not implemented.` });
  }

  async POST(req: NextApiRequest, res: NextApiResponse<any>) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `${req.method} - ${req.url} not implemented.` });
  }

  async PUT(req: NextApiRequest, res: NextApiResponse<any>) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `${req.method} - ${req.url} not implemented.` });
  }

  async DELETE(req: NextApiRequest, res: NextApiResponse<any>) {
    return res
      .status(HttpStatus.NOT_FOUND)
      .json({ message: `${req.method} - ${req.url} not implemented.` });
  }
}
