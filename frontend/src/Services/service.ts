// import axios, {AxiosInstance, AxiosResponse} from "axios";
import {loadSettings} from "../Config";
import {Continent, SettingsI} from "../Types/Settings";
import axios, {AxiosInstance} from "axios";


export default class DataService {

    /**
     *
     * @type {AxiosInstance}
     * @protected
     */
    protected client: AxiosInstance;

    /**
     *
     * @param {string} hostname
     */
    constructor(hostname: string) {
        this.client = axios.create({
            baseURL: hostname
        });
    }

    /**
     *
     * @param {CheckinsChartFilters} params
     * @returns {Promise<CheckinsChart>}
     */
    async loadChartData(params: SettingsI): Promise<any> {
        return this.client.get('/charts/chart-data', {params}).then(data => data.data);
    }

    async loadCountriesList(): Promise<any> {
        return this.client.get('/charts/countries-list').then(data => data.data);
    }
}

let service: DataService;
/**
 *
 * @returns {Promise<DataService>}
 */
export function createDataServiceInstance(): DataService {
    if(!service) {
        const {api: {url}} = loadSettings();
        service = new DataService(url);
    }
    return service;
}