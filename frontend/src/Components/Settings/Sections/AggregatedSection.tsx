import React, {useEffect, useState} from "react";
import {Checkbox, FormControlLabel, Grid, MenuItem, Select} from "@material-ui/core";
import {AggregatedType, aggregatedTypes, Continent, Continents, SettingsI} from "../../../Types/Settings";
import useStyles from "../Settings.style";
import {createDataServiceInstance} from "../../../Services/service";

interface CountrItem {
    name: string;
}

interface AggregatedSectionProps {
    settings: SettingsI['aggregated'];
    onChangeFunc: (aggregationSets: SettingsI['aggregated']) => void;
}

const AggregatedSection: React.FC<AggregatedSectionProps> = ({settings, onChangeFunc}) => {

    const service = createDataServiceInstance();
    const classes = useStyles();
    const [countriesList, setCountriesList] = useState<CountrItem[]>([]);
    const [actualSets, setActualSets] = useState<SettingsI['aggregated']>({
        type: aggregatedTypes.CONTINENT,
        allowedContinents: Object.values(Continents),
        allowedCountry: ''
    });

    const loadCountriesList = async () => {
        const data = await service.loadCountriesList();
        setCountriesList(data);

        const newSets = {
            ...actualSets,
            allowedCountry: data[0].name
        };

        setActualSets(newSets);
        onChangeFunc(newSets);
        return data;
    };

    useEffect(() => {
        setActualSets(settings);
        loadCountriesList();
    }, []);

    const handleTypeChange = async (event: React.ChangeEvent<{ value: unknown }>) :Promise<any> => {

        const newSets = {
            ...actualSets,
            type: event.target.value as AggregatedType,
        };

        setActualSets(newSets);
        onChangeFunc(newSets);
    };

    const handleAllowedContinentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked :boolean = event.target.checked;
        const id :string = event.target.id;

        const newSets = {
            ...actualSets,
            allowedContinents: checked ? {...actualSets.allowedContinents, id} : actualSets.allowedContinents.filter(country => country !== id)
        };

        setActualSets(newSets);
        onChangeFunc(newSets);
    };

    return (
        <Grid item xs={12} className={classes.fieldContainer}>
            <Grid item xs={12} className={classes.label}>
                Aggregated by:
            </Grid>
            <Grid item xs={12} >
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={settings.type}
                    onChange={handleTypeChange}
                    className={classes.field}
                >
                    <MenuItem value={aggregatedTypes.CONTINENT}>{aggregatedTypes.CONTINENT}</MenuItem>
                    <MenuItem value={aggregatedTypes.COUNTRY}>{aggregatedTypes.COUNTRY}</MenuItem>
                    <MenuItem value={aggregatedTypes.CITY}>{aggregatedTypes.CITY}</MenuItem>
                </Select>
            </Grid>

            {settings.type === aggregatedTypes.COUNTRY &&

            <Grid item xs={12} >
                {
                    Object.values(Continents).map((continent :Continent) => {
                        return <FormControlLabel
                                control={<Checkbox
                                    key={continent}
                                    id={continent}
                                    checked={settings.allowedContinents?.includes(continent)}
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    onChange={handleAllowedContinentChange}
                                />}
                                label={continent}
                                className={classes.checkboxInput}
                            />
                    })
                }
            </Grid>
            }

            {settings.type === aggregatedTypes.CITY &&
                <>
                    <Grid item xs={12} className={classes.aggregatedOptionsTitle}>
                        Cities located in:
                    </Grid>
                    <Grid item xs={12} >
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="country-select"
                            value={countriesList[0].name}
                            onChange={handleTypeChange}
                            className={classes.field}
                        >
                            {
                                countriesList.map(({name} :CountrItem ) => {
                                    return <MenuItem key={name} value={name}>{name}</MenuItem>
                                })
                            }
                        </Select>

                    </Grid>
                </>
            }
        </Grid>
    );
};

export default AggregatedSection;