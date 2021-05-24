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
     *
     * @param continent
     */
    async getCountries(continent: string): Promise<any> {

        return this.query('SELECT country_txt as name FROM attacks GROUP BY country_txt', []);
    }

    /**
     *
     * @param requestParams
     * @param allowedRegions
     */
    async getByContinents(requestParams: ChartsParams, allowedRegions: string[]): Promise<Body[]> {

        const specifyAttack = requestParams.attackType.type && requestParams.attackType.type !== AttackTypes.ALL;

        let bindsParams: any = [
            // allowedRegions
        ];

        if (specifyAttack) {
            bindsParams.push(requestParams.attackType.type);
        }

        console.log(Object.values(DbRegions).length);
        bindsParams.push(
            requestParams?.yearsRange?.min ?? 1970,
            requestParams.yearsRange.max ?? 2018,
            Object.values(DbRegions).length
        );

        return this.query(
            'SELECT count(eventid) as value, region_txt as name, iyear FROM attacks WHERE ' + (specifyAttack ? ' attacktype1_txt = ? AND' : '') + '  iyear BETWEEN ? AND ? GROUP BY region_txt ORDER BY value DESC ' + (requestParams.top ? ' LIMIT ? ' : ''),
            bindsParams) as unknown as Body[];

    }

    /**
     *
     * @param requestParams
     * @param allowedRegions
     */
    async getByCountries(requestParams: ChartsParams, allowedRegions: string[]): Promise<any> {

        const specifyAttack = requestParams.attackType.type && requestParams.attackType.type !== AttackTypes.ALL;

        let bindsParams: any = [
            allowedRegions
        ];

        if (specifyAttack) {
            bindsParams.push(requestParams.attackType.type);
        }

        bindsParams.push(
            requestParams?.yearsRange?.min ?? 1970,
            requestParams.yearsRange.max ?? 2018,
            requestParams.top?.amount ?? 10
        );

        return this.query(
            'SELECT count(eventid) as value, country_txt as name, iyear FROM attacks WHERE region_txt IN (?) ' + (specifyAttack ? ' AND attacktype1_txt = ? ' : '') + ' AND iyear BETWEEN ? AND ? GROUP BY country_txt  ORDER BY value DESC ' + (requestParams.top ? ' LIMIT ? ' : ''),
            bindsParams);

    }

    /**
     *
     * @param requestParams
     */
    async getByCity(requestParams: ChartsParams): Promise<any> {

        const specifyAttack = requestParams.attackType.type && requestParams.attackType.type !== AttackTypes.ALL;

        let bindsParams: any = [
            requestParams.aggregated.allowedCountry ?? 'Afghanistan',
        ];

        if (specifyAttack) {
            bindsParams.push(requestParams.attackType.type);
        }

        bindsParams.push(
            requestParams?.yearsRange?.min ?? 1970,
            requestParams.yearsRange.max ?? 2018,
            requestParams.top?.amount ?? 10
        );

        return this.query(
            'SELECT count(eventid) as value, city as name, iyear FROM attacks WHERE country_txt = ? ' + (specifyAttack ? ' AND attacktype1_txt = ? ' : '') + '  AND iyear BETWEEN ? AND ? GROUP BY city  ORDER BY value DESC ' + (requestParams.top ? ' LIMIT ? ' : ''),
            bindsParams);

    }
}
