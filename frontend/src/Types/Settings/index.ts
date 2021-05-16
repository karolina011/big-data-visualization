export enum aggregatedTypes {
    CONTINENT   = 'Continent',
    COUNTRY     = 'Country',
    CITY        = 'City'
}

export type aggregatedType = aggregatedTypes.CONTINENT | aggregatedTypes.COUNTRY | aggregatedTypes.CITY

export interface SettingsI {
    aggregatedBy: aggregatedType;
    minYear: number,
    maxYear: number,
}