import React from "react";
import {Button, Grid, Slider} from "@material-ui/core";
import {AggregatedType, aggregatedTypes, Continents, SettingsI} from "../../Types/Settings";
import AggregatedSection from "./Sections/AggregatedSection";
import useStyles from "./Settings.style";

interface SettingsProps {
    onSaveFunc: (settings: SettingsI) => void;
}

const Settings: React.FC<SettingsProps> = ({onSaveFunc}) => {

    const classes = useStyles();
    const [yearsRange, setYearsRange] = React.useState<number[]>([1970, 2018]);

    const [settings, setSettings] = React.useState<SettingsI>({
        aggregated: {
            type: aggregatedTypes.CONTINENT,
            allowedContinents: Object.values(Continents),
            allowedCountry: '',
        },
        yearsRange: {
            min: 1970,
            max: 2018,
        },
        top: {
            amount: 10
        }
    });

    const handleTypeChange = (type: AggregatedType) => {
        setSettings({
            ...settings,
            aggregated: {
                ...settings.aggregated,
                type: type as AggregatedType
            }
        });
    };


    const handleAggregationChange = (aggregationSets: SettingsI['aggregated']) => {
        setSettings({
            ...settings,
            aggregated: aggregationSets
        });
    };

    const handleChangeYearsSlider = (event: any, newValue: number | number[]) => {
        if (typeof newValue !== 'object'){
            return;
        }

        setYearsRange(newValue);

        const [min, max] = newValue;
        setSettings({
            ...settings,
            yearsRange: {
                min,
                max
            }
        })
    };

    const onSave = () => {
        onSaveFunc(settings);
    };

    return (
        <>
            <Grid container>
                <AggregatedSection settings={settings.aggregated} onChangeFunc={handleAggregationChange}/>
                {/*<Grid item xs={12} className={classes.fieldContainer}>*/}
                {/*    <Grid item xs={12} className={classes.label}>*/}
                {/*        Aggregated by:*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={12} >*/}
                {/*        <Select*/}
                {/*            labelId="demo-simple-select-filled-label"*/}
                {/*            id="demo-simple-select-filled"*/}
                {/*            value={settings.aggregatedBy}*/}
                {/*            onChange={handleChange}*/}
                {/*            className={classes.field}*/}
                {/*        >*/}
                {/*            <MenuItem value={aggregatedTypes.CONTINENT}>{aggregatedTypes.CONTINENT}</MenuItem>*/}
                {/*            <MenuItem value={aggregatedTypes.COUNTRY}>{aggregatedTypes.COUNTRY}</MenuItem>*/}
                {/*            <MenuItem value={aggregatedTypes.CITY}>{aggregatedTypes.CITY}</MenuItem>*/}
                {/*        </Select>*/}
                {/*    </Grid>*/}

                {/*    {settings.aggregatedBy === aggregatedTypes.COUNTRY &&*/}

                {/*        <Grid item xs={12} >*/}
                {/*            {*/}
                {/*                Object.values(Continents).map((country :Continent) => {*/}
                {/*                    return <Checkbox*/}
                {/*                        checked={settings.allowedContinents?.includes(country)}*/}
                {/*                        color="primary"*/}
                {/*                        inputProps={{ 'aria-label': 'secondary checkbox' }}*/}
                {/*                    />*/}
                {/*                })*/}
                {/*            }*/}
                {/*        </Grid>*/}
                {/*    }*/}
                {/*</Grid>*/}

                <Grid item xs={12} className={classes.fieldContainer}>
                    <Grid item xs={12} className={classes.label}>
                        Year's Range:
                    </Grid>
                    <Grid item xs={12} >
                        <Slider
                            min={1970}
                            max={2018}
                            value={yearsRange}
                            onChange={handleChangeYearsSlider}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12} className={classes.fieldContainer}>
                    <Button
                        variant='contained'
                        onClick={() => onSave()}
                    >
                        Save Changes
                    </Button>
                </Grid>

            </Grid>
        </>
    );
};

export default Settings;