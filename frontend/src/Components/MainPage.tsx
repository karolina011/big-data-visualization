import React, {useEffect, useState} from "react";
import Charts from "./Charts/Charts";
import {Grid} from "@material-ui/core";
import Settings from "./Settings/Settings";
import {aggregatedTypes, Continents, SettingsI} from "../Types/Settings";
import {createDataServiceInstance} from "../Services/service";
import {CountryChartData} from "../Types/Charts";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
    settingsContainer: {
        boxShadow: '0px -1px 16px 0px rgba(50, 50, 50, 0.42)',
        height: '100vh'
    }
}));


const MainPage = () => {

    const classes = useStyles();
    const [visualizationData, setVisualizationData] = useState<CountryChartData[]>([]);
    const service = createDataServiceInstance();

    const loadData = async () => {
        const data = await service.loadChartData({
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
        setVisualizationData(data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const onSave = async (settings: SettingsI) => {
        const data = await service.loadChartData(settings);
        setVisualizationData(data);
    };

    return (
        <>
            <Grid container direction='row'>
                <Grid item sm={3} className={classes.settingsContainer}>
                    <Settings onSaveFunc={onSave}/>
                </Grid>
                <Grid item sm={9}>

                    <p>Main PAge</p>
                    {/*<Maps/>*/}

                    <Charts data={visualizationData}/>
                </Grid>
            </Grid>
        </>
    )
};

export default MainPage;