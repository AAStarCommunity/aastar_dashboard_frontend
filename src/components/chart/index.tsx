import {
    CartesianGrid,
    Cell, Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import React from "react";


const data = [
    { name: 'Successful', value: 23, color: '#8884d8' }, // Blue color for successful
    { name: 'Failed', value: 3, color: '#ff4848' }, // Red color for failed
];
export function SuccessRatePieChar() {
    return (
        <div className="rounded-xl bg-white p-2 shadow-sm">
            <h2 className="font-size:1.5em margin-bottom: 10px">Daily request health</h2>
            <p className="font-size:1em color:#888 margin-bottom: 20px">24h</p>
            <PieChart width={200} height={200}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color}/>
                    ))}
                </Pie>
                <Tooltip/>
            </PieChart>
            <div className="flex justify-content:space-between margin-top: 20px">
                <p className="font-size:1em ">successful (2%)</p>
                <p className="font-size:1em"> failed (0%)</p>
            </div>
        </div>
    )
}
export function RequestHealthChart(
    {requestHealthData}: {
        requestHealthData?: { date: string, successful: number, failed: number }[]
    }
) {
    return (
        <div className="container mx-auto my-1 mt-4">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={requestHealthData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="successful" stroke="#0000ff"/>
                    <Line type="monotone" dataKey="failed" stroke="#ff0000"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
export function SuccessRateChart(
    {successRateData}:{
        successRateData?: {time: string, successRate: number}[]
    }
) {
    return (
        <div className="container mx-auto my-1 mt-4">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={successRateData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="time"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="successRate" stroke="#8884d8"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export  function DataOverviewCard() {
    return (
        <div>
            <Line data={data} />
        </div>
    );
}
