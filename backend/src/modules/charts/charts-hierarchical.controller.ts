import {NextFunction, Request, Response} from "express";
import {AggregatedTypes} from "./types";
//@ts-ignore
import ChartsHierarchicalRepository from "./charts-hierarchical.repository";


export default class ChartsHierarchicalController {


    async getChartData(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const params = req.query;
            params.aggregated = params.aggregated ? JSON.parse(params.aggregated as unknown as string) : undefined;


            const repo = new ChartsHierarchicalRepository();

            let start = 0;
            let end = 0;
            let body: any = undefined;
            //@ts-ignore
            switch (params.dataType) {
                case AggregatedTypes.CITY:
                    start = Date.now();
                    //@ts-ignore
                    body = await repo.getByCity(params);
                    end = Date.now();
                    body = {
                        data: body,
                        time: (end - start)/1000
                    };
                    break;
                case AggregatedTypes.COUNTRY:
                    start = Date.now();
                    //@ts-ignore
                    body = await repo.getByCountries(params, params.aggregated.allowedContinents);
                    end = Date.now();
                    body = {
                        data: body,
                        time: (end - start)/1000
                    };
                    break;
                case AggregatedTypes.CONTINENT:
                    start = Date.now();
                    //@ts-ignore
                    body = await repo.getByContinents(params);
                    end = Date.now();
                    body = {
                        data: body,
                        time: (end - start)/1000
                    };
                    break;
            }

            return res.status(200).json(body);
        } catch (e) {
            console.log(e);
            next();
        }
    }

}