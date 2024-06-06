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
import {Inter} from "next/font/google";


// const data = [
//     { name: 'Successful', value: 23, color: '#8884d8' }, // Blue color for successful
//     { name: 'Failed', value: 3, color: '#44ff6d' }, // Red color for failed
// ];
// export function SuccessRatePieChar() {
//     return (
//         <div className="rounded-xl bg-white p-2 shadow-sm">
//             <h2 className="font-size:1.5em margin-bottom: 10px">Daily request health</h2>
//             <p className="font-size:1em color:#888 margin-bottom: 20px">24h</p>
//             <PieChart width={200} height={200}>
//                 <Pie
//                     data={data}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                 >
//                     {data.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color}/>
//                     ))}
//                 </Pie>
//                 <Tooltip/>
//             </PieChart>
//             <div className="flex justify-content:space-between margin-top: 20px">
//                 <p className="font-size:1em ">successful (2%)</p>
//                 <p className="font-size:1em"> failed (0%)</p>
//             </div>
//         </div>
//     )
// }

const inter = Inter({
    subsets: ["latin"]
});

export function BalanceDetailCard(
    {
        title,
        balanceValue,
        subInfo
    }: {
        title: string
        balanceValue: number
        subInfo?: string
    }
) {
    return (
        <div className="rounded-xl bg-white p-2 shadow-sm mb-2.5">
            <div className="p-2">
                <div className="bg-gray-50 p-1 ">{title}</div>
                <div
                    className={`${inter.className}sub rounded-xl bg-white px-4 py-8 text-center text-4xl`}>${balanceValue}</div>
                <div>{subInfo}</div>
            </div>

        </div>
    );
}

export function RequestHealthChart(
    {requestHealthData}: {
        requestHealthData?: { time: string, successful: number, failed: number }[]
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
                    <XAxis dataKey="time"/>
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
        successRateData?: {time: string, success_rate: number}[]
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
                    <Line type="monotone" dataKey="success_rate" stroke="#8884d8"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

