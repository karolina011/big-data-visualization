import React from "react";
import PieChartSection from "./Sections/PieChartSection";
import {ChartsDataI} from "../MainPage";

interface ChartsProps {
    data: ChartsDataI
}

const Charts: React.FC<ChartsProps> = ({data}) => {


    return (
        <>
            <PieChartSection hierarchicalData={data.hierarchical.continents} notHierarchicalData={data.notHierarchical.continents}/>
            {/*<PieChartSection hierarchicalData={data.hierarchical.countries} notHierarchicalData={data.notHierarchical.countries}/>*/}
            {/*<PieChartSection hierarchicalData={data.hierarchical.cities} notHierarchicalData={data.notHierarchical.cities}/>*/}
        </>
    );
};

export default Charts;