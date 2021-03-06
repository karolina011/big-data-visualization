import React from "react";
import {Grid} from "@material-ui/core";
import {Cell, Legend, Pie, PieChart, ResponsiveContainer} from "recharts";
import useStyles from "../../Settings/Settings.style";
import {RequestData} from "../../../Types/Charts";

const COLORS = ['#000e2e', '#011673', '#0020b0', '#002ae8', '#0051ff', '#007bff', '#00a2ff', '#00ccff', '#00c6d4', '#00d6c9', '#0dd689', '#0dd689', '#14d60d'];

interface PieChartSectionProps {
    hierarchicalData: RequestData;
    notHierarchicalData: RequestData;
    title?: string;
}

const PieChartSection: React.FC<PieChartSectionProps> = ({hierarchicalData, notHierarchicalData, title}) =>{

    const classes = useStyles();

    return (
        <Grid container justify='center' className={classes.chartContainer}>
            <Grid item sm={12} className={classes.chartTitle}>
                {title}
            </Grid>
            <Grid container>
                <Grid item sm={6} className={classes.time}>
                    Time: {notHierarchicalData.time} s
                </Grid>
                <Grid item sm={6} className={classes.time}>
                    Time: {hierarchicalData.time} s
                </Grid>
            </Grid>
            <Grid container>
                <Grid item sm={6}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={1000}>
                            <Legend
                                style={{marginTop: '4vh', height: 'auto'}}
                                layout='horizontal'
                                align='center'
                                verticalAlign='bottom'
                            />
                            <Pie
                                data={notHierarchicalData.data}
                                cx={'50%'}
                                cy={'50%'}
                                outerRadius={150}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                label
                            >
                                {notHierarchicalData.data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </Grid>

                <Grid item sm={6}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={300}>
                            <Legend
                                style={{marginTop: '4vh', height: 'auto'}}
                                layout='horizontal'
                                align='center'
                                verticalAlign='bottom'
                            />
                            <Pie
                                data={hierarchicalData.data}
                                cx={'50%'}
                                cy={'50%'}
                                outerRadius={150}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                label
                            >
                                {hierarchicalData?.data?.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default PieChartSection;