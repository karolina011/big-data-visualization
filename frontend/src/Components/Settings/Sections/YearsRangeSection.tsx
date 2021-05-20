import React from "react";
import {Grid, Slider} from "@material-ui/core";
import {SettingsI} from "../../../Types/Settings";
import useStyles from "../Settings.style";


interface YearsRangeSectionProps {
    settings: SettingsI['yearsRange'];
    onChangeFunc: (aggregationSets: SettingsI['yearsRange']) => void;

}

const YearsRangeSection: React.FC<YearsRangeSectionProps> = ({settings, onChangeFunc}) => {

    const classes = useStyles();
    const [yearsRange, setYearsRange] = React.useState<number[]>([settings.min ?? 1970, settings.max ?? 2018]);

    const handleChangeYearsSlider = (event: any, newValue: number | number[]) => {
        if (typeof newValue !== 'object'){
            return;
        }

        const [min, max] = newValue;
        const yearsSets = {
            min, max
        };

        setYearsRange(newValue);
        onChangeFunc(yearsSets);
    };

    return (
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
    )

};
export default YearsRangeSection