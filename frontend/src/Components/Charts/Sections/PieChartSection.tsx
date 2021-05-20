import React from "react";
import {Grid} from "@material-ui/core";
import {Cell, Legend, Pie, PieChart} from "recharts";
import useStyles from "../../Settings/Settings.style";
import {CountryChartData} from "../../../Types/Charts";

const COLORS = ['#000e2e', '#011673', '#0020b0', '#002ae8', '#0051ff', '#007bff', '#00a2ff', '#00ccff', '#00c6d4', '#00d6c9'];

interface PieChartSectionProps {
    data: CountryChartData[]
}

const PieChartSection: React.FC<PieChartSectionProps> = ({data}) =>{

    const classes = useStyles();

    return (
        <Grid container justify='center' className={classes.chartContainer}>
            <Grid item sm={12} className={classes.chartTitle}>
                Pie Chart
            </Grid>
            <Grid item sm={12}>
                <PieChart width={800} height={400}>
                    <Legend
                        style={{marginTop: '5vh'}}
                        layout='vertical'
                        align='right'
                        verticalAlign='top'
                        height={36}
                    />
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
            </Grid>
        </Grid>
    )
};

export default PieChartSection;