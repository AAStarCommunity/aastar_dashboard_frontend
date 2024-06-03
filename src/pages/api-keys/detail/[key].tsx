import {useRouter} from "next/router";
import React, {useEffect, useMemo, useState} from "react";
import {RequestHealthChart, SuccessRateChart} from "@/components/chart";
import {AgGridReact} from "ag-grid-react";
import { ColDef } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import ajax, {API} from "@/ajax"; // Optional Theme applied to the grid
const requestHealthChartData = [

    {date: '05/07', successful: 3600, failed: 123},
    {date: '05/08', successful: 1800, failed: 0},
    {date: '05/09', successful: 2323, failed: 123},
    {date: '05/10', successful: 123, failed: 0},
    {date: '05/11', successful: 123, failed: 0},
    {date: '05/12', successful: 23, failed: 0},
    {date: '05/13', successful: 2442, failed: 0},
    {date: '05/14', successful: 200, failed: 100},
    {date: '05/15', successful: 200, failed: 0},

];
export default function ApiKeyDetail() {
    const router = useRouter()
    const apiKey = router.query.key?.toString()

    return (
        <div>
            <div className='flex justify-between items-center'>
                <div className="flex item-center">
                    <img src="/icons/apikey.svg" alt="Ethereum Sepolia"
                         className="w-6 h-6 mr-2 mt-1"/>
                    <h1 className='dark:text-white font-bold text-2xl text-gray-900'>AAStarAPi</h1>
                </div>
                <div>
                    <button type="button"
                            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={() => router.push(`/api-keys/edit/${apiKey}`)}>
                        API Key Info
                    </button>
                    <button type="button"
                            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Connect APIKey
                    </button>
                </div>

            </div>

            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4 grid-cols-4'>
                <DataShowCard dataName="Success rate (last 1 hour)" dataNum="99.0%"/>
                <DataShowCard dataName="Success rate (last 24 hour)" dataNum="99.0%"/>
                <DataShowCard dataName="Total Request (last 24 hour)" dataNum="100"/>
                <DataShowCard dataName="Invalid Request (last 24 hour)" dataNum="1"/>
            </div>

            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4 grid-cols-4'>
                <div className="mt-10 bg-white grid col-span-2">
                    <APIKeyRequestHealthChart/>
                </div>
                <div className="mt-10 bg-white grid col-span-2">
                    <APIKeyRequestSuccessChart/>
                </div>
            </div>
            <div className="bg-white mt-5 overflow-x-auto sm:rounded-lg overflow-hidden shadow-md">
                <h3 className="text-5xl md:text-2xl">Latest Request</h3>
                <RequestHisToryTable ApiKey={apiKey}></RequestHisToryTable>
            </div>
        </div>
    );
}

export function APIKeyRequestSuccessChart() {
    let rateData = [
        {time: '05/07', successRate: 99.0},
        {time: '05/08', successRate: 99.0},
        {time: '05/09', successRate: 99.0},
        {time: '05/10', successRate: 80.0},
        {time: '05/11', successRate: 99.0},
        {time: '05/12', successRate: 99.0},
        {time: '05/13', successRate: 99.0},
        {time: '05/14', successRate: 99.0},
        {time: '05/15', successRate: 98.0},
    ]

    return (
        <div>
            <div>
                <h3>Paymaster Success Rate</h3>
            </div>
            <SuccessRateChart successRateData={rateData}/>
        </div>
    )
}

export function APIKeyRequestHealthChart() {
    return (
        <div>
            <div>
                <h3>Paymaster request Health</h3>
                {/*<div>*/}
                {/*    <label htmlFor="timeRange">Time Range: </label>*/}
                {/*    /!*<select id="timeRange" value={timeRange} onChange={handleTimeRangeChange}>*!/*/}
                {/*    <select id="timeRange">*/}
                {/*        <option value="1d">1 Day</option>*/}
                {/*        <option value="1w">1 Week</option>*/}
                {/*        <option value="1m">1 Month</option>*/}
                {/*        <option value="1y">1 Year</option>*/}
                {/*    </select>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <label htmlFor="network">Network: </label>*/}
                {/*    /!*<select id="network" value={network} onChange={handleNetworkChange}>*!/*/}
                {/*    <select id="network" >*/}
                {/*        <option value="op">Optimism</option>*/}
                {/*        <option value="ethereum">Ethereum</option>*/}
                {/*    </select>*/}
                {/*</div>*/}
            </div>
            <RequestHealthChart requestHealthData={requestHealthChartData}/>
        </div>
    )

}
// JSON Cell Renderer
const JsonCellRenderer = (params: { value: string }) => {
    let formattedJson;
    try {
        formattedJson = JSON.stringify(JSON.parse(params.value), null, 2);
    } catch (e) {
        formattedJson = params.value; // If parsing fails, show the raw value
    }
    return (
        <pre style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}>
            {formattedJson}
        </pre>
    );
};

export function RequestHisToryTable(
    {
        ApiKey
    }: {
        ApiKey?: string
    }
) {

    const columnDefs:ColDef[] = useMemo(()=> [
        {headerName: "network", field: "network", flex: 1},
        {headerName: "method", field: "paymaster_method", flex: 1},
        {
            headerName: "state", field: "status", flex: 1, cellStyle:
                function (params: { value: number; }) {
                    if (params.value === 200) {
                        return {color: 'green'};
                    } else {
                        return {color: 'red'};
                    }

                }
        },
        {headerName: "latency(ms)", field: "latency", flex: 1},
        {headerName: "request", field: "request_body", flex: 1},
        {headerName: "response", field: "response_body", flex: 1},
    ],[]);
    const [rowData, setRowData] = useState([]);

    const tableInit = () => {
        ajax.get(API.GET_PAYMASTER_REQUEST_LIST, {
            api_key: ApiKey
        }).then(({data}) => {
            setRowData(data.data)
        })
    }
    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10];
    useEffect(() => {
        tableInit()
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const defaultColDef = useMemo(() => ({
        filter: true,
        enableCellTextSelection: true,
        ensureDomOrder: true,
    }), []);

    return (
        <div
            className="ag-theme-quartz" // applying the grid theme
            style={{height: 500}}
        >
            <AgGridReact
                defaultColDef={defaultColDef}

                className="min-w-full"
                rowData={rowData}
                columnDefs={columnDefs}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                paginationPageSizeSelector={paginationPageSizeSelector}
                components={{jsonCellRenderer: JsonCellRenderer}}

            />
        </div>
    )
}

export function DataShowCard(
    {dataNum, dataName}: {
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
