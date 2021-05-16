import {AppSettings} from "../Types/Config";

export function loadSettings(): AppSettings {
    return {
        api: {
            url: 'http://localhost:8080'
        }
    }
}