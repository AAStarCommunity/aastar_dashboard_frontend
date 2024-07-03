"use client";
import PageTitle from "@/components/Typography/PageTitle";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "@windmill/react-ui";
import { useRouter } from "next/router";
import React, { useMemo, Suspense, useEffect, useState, ChangeEvent, useContext, ReactNode } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import ajax, { API } from "@/ajax";
import { BalanceDetailCard } from "@/components/chart";
import useLoading, { REQUEST_STATUS } from "@/hooks/useLoading";
import SectionTitle from "@/components/Typography/SectionTitle";
import { ThemeContext } from '@/context/ThemeContext'
import Message from "@/utils/message";
import VaildInput from "@/components/VaildInput";
import { useRef } from "react";
import { IFromItemRefs, IRowDataItem } from "@/utils/types";
import { LoadingIcon } from "~/public/icons";
import AAConnectButton from "@/components/AAConnectButton";
import { useSendTransaction, useTransactionConfirmations } from 'wagmi'
import { BaseError, parseEther } from 'viem'
import { DataDateRangePicker } from "@/components/Form/select";


interface ImodelParams {
    handleComfirm: (res: any) => Promise<boolean>,
    isModalOpen: boolean,
    loading: boolean
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export function GasTankModel({ handleComfirm, isModalOpen, setIsModalOpen, loading }: ImodelParams) {
    const modalRef = useRef<IFromItemRefs | null>(null)


    const handleClick = async () => {
        const res = modalRef.current?.getData()
        if (res?.vaild) {
            await handleComfirm(res?.value)
        }
    }

    return (<Modal
        className='w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-md'
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
    >
        <ModalHeader>Amount</ModalHeader>
        <ModalBody>
            <VaildInput required={true}
                name="key"
                ref={modalRef}
            />
        </ModalBody>
        <ModalFooter>
            <Button onClick={handleClick} disabled={loading} iconLeft={loading ? LoadingIcon : null}>comfirm</Button>
        </ModalFooter>
    </Modal>)
}

export default function GasTank() {

    const router = useRouter()
    const { data: Txhash, error, isPending, sendTransaction } = useSendTransaction()
    const [isTestNet, setIsTestNet] = useState(true)
    const [balanceKey, setBalanceKey] = useState(0)
    const [isDepositOpen, setIsDepositOpen] = useState<boolean>(false)
    const { isSuccess: depositSuccess, error: depositConfirmErr } = useTransactionConfirmations({ hash: Txhash })

    const handleDeposit = async (res: string): Promise<boolean> => {
        sendTransaction({ to: `${process.env.NEXT_PUBLIC_TREASURY_ADDRESS}` as `0x${string}`, value: parseEther(res) })
        return isPending
    }
    useEffect(() => {
        if (error || depositConfirmErr) {
            Message({
                type: "danger",
                message: (error as BaseError).shortMessage || error?.message || (depositConfirmErr as BaseError).shortMessage || depositConfirmErr?.message!,
                delay: 4000
            })
        }
        if (!isPending && Txhash && depositSuccess) {
            setIsDepositOpen(false)
            ajax.post(API.SPONSOR_DEPOSIT, { is_test_net: isTestNet, tx_hash: Txhash }).then(({ data }) => {
                setBalanceKey(new Date().getTime())
                Message({
                    type: "success",
                    message: "Successful deposit!"
                })
            })

        }
    }, [error, isPending, Txhash, isTestNet, depositSuccess])




    function getCurrChain(chain: { name: string; }) {
        console.log(chain?.name, 'chain?.name')
        const isTest = (chain?.name !== 'Optimism')
        if (isTest !== isTestNet) {
            setIsTestNet(isTest)
        }
    }

    const subLine = " mt-10 relative overflow-x-auto sm:rounded-lg overflow-hidden"
    return (<main>
        <div className='flex items-center justify-between'>
            <PageTitle>Gas Tank</PageTitle>

            <AAConnectButton getCurrChain={getCurrChain}>
                <Button onClick={() => setIsDepositOpen(true)}>Deposit Gas Tank</Button>
                <Button onClick={() => router.push(`/strategy/create`)}>WithDraw Gas Tank</Button>
            </AAConnectButton>

        </div>
        <GasTankModel handleComfirm={handleDeposit}
            isModalOpen={isDepositOpen} setIsModalOpen={setIsDepositOpen}
            loading={isPending}
        ></GasTankModel>
        <div className={subLine}>

            <SectionTitle>Balance Detail</SectionTitle>
            <div className="grid gap-6 sm:grid-cols-5 lg:grid-cols-5 grid-cols-5">
                <div className="col-span-1" key={balanceKey}>
                    <TotalBalanceBalanceDetailCard isTestNet={isTestNet} />

                    <GasTankQuotaBalanceDetailCard isTestNet={isTestNet} />
                </div>
                <SponsorMetricsChart isTestNet={isTestNet} />

            </div>
            <div className="bg-white dark:bg-gray-800 mt-5 overflow-x-auto sm:rounded-lg overflow-hidden shadow-md p-6">

                <TransHisToryTable isTestNet={isTestNet} />
            </div>
        </div>

        {/*TODO*/}
        {/* <div className={subLine}>
            <h2 className="text-9xl md:text-2xl"> Strategy View</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4  grid-cols-4">
                <div className="col-span-1  p-4 ">
                    <BalanceDetailCard title={"StrategyA - consume balance"} balanceValue={12} />
                </div>
                <div className="col-span-1  p-4">
                    <BalanceDetailCard title={"StrategyB - consume balance"} balanceValue={12} />
                </div>
                <div className="col-span-1  p-4">
                    <BalanceDetailCard title={"StrategyC - consume balance"} balanceValue={12} />
                </div>
                <div className="col-span-1  p-4">
                    <BalanceDetailCard title={"StrategyD - consume balance"} balanceValue={12} />
                </div>
            </div>
        </div> */}


    </main>
    )
}

export function TotalBalanceBalanceDetailCard(
    { isTestNet }: { isTestNet?: boolean }
) {
    console.log("TotalBalanceBalanceDetailCard isTestNet" + isTestNet)
    const [balance, setBalance] = useState(0)
    useEffect(() => {
        ajax.get(API.GET_BALANCE, {
            is_test_net: isTestNet,
            balance_type: 'total_sponsored'
        })
            .then(({ data: { data } }) => {
                setBalance(data.result);
            })
            .catch((e) => {
                console.error('Error fetching balance:', e);
            });
    }, [isTestNet]);

    return (
        <BalanceDetailCard title={"Total Gas Sponsor"} balanceValue={balance} />
    )
}

export function GasTankQuotaBalanceDetailCard({ isTestNet }: { isTestNet?: boolean }) {
    const [balance, setBalance] = useState(0)
    try {
        useEffect(() => {
            ajax.get(API.GET_BALANCE, {
                is_test_net: isTestNet,
                balance_type: 'sponsor_quota_balance'
            }).then(({ data: { data } }) => {
                setBalance(data.result)
            })
        }, [isTestNet])
    } catch (e) {
        console.log(e)
    }
    return (
        <BalanceDetailCard title={"Gas Tank Quota Balance"} balanceValue={balance} />
    )
}
export function SponsorMetricsChart({ isTestNet }: { isTestNet?: boolean }) {
    const [error, setError] = useState<string>("")
    const [status, setStatus] = useState<REQUEST_STATUS>(REQUEST_STATUS.LOADING)
    const [sponsorMetrics, setSponsorMetrics] = useState([]);


    const defaultCurrentDate = new Date();
    const defaultStartDate = new Date();
    defaultStartDate.setDate(defaultCurrentDate.getDate() - 7);
    const [startDate, setStartDate] = useState<Date>(defaultStartDate);
    const [endDate, setEndDate] = useState<Date>(defaultCurrentDate);

    useEffect(() => {
        ajax.get(API.GET_SPONSOR_METRICS, {
            is_test_net: isTestNet,
            start_time: startDate,
            end_time: endDate
        }).then(({ data }) => {
            if (data.code === 200) {
                setSponsorMetrics(data.data)
                data.data.length ? setStatus(REQUEST_STATUS.SUCCESS) : setStatus(REQUEST_STATUS.Empty)
            } else {
                setStatus(REQUEST_STATUS.FAIL)
                setError(data.message)
            }

        }).catch((err) => {
            setStatus(REQUEST_STATUS.FAIL)
            setError(err.toString())
        })
    }, [isTestNet, startDate, endDate]);

    const gasSponsored = <ResponsiveContainer width="100%" height={400}>
        <LineChart
            data={sponsorMetrics}
            margin={{
                top: 20, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis tickFormatter={(value: { toLocaleString: () => any; }) => `$${value.toLocaleString()}`} />
            <Tooltip formatter={(value: { toLocaleString: () => any; }) => `$${value.toLocaleString()}`} />
            <Line type="monotone" dataKey="value" stroke="#000000" activeDot={{ r: 8 }} />
        </LineChart>
    </ResponsiveContainer>
    const LoadGasSponsored = useLoading(status, gasSponsored, { loadingTo: 'self', errTips: error })
    return (
        <div className="grid rounded-xl bg-white dark:bg-gray-800  p-2 shadow-smflex-col col-span-4 gap-4">
            <div className="flex">
                <h2 className='text-gray-500 dark:text-gray-400 pl-8 pt-4  text-xl'>Gas sponsored</h2>
                <div className="pl-8 mt-3">
                    <DataDateRangePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
                </div>
            </div>

            <div className="relative overflow-hidden h-full row-span-10">{LoadGasSponsored}</div>
        </div>
    );
}


function TransHisToryTable({ isTestNet }: { isTestNet?: boolean }) {
    const [rowData, setRowData] = useState([]);

    const defaultCurrentDate = new Date();
    const defaultStartDate = new Date();
    defaultStartDate.setDate(defaultCurrentDate.getDate() - 7);
    const [startDate, setStartDate] = useState<Date>(defaultStartDate);
    const [endDate, setEndDate] = useState<Date>(defaultCurrentDate);

    const [status, setStatus] = useState<REQUEST_STATUS>(REQUEST_STATUS.LOADING)
    const [error, setError] = useState<string>("")
    const HistoryChart = useLoading(status, <HistToryChar rowData={rowData} />, { loadingTo: 'self', errTips: error }) 
    useEffect(() => {
        ajax.get(API.GET_SPONSOR_TRANSACTION_LIST, {
            is_test_net: isTestNet,
            start_time: startDate,
            end_time: endDate
        }).then(({ data}) => {
            if (data.code == 200) {
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

    }, [isTestNet, startDate, endDate]);

    return (
        <div>
            <div className="flex gap-5">
                <SectionTitle>Trans HisTory</SectionTitle>
                <div className="pl-8 mb-4">
                    <DataDateRangePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
                </div>
            </div>
            <div className="relative overflow-hidden row-span-10 mt-10 mb-5">
                {HistoryChart}
            </div>
        </div>
    )
}
function HistToryChar(
    { rowData }: { rowData?: IRowDataItem[] }
): ReactNode {
    const { theme } = useContext(ThemeContext)
    const columnDefs: any = [
        { headerName: 'UpdateType', field: 'update_type', flex: 1 },
        { headerName: 'Amount', field: 'amount', flex: 1, valueFormatter: (params: any) => `$${params.value}` },
        { headerName: 'TxHash', field: 'tx_hash', flex: 1 },
        { headerName: 'Time', field: 'time', flex: 1 },
    ];
    return (
        <div
            className={`w-full min-w-full ${theme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz "} `}// applying the grid theme
            style={{ height: 500 }}
        >
            <AgGridReact
                className="min-w-full"
                rowData={rowData}
                pagination={true}
                paginationPageSize={10}
                paginationPageSizeSelector={[10]}
                columnDefs={columnDefs}
            />
        </div>
    )
}