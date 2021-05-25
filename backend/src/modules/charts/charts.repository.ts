import BaseMysqlRepository from "../../globals/modules/base-mysql.repository";
import {AttackType, AttackTypes, ChartsParams, DbRegions} from "./types";

export interface Body {
    value: number;
    name: DbRegions;
    iyear: number;
}

export default class ChartsRepository extends BaseMysqlRepository {
    /**
     *
     * @param {CheckinsFilters} filters
     * @returns {Promise<CheckinsRow[]>}
     */
    async find(): Promise<any> {
        return this.query('SELECT count(eventid) as amount, city, iyear FROM attacks WHERE iyear = ? GROUP BY city', [2011]);
    }

    /**
     * Return List of available countries
     *
     * @param continent
     */
    async getCountriesList(continent: string): Promise<any> {

        return this.query('SELECT country_txt as name FROM attacks GROUP BY country_txt', []);
    }

    /**
     *
     * @param requestParams
     */
    async getByContinents(requestParams: ChartsParams): Promise<Body[]> {

        return this.query(
            'SELECT count(eventid) as value, region_txt as name, iyear FROM attacks GROUP BY region_txt ORDER BY value DESC',
            []) as unknown as Body[];

    }

    /**
     *
     * @param requestParams
     * @param allowedRegions
     */
    async getByCountries(requestParams: ChartsParams, allowedRegions: string[]): Promise<any> {

        let bindsParams: any = [
            allowedRegions
        ];

        return this.query(
            'SELECT count(eventid) as value, country_txt as name, iyear FROM attacks WHERE region_txt IN (?) GROUP BY country_txt  ORDER BY value DESC LIMIT 10',
            bindsParams);

    }

    /**
     *
     * @param requestParams
     */
    async getByCity(requestParams: ChartsParams): Promise<any> {

        let bindsParams: any = [];

        if (requestParams.aggregated.allowedCountry){
            bindsParams.push(
                requestParams.aggregated.allowedCountry,
            );
        }

        return this.query(
            'SELECT count(eventid) as value, city as name, iyear FROM attacks ' + (requestParams.aggregated.allowedCountry ? ' WHERE country_txt = ? ' : '') + '  GROUP BY city  ORDER BY value DESC LIMIT 10',
            bindsParams);

    }
}
