import React, {useState, useEffect} from 'react';
import {RequestHealthChart, SuccessRateChart, SuccessRatePieChar} from "@/components/chart";
import Loading from "@/pages/loading";
import {Button} from "@windmill/react-ui";
import router, {useRouter} from "next/router";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";


const data = [
    {name: 'Successful', value: 23, color: '#8884d8'}, // Blue color for successful
    {name: 'Failed', value: 3, color: '#ff4848'}, // Red color for failed
];
export default function Home() {
    const router = useRouter()
    let   rateData = [
        {time: '05/07', success_rate: 99.0},
        {time: '05/08', success_rate: 99.0},
        {time: '05/09', success_rate: 99.0},
        {time: '05/10', success_rate: 80.0},
        {time: '05/11', success_rate: 99.0},
        {time: '05/12', success_rate: 99.0},
        {time: '05/13', success_rate: 99.0},
        {time: '05/14', success_rate: 99.0},
        {time: '05/15', success_rate: 98.0},
    ]
    return (
        <main>
            <div className='mt-10 relative overflow-x-auto sm:rounded-lg overflow-hidden"'>
                <div className='flex items-center justify-between'>
                    <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">OverView</h1>
                </div>
                <div className='grid gap-5  grid-cols-6'>
                    <div className="grid rounded-xl bg-white p-2 shadow-smflex-col col-span-2">
                        <h2>Request Health</h2>
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <RequestHealthChart requestHealthData={requestHealthChartData }/>
                    </div>
                    <div className="grid rounded-xl bg-white p-2 shadow-smflex-col col-span-2">
                        <h2>PayMaster Sponsor PayTypeRequest (TODO )</h2>
                        <RequestHealthChart requestHealthData={requestHealthChartData }/>
                    </div>
                    <div className="grid rounded-xl bg-white p-2 shadow-smflex-col col-span-2">
                        <h2>RequestSuccessRate</h2>
                        <SuccessRateChart successRateData={rateData}/>
                    </div>
                </div>

            </div>


            <div className='mt-10 relative overflow-x-auto sm:rounded-lg overflow-hidden"'>
                <div className='flex items-center justify-between'>
                    <h1>My API Keys</h1>
                    <dl>
                        <Button onClick={() => router.push(`/api-keys`)}>View All API</Button>
                    </dl>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 grid-cols-4">
                    <APICard/>
                    <APICard/>
                    <APICard/>
                </div>
            </div>

            {/*<div className='flex mt-10 items-center justify-between'>*/}
            {/*    <h1>My Strategies</h1>*/}
            {/*    <dl>*/}
            {/*        <Button onClick={() => router.push(`/strategy`)}>View All Strategies</Button>*/}
            {/*    </dl>*/}
            {/*</div>*/}


        </main>
    );
}
export function MultiSuccessRateChart(
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
                    <Line type="monotone" dataKey="ethereum_spepolia" stroke="#8884d8"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}


export function APICard() {
    return (
        <div className="border border-gray-200 rounded-lg p-4 max-w-sm shadow-md">
            <div className="flex items-center mb-4">
                <img src="/icons/key.svg" alt="Ethereum Sepolia"
                     className="w-6 h-6 mr-2"/>
                <span className="text-sm font-medium">AAStar dev</span>
            </div>
            <div className="mb-4">
                <p className="text-sm text-gray-600">200 requests (24h)</p>
                <p className="text-sm text-gray-600">99.9% Success Rate(24h)</p>
            </div>
            <div className="flex justify-between items-center">
                <button className="bg-gray-100 text-gray-700 rounded px-3 py-1 text-sm">Connect API key</button>
                <button onClick={() => router.push(`/api-keys/detail/8bced19b-505e-4d11-ae80-abbee3d3a38c`)}  className="text-xl text-gray-700 rounded">&rarr;</button>
            </div>
        </div>
    )
}


const requestHealthChartData = [
    {time: '05/04', successful: 0, failed: 0},
    {time: '05/05', successful: 0, failed: 0},
    {time: '05/06', successful: 0, failed: 800},
    {time: '05/07', successful: 3600, failed: 3600},
    {time: '05/08', successful: 1800, failed: 0},
    {time: '05/09', successful: 0, failed: 0},
    {time: '05/10', successful: 0, failed: 0},
    {time: '05/11', successful: 0, failed: 0},

];
