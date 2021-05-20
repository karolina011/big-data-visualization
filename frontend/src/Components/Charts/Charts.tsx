import React from "react";
import {CountryChartData} from "../../Types/Charts";
import PieChartSection from "./Sections/PieChartSection";

interface ChartsProps {
    data: CountryChartData[]
}

const Charts: React.FC<ChartsProps> = ({data= []}) => {


    return (
        <>
            <PieChartSection data={data}/>
        </>
    );
};

export default Charts;