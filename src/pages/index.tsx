import React, {useState, useEffect} from 'react';
import {SuccessRatePieChar} from "@/components/chart";
import Loading from "@/pages/loading";

const data = [
    { name: 'Successful', value: 23, color: '#8884d8' }, // Blue color for successful
    { name: 'Failed', value: 3, color: '#ff4848' }, // Red color for failed
];
export default function Home() {

    const colums = 3;
    return (
        <main>
            <h1>Home</h1>
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-${colums}'>
                {/*<SuccessRatePieChar/>*/}
                {/*<SuccessRatePieChar/>*/}
                <div>dfs</div>
                <div>dfs</div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"></div>
        </main>
);
}

