import { useRouter } from "next/router";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { RequestHealthChart, SuccessRateChart } from "@/components/chart";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from 'ag-grid-community';
import JsonView from '@uiw/react-json-view';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import ajax, { API } from "@/ajax"; // Optional Theme applied to the grid
import PageTitle from "@/components/Typography/PageTitle";
import { APIKeyIcon } from '~/public/icons';
import { Button } from "@windmill/react-ui";
import useLoading, { REQUEST_STATUS } from "@/hooks/useLoading";
import { IRowDataItem } from "@/utils/types";
import SectionTitle from "@/components/Typography/SectionTitle";
import { ThemeContext } from '@/context/ThemeContext'
import { DataShowCard, NetworkSelect } from "@/components/Form";
import DatePicker from "tailwind-datepicker-react";
import { DataDateRangePicker } from "@/components/Form/select";

export default function ApiKeyDetail() {
    const router = useRouter()
    const apiKey = router.query.key?.toString()
    const [apiKeyModelData, setApiKeyData] = useState(Object);

    const tableInit = () => {
        ajax.get(API.GET_API_KEY, {
            api_key: apiKey
        }).then(({ data }) => {
            setApiKeyData(data.data)
        })
    }
    useEffect(() => {
        tableInit()
    }, [apiKey]);

    return (
        <div>
            <div className='flex justify-between items-center'>
                <PageTitle>
                    <APIKeyIcon className="w-6 h-6 mr-2 mt-1" />{apiKeyModelData.key_name}</PageTitle>
                <div>

                    <Button onClick={() => router.push(`/api-keys/edit/${apiKey}`)}>
                        API Key Info
                    </Button>
                    <Button >  Connect APIKey</Button>

                </div>

            </div>

            <APiKeyCardList ApiKey={apiKey} />

            <APIKeyRequestHealthAndSuccessRate ApiKey={apiKey} />
            <div className="bg-white dark:bg-gray-800 mt-5 overflow-x-auto sm:rounded-lg overflow-hidden shadow-md p-6">

                <RequestHisToryTable ApiKey={apiKey}></RequestHisToryTable>
            </div>
        </div>
    );
}
export function APIKeyRequestHealthAndSuccessRate(
    { ApiKey }: { ApiKey?: string }
) {
    const [rowData, setRowData] = useState<IRowDataItem[]>([]);
    const [status, setStatus] = useState<REQUEST_STATUS>(REQUEST_STATUS.LOADING)
    const [error, setError] = useState<string>("")
    const LoadRequestHealthChart = useLoading(status, RequestHealthChart({ requestHealthData: rowData }), { loadingTo: 'self', errTips: error })
    // const LoadSuccessRateChart = useLoading(status, SuccessRateChart({ successRateData: rowData }), { loadingTo: 'self', errTips: error })

    const tableInit = () => {
        console.log('tableInit' + requestHealthConditionNetWork + startDate + endDate)
        ajax.get(API.GET_REQUEST_HEALTH_LIST, {
            api_key: ApiKey,
            network: requestHealthConditionNetWork,
            start_time: startDate,
            end_time: endDate
        }).then(({ data }) => {
            if (data.code === 200) {
                setRowData(data.data)
                data.data.length ? setStatus(REQUEST_STATUS.SUCCESS) : setStatus(REQUEST_STATUS.Empty)
            } else {
                setStatus(REQUEST_STATUS.FAIL)
                setError(data.message)
            }
        }).catch((err) => {
            setStatus(REQUEST_STATUS.FAIL)
            setError(err.toString())
        })
    }
    const [requestHealthConditionNetWork, setRequestHealthConditionNetWork] = useState('');
    const handleRequestHealthNetworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRequestHealthConditionNetWork(e.target.value);
    };
    const defaultCurrentDate = new Date();
    const defaultStartDate = new Date();
    defaultStartDate.setDate(defaultCurrentDate.getDate() - 7);
    const [startDate, setStartDate] = useState<Date>(defaultStartDate);
    const [endDate, setEndDate] = useState<Date>(defaultCurrentDate);
    useEffect(() => {
        tableInit()
    }, [ApiKey, requestHealthConditionNetWork, startDate, endDate]);
    return (
        <div className='gap-6 mt-10'>
            <div className="flex">
                <h2 className='text-gray-500 dark:text-gray-400 pl-8 pt-4 text-xl'>Request Health</h2>
                <div className="pl-8  pt-3">
                    <span>network select</span>
                    <NetworkSelect handleSelectChange={handleRequestHealthNetworkChange} />
                </div>
                <DataDateRangePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />

            </div>
            <div className="relative overflow-hidden h-full row-span-10">{LoadRequestHealthChart}</div>

        </div>

    )
}

export function APiKeyCardList(
    { ApiKey }: { ApiKey?: string }
) {
    const [hourRequestHealth, setHourRequestHealth] = useState(Object)
    const [dayRequestHealth, setDayRequestHealth] = useState(Object)

    const tableInit = () => {
        ajax.get(API.GET_REQUEST_HEALTH_ONE, {
            api_key: ApiKey,
            time_type: 'hour'
        }).then(({ data }) => {
            setHourRequestHealth(data.data)
        })
        ajax.get(API.GET_REQUEST_HEALTH_ONE, {
            api_key: ApiKey,
            time_type: 'day'
        }).then(({ data }) => {
            setDayRequestHealth(data.data)
        })
    }
    let totalRequest = dayRequestHealth?.successful + dayRequestHealth?.failed
    useEffect(() => {
        tableInit();
    }, [ApiKey]);
    return (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4 grid-cols-4'>
            <DataShowCard dataName="Success rate (last 1 hour)" dataNum={`${hourRequestHealth?.success_rate}%`} />
            <DataShowCard dataName="Success rate (last 24 hour)" dataNum={`${dayRequestHealth?.success_rate}%`} />
            <DataShowCard dataName="Total Request (last 24 hour)" dataNum={`${totalRequest}`} />
            <DataShowCard dataName="Invalid Request (last 24 hour)" dataNum={`${dayRequestHealth?.failed}`} />
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
        { headerName: "network", field: "network", flex: 1 },
        { headerName: "method", field: "paymaster_method", flex: 1 },
        {
            headerName: "state", field: "status", flex: 1, cellStyle:
                function (params: { value: number; }) {
                    if (params.value === 200) {
                        return { color: 'green' };
                    } else {
                        return { color: 'red' };
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
        { headerName: "response", field: "response_body", flex: 1, },
        { headerName: 'Time', field: 'time', flex: 1 },
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
        className: "min-w-full "
    }), []);

    const [rowData, setRowData] = useState([]);

    const { theme } = useContext(ThemeContext)
    const [requestHistoryConditionNetWork, setRequestHealthConditionNetWork] = useState('');
    const handleRequestHistoryNetworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRequestHealthConditionNetWork(e.target.value);
    };
    const defaultCurrentDate = new Date();
    const defaultStartDate = new Date();
    defaultStartDate.setDate(defaultCurrentDate.getDate() - 7);
    const [startDate, setStartDate] = useState<Date>(defaultStartDate);
    const [endDate, setEndDate] = useState<Date>(defaultCurrentDate);



    useEffect(() => {
        ajax.get(API.GET_PAYMASTER_REQUEST_LIST, {
            api_key: ApiKey,
            network: requestHistoryConditionNetWork,
            start_time: startDate,
            end_time: endDate
        }).then(({ data }) => {
            setRowData(data.data)
        })
    }, [ApiKey, requestHistoryConditionNetWork, startDate, endDate]);

    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10];
    return (
        <div>
            <div className="flex">
                <SectionTitle>Paymaster Latest Request</SectionTitle>
                <div className="pl-8  pt-3">
                    <span>network select</span>
                    <NetworkSelect handleSelectChange={handleRequestHistoryNetworkChange} />
                </div>
                <DataDateRangePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
            </div>
            <div
                className={`${theme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz "} `}// applying the grid theme
                style={{ height: 500 }}
            >
                <AgGridReact
                    defaultColDef={defaultColDef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                    components={{ jsonCellRenderer: JsonCellRenderer }}

                />
            </div >
        </div>

    )
}

