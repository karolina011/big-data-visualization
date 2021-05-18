import {NextFunction, Request, Response} from "express";
import ChartsRepository from "./charts.repository";
import {ChartsParams} from "./types";

export default class ChartsController {


  async countries(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const params = req.query;
      params.aggregated = params.aggregated ? JSON.parse(params.aggregated as unknown as string) : undefined;
      params.yearsRange = params.yearsRange ? JSON.parse(params.yearsRange as unknown as string) : undefined;
      params.top = params.top ? JSON.parse(params.top as unknown as string) : undefined;

      const repo = new ChartsRepository();
      //@ts-ignore
      const body = await repo.getByCountries(params);

      return res.status(200).json(body);
    } catch (e) {
      console.log(e);
      next();
    }
  }


  async countriesList(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const params = req.query;
      const repo = new ChartsRepository();
      //@ts-ignore
      const body = await repo.getCountries(params.continent);

      return res.status(200).json(body);
    } catch (e) {
      console.log(e);
      next();
    }
  }

}
