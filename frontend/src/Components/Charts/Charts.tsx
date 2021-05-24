import React from "react";
import {CountryChartData} from "../../Types/Charts";
import PieChartSection from "./Sections/PieChartSection";
import BarChartSection from "./Sections/BarChartSection";

interface ChartsProps {
    data: CountryChartData[]
}

const Charts: React.FC<ChartsProps> = ({data= []}) => {


    return (
        <>
            <PieChartSection data={data}/>
            <BarChartSection data={data}/>
        </>
    );
};

export default Charts;