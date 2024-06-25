"use client";
import PageTitle from "@/components/Typography/PageTitle";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "@windmill/react-ui";
import { useRouter } from "next/router";
import React, { useMemo, Suspense, useEffect, useState, ChangeEvent, useContext } from "react";
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
import { IFromItemRefs } from "@/utils/types";
import { LoadingIcon } from "~/public/icons";
import AAConnectButton from "@/components/AAConnectButton";
import { useSendTransaction } from 'wagmi'
import { BaseError, parseEther } from 'viem'


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


    const handleDeposit = async (res: string): Promise<boolean> => {
        sendTransaction({ to: `${process.env.NEXT_PUBLIC_TREASURY_ADDRESS}` as `0x${string}`, value: parseEther(res) })
        return isPending
    }
    useEffect(() => {
        if (error) {
            Message({
                type: "danger",
                message: (error as BaseError).shortMessage || error.message
            })
        }
        console.log(Txhash, 'Txhash')
        if (!isPending && Txhash) {
            setIsDepositOpen(false)
            setTimeout(() => {
                ajax.post(API.SPONSOR_DEPOSIT, { is_test_net: isTestNet, tx_hash: Txhash }).then(({ data }) => {
                    setBalanceKey(new Date().getTime())
                    Message({
                        type: "success",
                        message: "Deposit Success!"
                    })
                })
            }, 2000)
        }
    }, [error, isPending, Txhash, isTestNet])


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

                    <GasTankQuotaBalanceDetailCard />
                </div>
                <SponsorMetricsChart />

            </div>
            <div className="bg-white dark:bg-gray-800 mt-5 overflow-x-auto sm:rounded-lg overflow-hidden shadow-md p-6">
                <SectionTitle>Trans HisTory</SectionTitle>
                <TransHisToryTable />
            </div>
        </div>

        {/*TODO*/}
        <div className={subLine}>
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
        </div>


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

export function GasTankQuotaBalanceDetailCard() {
    const [balance, setBalance] = useState(0)
    try {
        useEffect(() => {
            ajax.get(API.GET_BALANCE, {
                is_test_net: true,
                balance_type: 'sponsor_quota_balance'
            }).then(({ data: { data } }) => {
                setBalance(data.result)
            })
        }, [])
    } catch (e) {
        console.log(e)
    }
    return (
        <BalanceDetailCard title={"Gas Tank Quota Balance"} balanceValue={balance} />
    )
}
export function SponsorMetricsChart() {
    const [error, setError] = useState<string>("")
    const [status, setStatus] = useState<REQUEST_STATUS>(REQUEST_STATUS.LOADING)
    const [sponsorMetrics, setSponsorMetrics] = useState([]);
    useEffect(() => {
        ajax.get(API.GET_SPONSOR_METRICS, {
            is_test_net: true
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
    }, []);

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
        <div className="grid rounded-xl bg-white dark:bg-gray-800  p-2 shadow-smflex-col col-span-4">
            <h2 className='text-gray-500 dark:text-gray-400 pl-8 pt-4 text-xl'>Gas sponsored</h2>
            <div className="relative overflow-hidden h-full row-span-10">{LoadGasSponsored}</div>
        </div>
    );
}


function TransHisToryTable() {
    const [rowData, setRowData] = useState([]);
    const { theme } = useContext(ThemeContext)
    const tableInit = () => {
        ajax.get(API.GET_SPONSOR_TRANSACTION_LIST, {
            is_test_net: true
        }).then(({ data: { data } }) => {
            setRowData(data)
        })

    }
    useEffect(() => {
        tableInit();

    }, []);
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
                columnDefs={columnDefs}
            />
        </div>
    )

}

