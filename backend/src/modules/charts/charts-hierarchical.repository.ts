import BaseMysqlRepository from "../../globals/modules/base-mysql.repository";
import {AttackType, AttackTypes, ChartsParams, DbRegions} from "./types";

export interface Body {
    value: number;
    name: DbRegions;
    iyear?: number;
}

export default class ChartsHierarchicalRepository extends BaseMysqlRepository {

    /**
     *
     * @param requestParams
     * @param allowedRegions
     */
    async getByContinents(requestParams: ChartsParams): Promise<Body[]> {

        return this.query(
            'SELECT name, value FROM hierarchical_attacks WHERE layer = 1 ORDER BY value DESC',
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
            'SELECT name, value FROM hierarchical_attacks WHERE parent IN (?) ORDER BY value DESC LIMIT 10',
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
            'SELECT name, value FROM hierarchical_attacks ' + (requestParams.aggregated.allowedCountry ? ' WHERE parent = ? AND layer = 3' : '') + ' ORDER BY value DESC LIMIT 10',
            bindsParams);
    }
}