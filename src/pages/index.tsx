import React, { useState, useEffect, Suspense, ReactNode } from 'react';
import { Button } from "@windmill/react-ui";
import router, { useRouter } from "next/router";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardBody } from '@windmill/react-ui'
import ajax, { API } from "@/ajax";
import { ObjType } from "@/utils/types";
import PageTitle from '@/components/Typography/PageTitle';
import SectionTitle from '@/components/Typography/SectionTitle';
import useLoading, { REQUEST_STATUS } from '@/hooks/useLoading';
import { KeyIcon } from '~/public/icons'
import { DataShowCard, NetworkSelect } from '@/components/Form';
import { DataDateRangePicker } from '@/components/Form/select';


export default function Home() {
    const router = useRouter()

    return (
        <main>

            <PageTitle>OverView</PageTitle>
            <div className='mt-10 relative overflow-x-auto sm:rounded-lg overflow-hidden'>
                <div className='grid gap-5  grid-cols-4'>
                    <Suspense fallback={"loading"}>
                        <RequestHealthAndSuccessRate />
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
                    {/* <h1>My API Keys</h1> */}
                    <SectionTitle>My API Keys</SectionTitle>
                    <dl>
                        <Button onClick={() => router.push(`/api-keys`)}>View All API</Button>
                    </dl>
                </div>
                <APICardSOverView></APICardSOverView>
            </div>
        </main>
    );
}


function HomeRequestHealthChart(
    { rowData }: { rowData?: IRowDataItem[] }
): ReactNode {

    return (
        <div className="container mx-auto my-1 mt-4">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={rowData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="successful" stroke="#8884d8" />
                    <Line type="monotone" dataKey="failed" stroke="#ff4848" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

}
interface IRowDataItem { time: string, successful?: number, failed?: number }


export function RequestHealthAndSuccessRate() {
    const [rowData, setRowData] = useState<IRowDataItem[]>([]);
    const [status, setStatus] = useState<REQUEST_STATUS>(REQUEST_STATUS.LOADING)
    const [error, setError] = useState<string>("")
    const LoadHomeRequestHealthChart = useLoading(status, HomeRequestHealthChart({ rowData }), { loadingTo: 'self', errTips: error })
    // const LoadSuccessRateChart = useLoading(status, HomeRequestHealthChart({ rowData }), { loadingTo: 'self', errTips: error })
    const tableInit = () => {

        ajax.get(API.GET_REQUEST_HEALTH_LIST, {

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
    }, []);
    return (
        <div className="grid rounded-xl bg-white dark:bg-gray-800 p-2 shadow-sm flex-col col-span-4 grid-rows-8">
            <div className="flex justify-between items-center pl-8 pt-4">
                <div>
                    <h2 className="text-gray-500 dark:text-gray-400 text-xl">Request Health</h2>
                    <span className="block text-gray-700 dark:text-gray-300 pt-1">The Success And Failed number of requests you have sent</span>
                </div>
                <div className="flex items-center space-x-4 ml-auto">
                    <div>
                        <span className="block text-gray-700 dark:text-gray-300">Network Select</span>
                        <NetworkSelect handleSelectChange={handleRequestHealthNetworkChange} />
                    </div>
                    <div>
                        <DataDateRangePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
                    </div>
                </div>
            </div>
            <div className="relative overflow-hidden row-span-10 mt-4">
                {LoadHomeRequestHealthChart}
            </div>
        </div>



    )

}

export function PaymasterSponsorPayTypeChart() {
    const [paymasterMetricData, setPaymasterMetricData] = useState([]);

    const tableInit = () => {
        ajax.get(API.GET_PAYMASTER_PAY_TYPE_METRICS).then(({ data }) => {
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
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >

                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="erc20_pay_type" stroke="#0000ff" />
                    <Line type="monotone" dataKey="project_sponsor" stroke="#ff4748" />
                    <Line type="monotone" dataKey="user_pay" stroke="#44ff6d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
// export function OverViewDataCard(

// ) {
//     const [dayRequestHealth, setDayRequestHealth] = useState(Object)

//     const tableInit = () => {


//     }
//     useEffect(() => {
//         tableInit();
//     }, []);
//     return (
//         <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4 grid-cols-4'>
//             <DataShowCard dataName="Total Request (last 24 hour)" dataNum={`${hourRequestHealth?.success_rate}%`} />
//             <DataShowCard dataName="Success rate (last 24 hour)" dataNum={`${dayRequestHealth?.success_rate}%`} />
//             <DataShowCard dataName="Total Request (last 24 hour)" dataNum={`${totalRequest}`} />
//             <DataShowCard dataName="Invalid Request (last 24 hour)" dataNum={`${dayRequestHealth?.failed}`} />
//         </div>
//     )
// }

function APICardSOverView() {
    const [apiKeyDataOverViews, setApiKeyDataOverViews] = useState<ObjType<any>[]>([])
    const tableInit = () => {
        ajax.get(API.GET_API_KEY_OVERVIEW_LIST).then(({ data }) => {
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
                <button onClick={() => router.push(`/api-keys`)}
                    className="text-gray-700  dark:text-gray-300">Empty Here Apply Your API key &rarr;</button>
            )}
        </div>
    )
}




export function MultiSuccessRateChart(
    { successRateData }: {
        successRateData?: { time: string, successRate: number }[]
    }
) {
    return (
        <div className="container mx-auto my-1 mt-4">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={successRateData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ethereum_spepolia" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}


export function APICard(
    { apiName, requestCount, successRate, apiKey }: {
        apiName?: string,
        requestCount?: number,
        successRate?: number,
        apiKey?: string
    }
) {
    return (

        <Card className="border border-gray-200 rounded-lg p-4 max-w-sm shadow-md">
            <CardBody>
                <div className="flex items-center mb-4 font-semibold text-gray-600 dark:text-gray-300">
                    <KeyIcon className="w-6 h-6 mr-2" />
                    <span>{apiName}</span>
                </div>
                <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300">{requestCount} requests (24h)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{successRate}% Success Rate(24h)</p>
                </div>
                <div className="flex justify-between items-center">
                    <button className="bg-gray-100 text-gray-700 rounded px-3 py-1 text-sm">Connect API key</button>
                    <button onClick={() => router.push(`/api-keys/detail/${apiKey}`)}
                        className="text-xl text-gray-700 rounded dark:text-gray-300">View Metrics &rarr;</button>
                </div>
            </CardBody>
        </Card>
    )
}



