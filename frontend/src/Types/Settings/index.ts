export enum aggregatedTypes {
    CONTINENT   = 'Continent',
    COUNTRY     = 'Country',
    CITY        = 'City'
}

export type AggregatedType = aggregatedTypes.CONTINENT | aggregatedTypes.COUNTRY | aggregatedTypes.CITY

// export enum Continents {
//     SOUTH_AMERICA   = 'South America',
//     NORTH_AMERICA   = 'North America',
//     EUROPE          = 'Europe',
//     ASIA            = 'Asia',
//     AUSTRALIA       = 'Australia',
//     AFRICA          = 'Africa',
// }

// export type Continent = Continents.SOUTH_AMERICA | Continents.NORTH_AMERICA | Continents.EUROPE | Continents.ASIA | Continents.AUSTRALIA | Continents.AFRICA

export enum Continents  {
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

export type Continent =
    Continents.CENTRAL_ASIA |
    Continents.EAST_ASIA |
    Continents.SOUTH_ASIA |
    Continents.SOUTHEAST_ASIA |
    Continents.AUSTRALIA_AND_OCEANIA |
    Continents.EASTERN_EUROPE |
    Continents.WESTERN_EUROPE |
    Continents.MIDDLE_EAST_NORTH_AFRICA |
    Continents.SUB_SAHARAN_AFRICA |
    Continents.NORTH_AMERICA |
    Continents.SOUTH_AMERICA |
    Continents.CENTRAL_AMERICA_CARIBBEAN

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
    attackType: {
        type: AttackType
    }
    dataType?: AggregatedType
}