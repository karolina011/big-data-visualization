import BaseMysqlRepository from "../../globals/modules/base-mysql.repository";
import {AttackTypes, ChartsParams} from "./types";


export default class ChartsRepository extends BaseMysqlRepository {
  /**
   *
   * @param {CheckinsFilters} filters
   * @returns {Promise<CheckinsRow[]>}
   */
  async find(): Promise<any> {

    // return this.query('SELECT count(eventid) as number, city from attacks GROUP BY country_txt');
    return this.query('SELECT count(eventid) as amount, city, iyear FROM attacks WHERE iyear = ? GROUP BY city', [2011]);
  }


    /**
     *
     * @param continent
     */
  async getCountries(continent :string): Promise<any> {

      return this.query('SELECT country_txt as name FROM attacks GROUP BY country_txt', []);
  }

  /**
   *
   * @param requestParams
   * @param allowedRegions
   */
  async getByCountries(requestParams: ChartsParams, allowedRegions: string[]): Promise<any> {

    return this.query(
        'SELECT count(eventid) as value, country_txt as name, iyear FROM attacks WHERE attacktype1_txt = ? AND iyear BETWEEN ? AND ? GROUP BY country_txt  ORDER BY value DESC ' + (requestParams.top ? ' LIMIT ? ' : ''),
        [
            (requestParams.attackType.type && requestParams.attackType.type !== AttackTypes.ALL) ? requestParams.attackType.type : AttackTypes.ALL,
            requestParams.yearsRange.min,
            requestParams.yearsRange.max,
            requestParams.top?.amount
        ]);

  }

    /**
     *
     * @param requestParams
     */
    async getByCity(requestParams: ChartsParams): Promise<any> {

        return this.query(
            'SELECT count(eventid) as value, city as name, iyear FROM attacks WHERE country_txt = ? AND city != ? AND attacktype1_txt LIKE ? AND iyear BETWEEN ? AND ? GROUP BY city  ORDER BY value DESC ' + (requestParams.top ? ' LIMIT ? ' : ''),
            [
                requestParams.aggregated.allowedCountry ?? 'Afghanistan',
                '',
                (requestParams.attackType.type && requestParams.attackType?.type !== AttackTypes.ALL) ? requestParams.attackType.type :  '%%' ,
                requestParams.yearsRange.min ?? 1970,
                requestParams.yearsRange.max ?? 2018,
                requestParams.top?.amount ?? 10
            ]);

    }

  /**
   *
   * @param requestParams
   */
  async getByContinent(requestParams: ChartsParams): Promise<any> {

    return this.query(
        'SELECT count(eventid) as value, region_txt as name, iyear FROM attacks WHERE attacktype1_txt = ? AND iyear BETWEEN ? AND ? GROUP BY country_txt  ORDER BY value DESC ' + (requestParams.top ? ' LIMIT ? ' : ''),
        [
            (requestParams.attackType.type && requestParams.attackType.type !== AttackTypes.ALL) ? requestParams.attackType.type : AttackTypes.ALL,
            requestParams.yearsRange.min,
            requestParams.yearsRange.max,
            requestParams.top?.amount
        ]);
    //
    // return this.query(
    //     'SELECT region_txt FROM attacks GROUP BY region_txt',
    //     []);
  }
}
