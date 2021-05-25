import {NextFunction, Request, Response, Router} from 'express';
import ChartsController from "./charts.controller";
// @ts-ignore
import ChartsHierarchicalController from "./charts-hierarchical.controller";

const router = Router();
const controller = new ChartsController();
const hierarchicalController = new ChartsHierarchicalController();

router.get(
  '/chart-data',
  (req: Request, res: Response, next: NextFunction) => controller.getChartData(req, res, next)
);

router.get(
    '/chart-hierarchical-data',
    (req: Request, res: Response, next: NextFunction) => hierarchicalController.getChartData(req, res, next)
);

router.get(
  '/countries-list',
  (req: Request, res: Response, next: NextFunction) => controller.countriesList(req, res, next)
);


export default router;
