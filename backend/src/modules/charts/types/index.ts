export enum Continents {
    SOUTH_AMERICA   = 'South America',
    NORTH_AMERICA   = 'North America',
    EUROPE          = 'Europe',
    ASIA            = 'Asia',
    AUSTRALIA       = 'Australia',
}

export type Continent = Continents.SOUTH_AMERICA | Continents.NORTH_AMERICA | Continents.EUROPE | Continents.ASIA | Continents.AUSTRALIA

export enum DbRegions  {
     CENTRAL_ASIA               = 'Central Asia',
     EAST_ASIA                  = 'East Asia',
     SOUTH_ASIA                 = 'South Asia',
     SOUTHEAST_ASIA             = 'Southeast Asia',
     AUSTRALIA_AND_OCEANIA      = 'Australasia & Oceania',
     EASTERN_EUROPE             = 'Eastern Europe',
     WESTERN_EUROPE             = 'Western Europe',
     MIDDLE_EAST_NORTH_AFRICA   = 'Middle East & North Africa',
     SUB_SAHARAN_AFRICA         = 'Sub-Saharan Africa',
     NORTH_AMERICA              = 'North America',
     SOUTH_AMERICA              = 'South America',
     CENTRAL_AMERICA_CARIBBEAN  = 'Central America & Caribbean',
}

export enum AggregatedTypes {
    CONTINENT   = 'Continent',
    COUNTRY     = 'Country',
    CITY        = 'City'
}

export type AggregatedType = AggregatedTypes.CONTINENT | AggregatedTypes.COUNTRY | AggregatedTypes.CITY

export interface ChartsParams {
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