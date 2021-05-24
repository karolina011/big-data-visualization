import React from "react";
import {CountryChartData} from "../../../Types/Charts";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend, ResponsiveContainer,
} from 'recharts';
import {Grid} from "@material-ui/core";
import useStyles from "../../Settings/Settings.style";

interface BarChartSectionProps {
    data: CountryChartData[]
}

const BarChartSection: React.FC<BarChartSectionProps> = ({data}) => {

    const classes = useStyles();

    return (
        <Grid container justify='center' className={classes.chartContainer}>
            <Grid item sm={12} className={classes.chartTitle}>
                Bar Chart
            </Grid>
            <Grid item sm={12}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        // style={{width: '100%'}}
                        width={500}
                        height={300}
                        data={data}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#011673" />
                    </BarChart>
                </ResponsiveContainer>
            </Grid>
        </Grid>
    )
};

export default BarChartSection;