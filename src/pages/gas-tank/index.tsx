import PageTitle from "@/components/Typography/PageTitle";
import {Button} from "@windmill/react-ui";
import {useRouter} from "next/router";
import React, {Suspense, useEffect, useState, ChangeEvent} from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {AgGridReact} from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import ajax, {API} from "@/ajax";
import {BalanceDetailCard} from "@/components/chart";


export default function GasTank() {
    const router = useRouter()
    const subLine = " mt-10 relative overflow-x-auto sm:rounded-lg overflow-hidden"
    const [isTestNet, setIsTestNet] = useState(true)
    const handleNetworkChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedNetwork = event.target.value;
        setIsTestNet(selectedNetwork === 'testNet')
        console.log("Set " + (selectedNetwork === 'testNet'));
    }
    return (<main>
            <div className='flex items-center justify-between'>
                <PageTitle>Gas Tank</PageTitle>

                <dl>
                    <select onChange={handleNetworkChange} value={isTestNet ? 'testNet' : 'mainNet'}>
                        <option value="testNet">TestNet</option>
                        <option value="mainNet">MainNet</option>
                    </select>
                    <Button onClick={() => router.push(`/strategy/create`)}>Deposit Gas Tank</Button>
                    <Button onClick={() => router.push(`/strategy/create`)}>WithDraw Gas Tank</Button>
                </dl>
            </div>
            <div className={subLine}>
                <h2 className="text-9xl md:text-2xl">Balance Detail</h2>
                <div className="grid gap-6 sm:grid-cols-5 lg:grid-cols-5 grid-cols-5">
                <div className="col-span-1">
                        <Suspense fallback={<div>Loading...</div>}>
                            <TotalBalanceBalanceDetailCard isTestNet={isTestNet}/>
                        </Suspense>
                        <Suspense>
                            <GasTankQuotaBalanceDetailCard/>
                        </Suspense>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <SponsorMetricsChart/>
                    </Suspense>

                </div>
                <div className="bg-white mt-5 overflow-x-auto sm:rounded-lg overflow-hidden shadow-md">
                    <h3 className="text-5xl md:text-2xl">Trans HisTory</h3>
                    <TransHisToryTable/>
                </div>
            </div>


            <div className={subLine}>
                <h2 className="text-9xl md:text-2xl">APi Tank consume View</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4  grid-cols-4">
                    <div className="col-span-1  p-4 ">
                        <BalanceDetailCard title={"balance"} balanceValue={12}/>
                    </div>
                    <div className="col-span-1  p-4">
                        <BalanceDetailCard title={"balance"} balanceValue={12}/>
                    </div>
                    <div className="col-span-1  p-4">
                        <BalanceDetailCard title={"balance"} balanceValue={12}/>
                    </div>
                    <div className="col-span-1  p-4">
                        <BalanceDetailCard title={"balance"} balanceValue={12}/>
                    </div>

                </div>
            </div>

            <div className={subLine}>
                <h2 className="text-9xl md:text-2xl"> Strategy View</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4  grid-cols-4">
                    <div className="col-span-1  p-4 ">
                        <BalanceDetailCard title={"StrategyA - consume balance"} balanceValue={12}/>
                    </div>
                    <div className="col-span-1  p-4">
                        <BalanceDetailCard title={"StrategyB - consume balance"} balanceValue={12}/>
                    </div>
                    <div className="col-span-1  p-4">
                        <BalanceDetailCard title={"StrategyC - consume balance"} balanceValue={12}/>
                    </div>
                    <div className="col-span-1  p-4">
                        <BalanceDetailCard title={"StrategyD - consume balance"} balanceValue={12}/>
                    </div>
                </div>
            </div>
        </main>
    )
}

export function TotalBalanceBalanceDetailCard(
    {isTestNet }: { isTestNet?: boolean }
) {
    console.log("TotalBalanceBalanceDetailCard isTestNet" + isTestNet)
    const [balance, setBalance] = useState(0)
    useEffect(() => {
        ajax.get(API.GET_BALANCE, {
            is_test_net: isTestNet
        })
            .then(({ data: { data } }) => {
                setBalance(data.result);
            })
            .catch((e) => {
                console.error('Error fetching balance:', e);
            });
    }, [isTestNet]);

    return (
        <BalanceDetailCard title={"Total Gas Sponsor"} balanceValue={balance}/>
    )
}

export function GasTankQuotaBalanceDetailCard() {
    const [balance, setBalance] = useState(0)
    try {
        useEffect(() => {
            ajax.get(API.GET_BALANCE, {
                is_test_net: true
            }).then(({data: {data}}) => {
                setBalance(data.result)
            })
        }, [])
    } catch (e) {
        console.log(e)
    }
    return (
        <BalanceDetailCard title={"Gas Tank Quota Balance"} balanceValue={balance}/>
    )
}
export function SponsorMetricsChart() {

    const[sponsorMetrics, setSponsorMetrics] = useState([]);
    useEffect(() => {
        ajax.get(API.GET_SPONSOR_METRICS, {
            is_test_net: true
        }).then(({data: {data}}) => {
            setSponsorMetrics(data)
        }).catch((e) => {
            console.error('Error fetching sponsor metrics:', e);
        })
    }, []);
    return (
        <div className="grid rounded-xl bg-white p-2 shadow-smflex-col col-span-4">
            <h3 className="text-5xl md:text-2xl">Gas sponsored</h3>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart
                    data={sponsorMetrics}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="time"/>
                    <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`}/>
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`}/>
                    <Line type="monotone" dataKey="value" stroke="#000000" activeDot={{r: 8}}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}


function TransHisToryTable() {
    const [rowData, setRowData] = useState([]);

    const tableInit = () => {
        ajax.get(API.GET_SPONSOR_TRANSACTION_LIST, {
            is_test_net: true
        }).then(({data: {data}}) => {
            setRowData(data)
        })

    }
    useEffect(() => {
        tableInit();

    }, []);
    const columnDefs: any = [
        {headerName: 'UpdateType', field: 'update_type', flex: 1},
        {headerName: 'Amount', field: 'amount', flex: 1, valueFormatter: (params: any) => `$${params.value}`},
        {headerName: 'TxHash', field: 'tx_hash', flex: 1},
        {headerName: 'Time', field: 'time', flex: 1},
    ];
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

