import React from "react";
import {Grid, TextField} from "@material-ui/core";
import useStyles from "../Settings.style";
import {AggregatedType, SettingsI} from "../../../Types/Settings";

interface LimitSectionProps {
    settings: SettingsI['top'];
    onChangeFunc: (aggregationSets: SettingsI['top']) => void;

}

const LimitSection: React.FC<LimitSectionProps> = ({settings, onChangeFunc}) => {

    const classes = useStyles();
    const [limit, setLimit] = React.useState<number>(settings?.amount ?? 10);

    const handleLimitChange = async (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) :Promise<void> => {

        const newSets = {
            amount: Number(event.target.value)
        };

        setLimit(Number(event.target.value));
        onChangeFunc(newSets);
    };

    return(
        <Grid item xs={12} className={classes.fieldContainer}>
            <Grid item xs={12} className={classes.label}>
                Limit:
            </Grid>
            <Grid item xs={12} >
                <TextField
                    id="standard-number"
                    type="number"
                    value={limit}
                    onChange={handleLimitChange}
                    InputProps={{ inputProps: { min: 2, max: 10 } }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
        </Grid>
    )
};

export default LimitSection;