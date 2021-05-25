import React from "react";
import PieChartSection from "./Sections/PieChartSection";
import {ChartsDataI} from "../MainPage";

interface ChartsProps {
    data: ChartsDataI
}

const Charts: React.FC<ChartsProps> = ({data}) => {


    return (
        <>
            <PieChartSection hierarchicalData={data.hierarchical.continents} notHierarchicalData={data.notHierarchical.continents} title={'Continents'}/>
            <PieChartSection hierarchicalData={data.hierarchical.countries} notHierarchicalData={data.notHierarchical.countries} title={'Countries'}/>
            <PieChartSection hierarchicalData={data.hierarchical.cities} notHierarchicalData={data.notHierarchical.cities} title={'Cities'}/>
        </>
    );
};

export default Charts;