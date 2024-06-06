import React, {useState, useEffect, Suspense} from 'react';
import {RequestHealthChart, SuccessRateChart} from "@/components/chart";
import Loading from "@/pages/loading";
import {Button} from "@windmill/react-ui";
import router, {useRouter} from "next/router";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import ajax, {API} from "@/ajax";
import {ObjType} from "@/utils/types";


export default function Home() {
    const router = useRouter()
    return (
        <main>
            <div className='mt-10 relative overflow-x-auto sm:rounded-lg overflow-hidden"'>
                <div className='flex items-center justify-between'>
                    <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">OverView</h1>
                </div>
                <div className='grid gap-5  grid-cols-4'>
                    <Suspense fallback={"loading"}>
                        <RequestHealthAndSuccessRate/>
                    </Suspense>
                    {/*TODO*/}
                    {/*<div className="grid rounded-xl bg-white p-2 shadow-smflex-col col-span-2">*/}
                    {/*    <h2>PayMaster Sponsor PayTypeRequest</h2>*/}
                    {/*    <PaymasterSponsorPayTypeChart/>*/}
                    {/*</div>*/}

                </div>

            </div>


            <div className='mt-10 relative overflow-x-auto sm:rounded-lg overflow-hidden"'>
                <div className='flex items-center justify-between'>
                    <h1>My API Keys</h1>
                    <dl>
                        <Button onClick={() => router.push(`/api-keys`)}>View All API</Button>
                    </dl>
                </div>
                <APICardSOverView></APICardSOverView>
            </div>
        </main>
    );
}

export function RequestHealthAndSuccessRate() {
    const [rowData, setRowData] = useState([]);

    const tableInit = () => {
        ajax.get(API.GET_REQUEST_HEALTH_LIST).then(({data}) => {
            setRowData(data.data)
        })
    }
    useEffect(() => {
        tableInit()
    }, []);
    return (
        < >
            <div className="grid rounded-xl bg-white p-2 shadow-smflex-col col-span-2">
                <h2>Request Health</h2>
                <HomeRequestHealthChart rowData={rowData}></HomeRequestHealthChart>
            </div>
            <div className="grid rounded-xl bg-white p-2 shadow-smflex-col col-span-2">
                <h2>RequestSuccessRate</h2>
                <SuccessRateChart successRateData={rowData}/>
            </div>
        </>
    )

}

export function PaymasterSponsorPayTypeChart() {
    const [paymasterMetricData, setPaymasterMetricData] = useState([]);

    const tableInit = () => {
        ajax.get(API.GET_PAYMASTER_PAY_TYPE_METRICS).then(({data}) => {
            setPaymasterMetricData(data.data)
        })
    }
    useEffect(() => {
        tableInit()
    }, []);
    console.log(paymasterMetricData)
    return (
        <div className="container mx-auto my-1 mt-4">
            <ResponsiveContainer width="100%" height={400}>

                <LineChart
                    data={paymasterMetricData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >

                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="time"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="erc20_pay_type" stroke="#0000ff"/>
                    <Line type="monotone" dataKey="project_sponsor" stroke="#ff4748"/>
                    <Line type="monotone" dataKey="user_pay" stroke="#44ff6d"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}


function APICardSOverView() {
    const [apiKeyDataOverViews, setApiKeyDataOverViews] = useState<ObjType<any>[]>([])
    const tableInit = () => {
        ajax.get(API.GET_API_KEY_OVERVIEW_LIST).then(({data}) => {
            setApiKeyDataOverViews(data.data)
        })
    }
    useEffect(() => {
        tableInit()
    }, []);
    // const dataDom = apiKeyDataOverViews?.map((item, index) => {
    //
    //     return (
    //         <APICard key={index} apiName={item.api_name} requestCount={item.request_count}
    //                  successRate={item.success_rate} apiKey={item.api_key}></APICard>)
    // })

    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 grid-cols-4">
            {apiKeyDataOverViews && apiKeyDataOverViews.length > 0 ? (
                apiKeyDataOverViews.map((item, index) => (
                    <APICard
                        key={index}
                        apiName={item.api_name}
                        requestCount={item.request_count}
                        successRate={item.success_rate}
                        apiKey={item.api_key}
                    />
                ))
            ) : (
                <div>Please apply API key</div>
            )}
        </div>
    )
}


function HomeRequestHealthChart(
    {rowData}: { rowData?: { time: string, successful: number, failed: number }[] }
) {

    return (
        <div className="container mx-auto my-1 mt-4">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={rowData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="time"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="successful" stroke="#8884d8"/>
                    <Line type="monotone" dataKey="failed" stroke="#ff4848"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

}

export function MultiSuccessRateChart(
    {successRateData}: {
        successRateData?: { time: string, successRate: number }[]
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


export function APICard(
    {apiName, requestCount, successRate, apiKey}: {
        apiName?: string,
        requestCount?: number,
        successRate?: number,
        apiKey?: string
    }
) {
    return (
        <div className="border border-gray-200 rounded-lg p-4 max-w-sm shadow-md">
            <div className="flex items-center mb-4">
                <img src="/icons/key.svg" alt="Ethereum Sepolia"
                     className="w-6 h-6 mr-2"/>
                <span className="text-sm font-medium">{apiName}</span>
            </div>
            <div className="mb-4">
                <p className="text-sm text-gray-600">{requestCount} requests (24h)</p>
                <p className="text-sm text-gray-600">{successRate}% Success Rate(24h)</p>
            </div>
            <div className="flex justify-between items-center">
                <button className="bg-gray-100 text-gray-700 rounded px-3 py-1 text-sm">Connect API key</button>
                <button onClick={() => router.push(`/api-keys/detail/${apiKey}`)}
                        className="text-xl text-gray-700 rounded">&rarr;</button>
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
