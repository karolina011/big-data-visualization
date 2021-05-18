export enum aggregatedTypes {
    CONTINENT   = 'Continent',
    COUNTRY     = 'Country',
    CITY        = 'City'
}

export type AggregatedType = aggregatedTypes.CONTINENT | aggregatedTypes.COUNTRY | aggregatedTypes.CITY

export enum Continents {
    SOUTH_AMERICA   = 'South America',
    NORTH_AMERICA   = 'North America',
    EUROPE          = 'Europe',
    ASIA            = 'Asia',
    AUSTRALIA       = 'Australia',
}

export type Continent = Continents.SOUTH_AMERICA | Continents.NORTH_AMERICA | Continents.EUROPE | Continents.ASIA | Continents.AUSTRALIA

export interface SettingsI {
    aggregated: {
        type: AggregatedType,
        allowedContinents: Continent[];
        allowedCountry?: string;
    };
    yearsRange: {
        min: number,
        max: number,
    };
    top?: {
        amount: number
    }

}