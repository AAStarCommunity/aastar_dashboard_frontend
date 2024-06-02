import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {RequestHealthChart} from "@/components/chart";
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import ajax, {API} from "@/ajax"; // Optional Theme applied to the grid

export default function ApiKeyDetail() {
    const router = useRouter()
    const apiKey = router.query.key?.toString()
    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className="flex item-center">
                    <img src="/img/ethereum-icon.png" alt="Ethereum Sepolia"
                         className="w-6 h-6 mr-2 mt-1"/>
                    <h1 className='dark:text-white font-bold text-2xl text-gray-900'>AAStarAPi</h1>
                </div>
                <button type="button"
                        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">API
                    API key
                </button>
            </div>

            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4 grid-cols-4'>
                <DataShowCard dataName="Success rate (last 1 hour)" dataNum="99.0%"/>
                <DataShowCard dataName="Success rate (last 24 hour)" dataNum="99.0%"/>
                <DataShowCard dataName="Total Request (last 24 hour)" dataNum="100"/>
                <DataShowCard dataName="Invalid Request (last 24 hour)" dataNum="1"/>
            </div>

            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4 grid-cols-4'>
                <div className="mt-10 bg-white grid col-span-2">
                    <RequestHealthChart/>
                </div>
                <div className="mt-10 bg-white grid col-span-2">
                    <RequestHealthChart/>
                </div>
            </div>
            <div className="bg-white mt-5 overflow-x-auto sm:rounded-lg overflow-hidden shadow-md">
                <h3 className="text-5xl md:text-2xl">Latest Request</h3>
                <RequestHisToryTable ApiKey={apiKey}></RequestHisToryTable>
            </div>
        </div>
    );
}

export function RequestHisToryTable(
    {
        ApiKey
    }: {
        ApiKey?: string
    }
) {
    const columnDefs: any = [
        {headerName: "network", field: "network", flex: 1},
        {headerName: "method", field: "paymaster_method", flex: 1},
        {headerName: "state", field: "status", flex: 1},
        {headerName: "latency", field: "latency", flex: 1},
        {headerName: "request", field: "request_body", flex: 1},
        {headerName: "response", field: "response_body", flex: 1},
    ]
    const [rowData, setRowData] = useState([]);

    const tableInit = () => {
        ajax.get(API.GET_PAYMASTER_REQUEST_LIST, {
            api_key: ApiKey
        }).then(({data}) => {
            setRowData(data.data)
        })
    }
    useEffect(() => {
        tableInit()
    }, []);
    return (
        <div
            className="ag-theme-quartz w-full min-w-full" // applying the grid theme
            style={{height: 500}}
        >
            <AgGridReact
                className="min-w-full"
                rowData={rowData}
                columnDefs={columnDefs}
            />
        </div>
    )
}

export function DataShowCard(
    {dataNum,dataName}:{
        dataNum?: string,
        dataName: string

    }
) {
    let dataNumDefault = dataNum || '_ _'
    return (
        <div className="p-9 bg-white shadow rounded-md grid  col-span-1">
            <div className="text-4xl font-bold text-left"> {dataNumDefault}</div>
            <div className="text-gray-500 text-left">{dataName}</div>
        </div>
    )
}
