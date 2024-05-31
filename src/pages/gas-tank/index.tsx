import PageTitle from "@/components/Typography/PageTitle";
import {Button, Table} from "@windmill/react-ui";
import {useRouter} from "next/router";
import React, {useMemo, useState} from "react";
import {Inter} from "next/font/google";
import { useReactTable } from '@tanstack/react-table'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { ColDef } from 'ag-grid-community';
const inter = Inter({
    subsets: ["latin"]
});




export default function GasTank() {
    const router = useRouter()
    const subLine = " mt-10 relative overflow-x-auto sm:rounded-lg overflow-hidden"
    return (<main>
            <div className='flex items-center justify-between'>
                <PageTitle>Gas Tank</PageTitle>
                <dl>
                    <Button onClick={() => router.push(`/strategy/create`)}>Deposit Gas Tank</Button>
                    <Button onClick={() => router.push(`/strategy/create`)}>WithDraw Gas Tank</Button>
                </dl>
            </div>
            <div className={subLine}>
                <h2 className="text-9xl md:text-2xl">Balance Detail</h2>
                <div className="grid gap-6 sm:grid-cols-5 lg:grid-cols-5 grid-cols-5">
                    <div className="col-span-1">
                        <BalanceDetailCard title={"balance"} balanceValue={12}/>
                        <BalanceDetailCard title={"balance"} balanceValue={12}/>
                    </div>
                    <ComsumeTankChartInDay/>
                    <ComsumeTankChartInDay/>


                </div>
                <div className="bg-white mt-5 overflow-x-auto sm:rounded-lg overflow-hidden shadow-md">
                    <h3 className="text-5xl md:text-2xl">Trans HisTory</h3>
                    <TransHisToryTable/>
                </div>
            </div>


            <div className={subLine}>
                <h2 className="text-9xl md:text-2xl">APi Tank consume View</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
                    <div className="col-span-1 bg-blue-500 p-4">Header</div>
                    <div className="col-span-1 bg-yellow-50 p-4">Sidebar</div>
                    <div className="col-span-1 bg-yellow-500 p-4">Main Content</div>
                    <div className="col-span-1 bg-red-500 p-4">Footer</div>

                </div>
            </div>

            <div className={subLine}>
                <h2 className="text-9xl md:text-2xl"> Strategy View</h2>
                <div className="flex">
                    <div className="flex-auto">
                        <h2 className="text-9xl w-64"> Strategy A</h2>
                    </div>
                    <div className="flex-auto">
                        <h2 className="text-9xl md:text-2xl"> Strategy B</h2>
                    </div>
                </div>

            </div>
        </main>
    )
}

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
                    className={`${inter.className}sub rounded-xl bg-white px-4 py-8 text-center text-2xl`}>${balanceValue}</div>
                <div>{subInfo}</div>
            </div>

        </div>
    );
}

const chartData = [
    {date: '23 Nov', value: 25000},
    {date: '24 Nov', value: 27000},
    {date: '25 Nov', value: 29000},
    {date: '26 Nov', value: 31000},
    {date: '27 Nov', value: 33000},
    {date: '28 Nov', value: 35000},
    {date: '29 Nov', value: 37000},
    {date: '30 Nov', value: 45000}
];

export function ComsumeTankChartInDay() {
    return (
        <div className="grid rounded-xl bg-white p-2 shadow-smflex-col col-span-2">
            <h3 className="text-5xl md:text-2xl">Comsume Tank Chart EveryDay</h3>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={chartData}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="date"/>
                    <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`}/>
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`}/>
                    <Line type="monotone" dataKey="value" stroke="#000000" activeDot={{r: 8}}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}



function TransHisToryTable() {
    const [rowData, setRowData] = useState([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);

    const columnDefs: ColDef<{ make: string; model: string; price: number; electric: boolean; }>[] = [
        { headerName: 'Make', field: 'make' , flex: 1 },
        { headerName: 'Model', field: 'model', flex: 1 },
        { headerName: 'Price', field: 'price', flex: 1 },
        { headerName: 'Electric', field: 'electric', flex: 1 },
    ];
    return (
        <div
            className="ag-theme-quartz w-full min-w-full" // applying the grid theme
            style={{height: 500 }}
        >
            <AgGridReact
                className="min-w-full"
                rowData={rowData}
                columnDefs={columnDefs}
            />
        </div>
    )

}
