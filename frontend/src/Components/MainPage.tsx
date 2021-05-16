import React from "react";
import Maps from "./Maps/Maps";
import Charts from "./Charts/Charts";
import {Grid} from "@material-ui/core";
import Settings from "./Settings/Settings";
import {SettingsI} from "../Types/Settings";
import {createDataServiceInstance} from "../Services/service";


const MainPage = () => {

    const service = createDataServiceInstance();

    const onSave = async (settings: SettingsI) => {
        const data = await service.loadChartData(settings);
        console.log(data);
    };

    return (
        <>
            <Grid container direction='row'>
                <Grid item sm={3} style={{backgroundColor: 'grey', height: '100vh'}}>
                    <Settings onSaveFunc={onSave}/>
                </Grid>
                <Grid item sm={9}>

                    <p>Main PAge</p>
                    {/*<Maps/>*/}

                    <Charts/>
                </Grid>
            </Grid>
        </>
    )
};

export default MainPage;