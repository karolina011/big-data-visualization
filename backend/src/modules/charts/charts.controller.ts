import {NextFunction, Request, Response} from "express";
import ChartsRepository from "./charts.repository";

export default class ChartsController {


  async cities(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const repo = new ChartsRepository();
      const body = await repo.find();

      return res.status(200).json(body);
    } catch (e) {
      console.log(e);
      next();
    }
  }

}
