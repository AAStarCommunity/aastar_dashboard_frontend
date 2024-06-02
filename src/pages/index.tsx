import React, {useState, useEffect} from 'react';
import {RequestHealthChart, SuccessRatePieChar} from "@/components/chart";
import Loading from "@/pages/loading";
import {Button} from "@windmill/react-ui";
import {useRouter} from "next/router";


const data = [
    {name: 'Successful', value: 23, color: '#8884d8'}, // Blue color for successful
    {name: 'Failed', value: 3, color: '#ff4848'}, // Red color for failed
];
export default function Home() {
    const router = useRouter()
    return (
        <main>
            <div className='mt-10 relative overflow-x-auto sm:rounded-lg overflow-hidden"'>
                <div className='flex items-center justify-between'>
                    <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">OverView</h1>
                </div>
                <div className='grid gap-5  grid-cols-6'>
                    <div className="col-span-2">
                        <h2>RequestHealth</h2>
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <RequestHealthChart requestHealthData={requestHealthChartData }/>
                    </div>
                    <div className="col-span-2">
                        <h2>PayMaster Sponsor PayTypeRequest</h2>
                        <RequestHealthChart requestHealthData={requestHealthChartData }/>
                    </div>
                    <div className="col-span-2">
                        <h2>RequestSuccessRate</h2>
                        <RequestHealthChart requestHealthData={requestHealthChartData }/>
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

export function APICard() {
    return (
        <div className="border border-gray-200 rounded-lg p-4 max-w-sm shadow-md">
            <div className="flex items-center mb-4">
                <img src="/icons/key.svg" alt="Ethereum Sepolia"
                     className="w-6 h-6 mr-2"/>
                <span className="text-sm font-medium">AAStar dev</span>
            </div>
            <div className="mb-4">
                <p className="text-sm text-gray-600">0 requests (24h)</p>
                <p className="text-sm text-gray-600">99.9% Success Rate(24h)</p>
            </div>
            <div className="flex justify-between items-center">
                <button className="bg-gray-100 text-gray-700 rounded px-3 py-1 text-sm">API key</button>
                <a href="#" className="text-xl text-gray-700">&rarr;</a>
            </div>
        </div>
    )
}


const requestHealthChartData = [
    {date: '05/04', successful: 0, failed: 0},
    {date: '05/05', successful: 0, failed: 0},
    {date: '05/06', successful: 0, failed: 800},
    {date: '05/07', successful: 3600, failed: 3600},
    {date: '05/08', successful: 1800, failed: 0},
    {date: '05/09', successful: 0, failed: 0},
    {date: '05/10', successful: 0, failed: 0},
    {date: '05/11', successful: 0, failed: 0},
    {date: '05/12', successful: 0, failed: 0},
    {date: '05/13', successful: 0, failed: 0},
    {date: '05/14', successful: 200, failed: 100},
    {date: '05/15', successful: 200, failed: 0},
    {date: '05/16', successful: 0, failed: 0},
    {date: '05/17', successful: 0, failed: 0},
    {date: '05/18', successful: 0, failed: 0},
    {date: '05/19', successful: 0, failed: 0},
    {date: '05/20', successful: 0, failed: 0},
    {date: '05/21', successful: 0, failed: 0},
    {date: '05/22', successful: 0, failed: 0},
    {date: '05/23', successful: 0, failed: 0},
    {date: '05/24', successful: 0, failed: 0},
    {date: '05/25', successful: 0, failed: 0},
    {date: '05/26', successful: 0, failed: 0},
    {date: '05/27', successful: 0, failed: 0},
    {date: '05/28', successful: 0, failed: 0},
    {date: '05/29', successful: 0, failed: 0},
    {date: '05/30', successful: 0, failed: 0},
    {date: '05/31', successful: 0, failed: 0},
    {date: '06/01', successful: 0, failed: 0},
    {date: '06/02', successful: 0, failed: 0},
];
