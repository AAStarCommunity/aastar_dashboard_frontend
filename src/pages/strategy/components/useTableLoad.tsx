import ajax, { API } from "@/ajax";
import Switch from "@/components/Switch";
import useLoading, { REQUEST_STATUS } from "@/hooks/useLoading";
import { IPropChild, ObjType } from "@/utils/types";
import { useCallback, useEffect, useState } from "react";


export default function useTableLoad({ deleteClick, router }: any) {
	const [tabelData, setTableData] = useState<ObjType<any>[]>([])
	const [status, setStatus] = useState(REQUEST_STATUS.LOADING)
	const [StrategyStatus, setStrategyStatus] = useState<boolean[]>([])


	// request status change
	useEffect(() => {

	}, [StrategyStatus])

	useEffect(() => {
		ajax.get(API.GET_STRATEGY_LIST).then(({ data }) => {
			const stautsList = data.map((item: { status: boolean; }) => !!item.status)
			setStrategyStatus(stautsList)
			setTableData(data)
			setStatus(REQUEST_STATUS.SUCCESS)
		})
	}, [])

	const getChangeStatus = useCallback((value: boolean, index: number) => {
		console.log(value, index)
		setStrategyStatus(prevArray => {
			const newArray = [...prevArray];
			newArray[index] = value;
			return newArray;
		})
	}, [])
	const tableDom = (<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
		<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				<th scope="col" className="px-6 py-3">
					Strategy name
				</th>
				<th scope="col" className="px-6 py-3">
					Strategy ID
				</th>
				<th scope="col" className="px-6 py-3">
					Chains
				</th>
				<th scope="col" className="px-6 py-3">
					Status
				</th>
				<th scope="col" className="px-6 py-3">
					Actions
				</th>
			</tr>
		</thead>
		<tbody>
			{tabelData.map((item, index) => {
				return (
					<tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600">
						<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
							{item.strategy_name}
						</th>
						<td className="px-6 py-4">
							{item.strategy_code}
						</td>
						<td className="px-6 py-4">
							{item.execute_restriction.chain_id_whitelist.join(',')}
						</td>
						<td className="px-6 py-4">
							<Switch defaultValue={!!StrategyStatus[index]}
								setValue={(value) => getChangeStatus(!!value, index)}
								name="status" class="mb-0" ></Switch>
						</td>
						<td className="px-6 py-4 text-left">
							<button onClick={() => router.push(`/strategy/edit/${item.strategy_code}`)} type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
								Edit</button>
							{/* <button onClick={() => setIsOpenProjectInfo(true)} type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center me-2 mb-2">
            Project Info
          </button> */}
							<button onClick={() => deleteClick(item)} type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center me-2 mb-2">
								Detele
							</button>


						</td>
					</tr>
				)
			})}

		</tbody>
	</table>)

	const dataDom = useLoading(status, tableDom)

	return dataDom
}