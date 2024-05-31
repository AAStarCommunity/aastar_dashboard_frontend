import {Cell, Line, Pie, PieChart, Tooltip} from "recharts";
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
export  function DataOverviewCard() {
    return (
        <div>
            <Line data={data} />
        </div>
    );
}
