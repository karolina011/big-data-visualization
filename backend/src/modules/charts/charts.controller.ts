import {NextFunction, Request, Response} from "express";
import ChartsRepository, {Body} from "./charts.repository";
import {AggregatedType, AggregatedTypes, Continents, DbRegions, RegionGroups} from "./types";


export default class ChartsController {


  /**
   * Return data to charts
   *
   * @param req
   * @param res
   * @param next
   */
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

      let body: any = undefined;
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
          //@ts-ignore
          body = await repo.getByContinents(params, allowedRegions);
          body = this.getParsedRegions(body);
          break;
      }

      return res.status(200).json(body);
    } catch (e) {
      console.log(e);
      next();
    }
  }


  /***
   * Return all countries from Db
   *
   * @param req
   * @param res
   * @param next
   */
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

  /**
   * Parsed regions from DB to continents
   *
   * @param regions
   */
  getParsedRegions(regions: Body[]) {

    const getSum = (list: DbRegions[]) => {
      return regions.filter(item => list.includes(item.name)).reduce((prev, item) => prev + item.value, 0);
    };

    const out = [{
      name: Continents.EUROPE,
      value: getSum(RegionGroups[Continents.EUROPE])
    }, {
      name: Continents.ASIA,
      value: getSum(RegionGroups[Continents.ASIA])
    }, {
      name: Continents.SOUTH_AMERICA,
      value: getSum(RegionGroups[Continents.SOUTH_AMERICA])
    }, {
      name: Continents.NORTH_AMERICA,
      value: getSum(RegionGroups[Continents.NORTH_AMERICA])
    }, {
      name: Continents.AUSTRALIA,
      value: getSum(RegionGroups[Continents.AUSTRALIA])
    }, {
      name: Continents.AFRICA,
      value: getSum(RegionGroups[Continents.AFRICA])
    }];

    return out;
  };

  /**
   * Parsed continents to regions available in DB
   *
   * @param allowedContinents
   * @param aggregatedType
   */
  getParsedContinents(allowedContinents: string[], aggregatedType: AggregatedType) {

    let allowed :string[] = [];

    for (let item of Object.values(Continents)) {
      if (allowedContinents.includes(item) || aggregatedType == AggregatedTypes.CONTINENT){
        allowed =allowed.concat(RegionGroups[item])
      }
    }

    return allowed;
  }
}
