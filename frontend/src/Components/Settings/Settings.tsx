import React from "react";
import {Button, Grid, MenuItem, Select, Slider} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {aggregatedType, aggregatedTypes, SettingsI} from "../../Types/Settings";
import {createDataServiceInstance} from "../../Services/service";

const useStyles = makeStyles(() => ({
    fieldContainer: {
        padding: '2vw',
        marginTop: '2vw',
        textAlign: 'left'
    },
    label: {
        fontSize: '1.175rem',
        fontWeight: 500,
        marginBottom: '1vw'
    },
    field: {
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '10px',
        width: '100%',
    },
}));

interface SettingsProps {
    onSaveFunc: (settings: SettingsI) => void;
}

const Settings: React.FC<SettingsProps> = ({onSaveFunc}) => {

    const classes = useStyles();
    const [yearsRange, setYearsRange] = React.useState<number[]>([1970, 2018]);

    const [settings, setSettings] = React.useState<SettingsI>({
        aggregatedBy: aggregatedTypes.CONTINENT,
        minYear: 1970,
        maxYear: 2018,
    });

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSettings({
            ...settings,
            aggregatedBy: event.target.value as aggregatedType
        });
    };

    const handleChangeSlider = (event: any, newValue: number | number[]) => {
        if (typeof newValue !== 'object'){
            return;
        }

        setYearsRange(newValue);

        const [minYear, maxYear] = newValue;
        setSettings({
            ...settings,
            minYear,
            maxYear,
        })
    };

    const onSave = () => {
        onSaveFunc(settings);
    };

    return (
        <>
            <Grid container>
                <Grid item xs={12} className={classes.fieldContainer}>
                    <Grid item xs={12} className={classes.label}>
                        Aggregated by:
                    </Grid>
                    <Grid item xs={12} >
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={settings.aggregatedBy}
                            onChange={handleChange}
                            className={classes.field}
                        >
                            <MenuItem value={aggregatedTypes.CONTINENT}>{aggregatedTypes.CONTINENT}</MenuItem>
                            <MenuItem value={aggregatedTypes.COUNTRY}>{aggregatedTypes.COUNTRY}</MenuItem>
                            <MenuItem value={aggregatedTypes.CITY}>{aggregatedTypes.CITY}</MenuItem>
                        </Select>
                    </Grid>
                </Grid>

                <Grid item xs={12} className={classes.fieldContainer}>
                    <Grid item xs={12} className={classes.label}>
                        Year's Range:
                    </Grid>
                    <Grid item xs={12} >
                        <Slider
                            min={1970}
                            max={2018}
                            value={yearsRange}
                            onChange={handleChangeSlider}
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