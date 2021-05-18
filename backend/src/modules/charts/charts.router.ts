import {NextFunction, Request, Response, Router} from 'express';
import ChartsController from "./charts.controller";

const router = Router();
const controller = new ChartsController();

router.get(
  '/countries',
  (req: Request, res: Response, next: NextFunction) => controller.countries(req, res, next)
);

router.get(
  '/countries-list',
  (req: Request, res: Response, next: NextFunction) => controller.countriesList(req, res, next)
);


export default router;
