import {NextFunction, Request, Response} from "express";
import ChartsRepository from "./charts.repository";
import {AggregatedTypes, Continents, RegionGroups} from "./types";

export default class ChartsController {


  async getChartData(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const params = req.query;
      params.aggregated = params.aggregated ? JSON.parse(params.aggregated as unknown as string) : undefined;
      params.yearsRange = params.yearsRange ? JSON.parse(params.yearsRange as unknown as string) : undefined;
      params.top = params.top ? JSON.parse(params.top as unknown as string) : undefined;
      params.attackType = params.attackType ? JSON.parse(params.attackType as unknown as string) : undefined;
      //@ts-ignore
      const allowedRegions = this.getParsedContinents(params.aggregated.allowedContinents);
      const repo = new ChartsRepository();

      let body = {};
      //@ts-ignore
      switch (params.aggregated.type) {
        case AggregatedTypes.CITY:
          //@ts-ignore
          body = await repo.getByCity(params);
          break;
        case AggregatedTypes.COUNTRY:
          //@ts-ignore
          body = await repo.getByCountries(params, allowedRegions);
          break;
        case AggregatedTypes.CONTINENT:
          // body = await repo.getByCountries(params);
          break;
      }

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

  getParsedContinents(allowedContinents: string[]) {

    let allowed :string[] = [];

    for (let item of Object.values(Continents)) {
      if (allowedContinents.includes(item)){
        allowed =allowed.concat(RegionGroups[item])
      }
    }

    return allowed;
  }
}
