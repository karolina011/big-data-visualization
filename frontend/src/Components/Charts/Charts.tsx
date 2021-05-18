import React from "react";
import {PieChart ,Cell, Pie} from "recharts";
import {CountryChartData} from "../../Types/Charts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

interface ChartsProps {
    data: CountryChartData[]
}

const Charts: React.FC<ChartsProps> = ({data= []}) => {


    return (
        <>
            <PieChart width={800} height={400}>
                <Pie
                    data={data}
                    cx={'50%'}
                    cy={'50%'}
                    outerRadius={150}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </>
    );
};

export default Charts;