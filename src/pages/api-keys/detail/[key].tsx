import {useRouter} from "next/router";
import React, {useEffect, useMemo, useState} from "react";
import {RequestHealthChart, SuccessRateChart} from "@/components/chart";
import {AgGridReact} from "ag-grid-react";
import {ColDef} from 'ag-grid-community';
import JsonView from '@uiw/react-json-view';
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
                    <img src="/icons/apikey.svg" alt="Ethereum Sepolia"
                         className="w-6 h-6 mr-2 mt-1"/>
                    <h1 className='dark:text-white font-bold text-2xl text-gray-900'>api1</h1>
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

            <APiKeyCardList ApiKey={apiKey}/>

            <APIKeyRequestHealthAndSuccessRate ApiKey={apiKey}/>
            <div className="bg-white mt-5 overflow-x-auto sm:rounded-lg overflow-hidden shadow-md">
                <h3 className="text-5xl md:text-2xl">Latest Request</h3>
                <RequestHisToryTable ApiKey={apiKey}></RequestHisToryTable>
            </div>
        </div>
    );
}

export function APIKeyRequestHealthAndSuccessRate(
    {ApiKey}: { ApiKey?: string }
) {
    const [rowData, setRowData] = useState([]);

    const tableInit = () => {
        ajax.get(API.GET_REQUEST_HEALTH_LIST, {
            api_key: ApiKey
        }).then(({data}) => {
            setRowData(data.data)
        })
    }
    useEffect(() => {
        tableInit()
    }, [ApiKey]);
    return (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4 grid-cols-4'>
            <div className="mt-10 bg-white grid col-span-2">
                <div>
                    <h3>Paymaster request Health</h3>
                </div>
                <RequestHealthChart requestHealthData={rowData}/>
            </div>
            <div className="mt-10 bg-white grid col-span-2">
                <div>
                    <div>
                        <h3>Paymaster Success Rate</h3>
                    </div>
                    <SuccessRateChart successRateData={rowData}/>
                </div>
            </div>
        </div>
    )
}

export function APiKeyCardList(
    {ApiKey}: { ApiKey?: string }
) {
    const [hourRequestHealth, setHourRequestHealth] = useState(Object)
    const [dayRequestHealth, setDayRequestHealth] = useState(Object)

    const tableInit = () => {
        ajax.get(API.GET_REQUEST_HEALTH_ONE, {
            api_key: ApiKey,
            time_type: 'hour'
        }).then(({data}) => {
            setHourRequestHealth(data.data)
        })
        ajax.get(API.GET_REQUEST_HEALTH_ONE, {
            api_key: ApiKey,
            time_type: 'day'
        }).then(({data}) => {
            setDayRequestHealth(data.data)
        })
    }
    let totalRequest = dayRequestHealth?.successful + dayRequestHealth?.failed
    useEffect(() => {
        tableInit();
    }, [ApiKey]);
    return (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4 grid-cols-4'>
            <DataShowCard dataName="Success rate (last 1 hour)" dataNum={`${hourRequestHealth?.success_rate}%`}/>
            <DataShowCard dataName="Success rate (last 24 hour)" dataNum={`${dayRequestHealth?.success_rate}%`}/>
            <DataShowCard dataName="Total Request (last 24 hour)" dataNum={`${totalRequest}`}/>
            <DataShowCard dataName="Invalid Request (last 24 hour)" dataNum={`${dayRequestHealth?.failed}`}/>
        </div>
    )
}

// JSON Cell Renderer
const JsonCellRenderer = (params: { value: string }) => {

    let valueObj = JSON.parse(params.value)
    return (
        // <pre style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}>
        //     {params.value}
        //
        // </pre>
        <JsonView value={valueObj}>
        </JsonView>
    );
};

export function RequestHisToryTable(
    {
        ApiKey
    }: {
        ApiKey?: string
    }
) {

    const columnDefs: ColDef[] = useMemo(() => [
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
        {
            headerName: "latency(ms)", field: "latency", valueFormatter: p => {
                let value = p.value
                let afterValue = value / Math.pow(10, 6)
                return afterValue + "(ms)"
            }, flex: 1
        },
        {
            headerName: "request", field: "request_body", flex: 1, cellRenderer: 'jsonCellRenderer'
        },
        {headerName: "response", field: "response_body", flex: 1,},
    ], []);
    const defaultColDef = useMemo(() => ({
        filter: true,
        enableCellTextSelection: true,
        ensureDomOrder: true,
        suppressCopyRowsToClipboard: true,
        editable: true,
        suppressCopySingleCellRanges: true,
        enableRangeSelection: true,
        enableFillHandle: true,
        className: "min-w-full"
    }), []);

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
    }, [ApiKey]);
    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10];


    return (
        <div
            className="ag-theme-quartz" // applying the grid theme
            style={{height: 500}}
        >
            <AgGridReact
                defaultColDef={defaultColDef}
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
