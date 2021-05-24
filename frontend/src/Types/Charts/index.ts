export interface ChartData {
    value: number;
    name: string;
    // iyear: number;
}

export interface RequestData {
    time: number | string;
    data: ChartData[];
}