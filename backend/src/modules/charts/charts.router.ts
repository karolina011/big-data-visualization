import {NextFunction, Request, Response, Router} from 'express';
import ChartsController from "./charts.controller";

const router = Router();
const controller = new ChartsController();

router.get(
  '/cities',
  (req: Request, res: Response, next: NextFunction) => controller.cities(req, res, next)
);


export default router;
