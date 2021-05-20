import React, {useState} from "react";
import useStyles from "../Settings.style";
import {Grid, MenuItem, Select} from "@material-ui/core";
import {AttackType, AttackTypes, SettingsI} from "../../../Types/Settings";

interface AttackTypeProps {
    settings: SettingsI['attackType'];
    onChangeFunc: (aggregationSets: SettingsI['attackType']) => void;

}

const AttackTypeSection: React.FC<AttackTypeProps> = ({settings, onChangeFunc}) => {

    const classes = useStyles();
    const [attackType, setAttackType] = useState<AttackType>(settings.type ?? AttackTypes.ALL);

    const handleTypeChange = async (event: React.ChangeEvent<{ value: unknown }>) :Promise<any> => {

        const newSets = {
            type: event.target.value as AttackType,
        };

        setAttackType(event.target.value as AttackType);
        onChangeFunc(newSets);
    };

    return (
        <>
            <Grid item xs={12} className={classes.fieldContainer}>
                <Grid item xs={12} className={classes.label}>
                    Attack Type:
                </Grid>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={attackType}
                    onChange={handleTypeChange}
                    className={classes.field}
                >
                    {
                        Object.values(AttackTypes).map((attackType :AttackType) => {
                            return <MenuItem value={attackType}>{attackType}</MenuItem>
                        })
                    }
                </Select>
            </Grid>
        </>
    )
};

export default AttackTypeSection;