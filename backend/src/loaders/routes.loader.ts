import {Express} from "express";
import router from '../modules/charts/charts.router'

export default class RoutesLoader {

  /**
   *
   * @param {Express} app
   */
  load(app: Express): void {
    // app.use("/checkins", checkinsRouter);
    app.use("/charts", router);
  }
}
