export enum Continents {
    SOUTH_AMERICA   = 'South America',
    NORTH_AMERICA   = 'North America',
    EUROPE          = 'Europe',
    ASIA            = 'Asia',
    AUSTRALIA       = 'Australia',
    AFRICA          = 'Africa',
}

export type Continent = Continents.SOUTH_AMERICA | Continents.NORTH_AMERICA | Continents.EUROPE | Continents.ASIA | Continents.AUSTRALIA | Continents.AFRICA

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

export const RegionGroups = {
    [Continents.SOUTH_AMERICA]: [
        DbRegions.SOUTH_AMERICA,
        DbRegions.CENTRAL_AMERICA_CARIBBEAN,
    ],
    [Continents.NORTH_AMERICA]: [
        DbRegions.NORTH_AMERICA,
        DbRegions.CENTRAL_AMERICA_CARIBBEAN,
    ],
    [Continents.EUROPE]: [
        DbRegions.EASTERN_EUROPE,
        DbRegions.WESTERN_EUROPE,
    ],
    [Continents.ASIA]: [
        DbRegions.CENTRAL_ASIA,
        DbRegions.EAST_ASIA,
        DbRegions.SOUTH_ASIA,
        DbRegions.SOUTHEAST_ASIA,
    ],
    [Continents.AUSTRALIA]: [
        DbRegions.AUSTRALIA_AND_OCEANIA
    ],
    [Continents.AFRICA]: [
        DbRegions.MIDDLE_EAST_NORTH_AFRICA,
        DbRegions.SUB_SAHARAN_AFRICA
    ]
};

export enum AggregatedTypes {
    CONTINENT   = 'Continent',
    COUNTRY     = 'Country',
    CITY        = 'City'
}

export type AggregatedType = AggregatedTypes.CONTINENT | AggregatedTypes.COUNTRY | AggregatedTypes.CITY

export enum AttackTypes {
    ALL                     = 'All',
    ARMED_ASSAULT           = 'Armed Assault',
    ASSASSINATION           = 'Assassination',
    BOMBING_EXPLOSION       = 'Bombing/Explosion',
    FACILITY_INFRASTRUCTURE = 'Facility/Infrastructure Attack',
    HIJACKING               = 'Hijacking',
    BARRICADE_INCIDENT      = 'Hostage Taking (Barricade Incident)',
    KIDNAPPING              = 'Hostage Taking (Kidnapping)',
    UNARMED_ASSAULT         = 'Unarmed Assault',
    UNKNOWN                 = 'Unknown',
}

export type AttackType = AttackTypes.ARMED_ASSAULT |
    AttackTypes.ASSASSINATION |
    AttackTypes.BOMBING_EXPLOSION |
    AttackTypes.FACILITY_INFRASTRUCTURE |
    AttackTypes.HIJACKING |
    AttackTypes.BARRICADE_INCIDENT |
    AttackTypes.KIDNAPPING |
    AttackTypes.UNARMED_ASSAULT |
    AttackTypes.UNKNOWN |
    AttackTypes.ALL

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
    },
    attackType: {
        type: AttackType
    },
    dataType?: AggregatedType
}