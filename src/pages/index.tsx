import React, {useState, useEffect} from 'react';
import {SuccessRatePieChar} from "@/components/chart";

const data = [
    { name: 'Successful', value: 23, color: '#8884d8' }, // Blue color for successful
    { name: 'Failed', value: 3, color: '#ff4848' }, // Red color for failed
];
export default function Home() {


    return (
        <main>
            <h1>Home</h1>

            <div className="flex  gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <SuccessRatePieChar/>
                <SuccessRatePieChar/>

            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"></div>
        </main>
);
}

