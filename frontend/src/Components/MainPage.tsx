import React, {useEffect, useState} from "react";
import Charts from "./Charts/Charts";
import {Grid} from "@material-ui/core";
import Settings from "./Settings/Settings";
import {aggregatedTypes, AttackTypes, Continents, SettingsI} from "../Types/Settings";
import {createDataServiceInstance} from "../Services/service";
import {RequestData} from "../Types/Charts";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
    settingsContainer: {
        boxShadow: '0px -1px 16px 0px rgba(50, 50, 50, 0.42)',
        height: '100vh'
    },
    mainPageContainer: {
        padding: '2vw'
    }
}));

export interface ChartsDataI {
    hierarchical: {
        continents: RequestData,
        countries: RequestData,
        cities: RequestData,
    },
    notHierarchical: {
        continents: RequestData,
        countries: RequestData,
        cities: RequestData,
    }
}

const MainPage = () => {

    const responseInitialValue: RequestData = {
        time: 0,
        data: []
    };

    const requestInitialValues: SettingsI = {
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
            amount: 20
        },
        attackType: {
            type: AttackTypes.ALL
        }
    };

    const chartsInitialValues: ChartsDataI = {
        hierarchical: {
            continents: responseInitialValue,
            countries: responseInitialValue,
            cities: responseInitialValue,
        },
        notHierarchical: {
            continents: responseInitialValue,
            countries: responseInitialValue,
            cities: responseInitialValue,
        }
    };


    const classes = useStyles();
    const [chartsData, setChartsData] = useState<ChartsDataI>(chartsInitialValues);
    const service = createDataServiceInstance();

    const loadData = async () => {
        const promises = [
            await loadNotHierarchicalData(requestInitialValues),
            await loadHierarchicalData(requestInitialValues)
        ];

        const [notHierarchical, hierarchical] = await Promise.all(promises);

        setChartsData({
            hierarchical, notHierarchical
        })
    };

    useEffect(() => {
        loadData();
    }, []);



    const getWithContinents = (settings: SettingsI, hierarchical: boolean): Promise<RequestData> => {
          return service.loadChartData({...settings, dataType: aggregatedTypes.CONTINENT}, hierarchical)
    };

    const getWithCountries = (settings: SettingsI, hierarchical: boolean): Promise<RequestData> => {
        return service.loadChartData({...settings, dataType: aggregatedTypes.COUNTRY}, hierarchical)
    };

    const getWithCities = (settings: SettingsI, hierarchical: boolean): Promise<RequestData> => {
        return service.loadChartData({...settings, dataType: aggregatedTypes.CITY}, hierarchical)
    };

    const loadNotHierarchicalData = async (settings: SettingsI) => {
        const promises: [Promise<RequestData>, Promise<RequestData>, Promise<RequestData>] = [
            getWithContinents(settings, false),
            getWithCountries(settings, false),
            getWithCities(settings, false)
        ];

        const [continents, countries, cities] = await Promise.all(promises);

        return {
            continents,
            countries,
            cities
        };
    };

    const loadHierarchicalData = async (settings: SettingsI) => {
        const promises: [Promise<RequestData>, Promise<RequestData>, Promise<RequestData>] = [
            getWithContinents(settings, true),
            getWithCountries(settings, true),
            getWithCities(settings, true)
        ];

        const [continents, countries, cities] = await Promise.all(promises);

        return {
            continents,
            countries,
            cities
        };
    };


    const onSave = async (settings: SettingsI) => {
        const promises = [
            await loadNotHierarchicalData(settings),
            await loadHierarchicalData(settings)
        ];

        const [notHierarchical, hierarchical] = await Promise.all(promises);

        setChartsData({
            hierarchical, notHierarchical
        })
    };

    return (
        <>
            <Grid container direction='row'>
                <Grid item sm={3} className={classes.settingsContainer}>
                    <Settings onSaveFunc={onSave}/>
                </Grid>
                <Grid item sm={9} className={classes.mainPageContainer}>
                    <Charts data={chartsData}/>
                </Grid>
            </Grid>
        </>
    )
};

export default MainPage;