// import axios, {AxiosInstance, AxiosResponse} from "axios";
import {loadSettings} from "../Config";
import {AggregatedType, SettingsI} from "../Types/Settings";
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

    async loadChartData(params: SettingsI, hierarchical: boolean): Promise<any> {
        const url = hierarchical ? '/charts/chart-hierarchical-data' : '/charts/chart-data';
        return this.client.get(url, {params}).then(data => data.data);
    };

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
    if (!service) {
        const {api: {url}} = loadSettings();
        service = new DataService(url);
    }
    return service;
}