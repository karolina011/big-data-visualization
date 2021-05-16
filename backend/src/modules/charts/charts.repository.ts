import BaseMysqlRepository from "../../globals/modules/base-mysql.repository";




export default class ChartsRepository extends BaseMysqlRepository {
  /**
   *
   * @param {CheckinsFilters} filters
   * @returns {Promise<CheckinsRow[]>}
   */
  async find(): Promise<any> {

    // return this.query('SELECT count(eventid) as number, city from attacks GROUP BY country_txt');
    return this.query('SELECT count(eventid) as number, city, iyear FROM attacks WHERE iyear = ? GROUP BY city', [2011]);
  }
}
