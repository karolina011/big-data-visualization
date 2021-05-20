import React from "react";
import {Button, Grid} from "@material-ui/core";
import {AggregatedType, aggregatedTypes, AttackTypes, Continents, SettingsI} from "../../Types/Settings";
import AggregatedSection from "./Sections/AggregatedSection";
import useStyles from "./Settings.style";
import YearsRangeSection from "./Sections/YearsRangeSection";
import LimitSection from "./Sections/LimitSection";
import AttackTypeSection from "./Sections/AttackTypeSection";

interface SettingsProps {
    onSaveFunc: (settings: SettingsI) => void;
}

const Settings: React.FC<SettingsProps> = ({onSaveFunc}) => {

    const classes = useStyles();

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
        },
        attackType: {
            type: AttackTypes.ALL
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

    const handleYearsRangeChange = (yearsRangeSets: SettingsI['yearsRange']) => {
        setSettings({
            ...settings,
            yearsRange: yearsRangeSets
        });
    };

    const handleLimitChange = (limitSets: SettingsI['top']) => {
        setSettings({
            ...settings,
            top: limitSets
        });
    };

    const handleAttackTypeChange = (attackTypeSets: SettingsI['attackType']) => {
        setSettings({
            ...settings,
            attackType: attackTypeSets
        });
    };

    const onSave = () => {
        onSaveFunc(settings);
    };

    return (
        <>
            <Grid container>
                <AggregatedSection settings={settings.aggregated} onChangeFunc={handleAggregationChange}/>
                <YearsRangeSection settings={settings.yearsRange} onChangeFunc={handleYearsRangeChange}/>
                <LimitSection settings={settings.top} onChangeFunc={handleLimitChange}/>
                <AttackTypeSection settings={settings.attackType} onChangeFunc={handleAttackTypeChange}/>

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