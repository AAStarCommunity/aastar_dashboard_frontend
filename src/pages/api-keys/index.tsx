import { SetStateAction, useCallback, useRef, useState } from 'react'
import Copy from '@/components/Copy'
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button
} from '@windmill/react-ui'
import VaildInput from '@/components/VaildInput'
import { useEffect } from 'react'
import ajax, { API } from '@/ajax'
import { useRouter } from 'next/router'
import { IFromItemRefs, ObjType } from '@/utils/types'
import StarText from '@/components/StarText'
import Message from '@/utils/message'
import useLoading, { REQUEST_STATUS } from '@/hooks/useLoading'
import { LoadingIcon } from '~/public/icons'
import PageTitle from '@/components/Typography/PageTitle'
import { JsonRpcConnectComponent, NetworkSelect } from '@/components/Form'

export default function Apikeys() {
    const router = useRouter()
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [isOpenDelete, setIsOpenDelete] = useState(false)
    const [isOpenProjectInfo, setIsOpenProjectInfo] = useState(false)
    const [isRpcInfo, setIsRpcInfo] = useState<boolean>(false)
    const [currentItem, setCurrentItem] = useState<ObjType<string>>({})
    const [status, setStatus] = useState<REQUEST_STATUS>(REQUEST_STATUS.LOADING)
    const [deleting, setDeleting] = useState(false)

    const [formData, setFormData] = useState<ObjType<string>[]>([])

    const keyNameRef = useRef<IFromItemRefs | null>(null)

    // init table data
    const init = () => {
        ajax.get(API.GET_API_KEY_LIST).then(({ data }) => {
            setFormData(data.data)
            setStatus(REQUEST_STATUS.SUCCESS)
        })
    }
    useEffect(() => {
        init()
    }, [])


    const projectInfoClick = useCallback((item: ObjType<string>, type: 'info' | 'delete' | 'rpc') => {
        setCurrentItem(item)
        if (type === 'info') {
            setIsOpenProjectInfo(true)
        } else if (type === 'delete') {
            setIsOpenDelete(true)
        } else if (type === 'rpc') {
            setIsRpcInfo(true)
        }


    }, [])

    const handleGenerateKey = () => {
        const res = keyNameRef.current?.getData()
        if (res?.vaild) {
            setIsOpenCreate(false)
            ajax.post(API.APPLY_API_KEY, { api_key_name: res?.value }).then(({ data }) => {
                if (data.code === 200) {
                    Message({
                        type: "success",
                        message: "success apply!"
                    })
                    init()
                }
            })

        }
    }

    const continueDelete = () => {
        setDeleting(true)
        ajax.delete(API.DELETE_API_KEY, {
            api_key: currentItem.api_key
        }).then(({ data }) => {
            if (data.code === 200) {
                Message({
                    type: "success",
                    message: "Success Delete!"
                })
                setIsOpenDelete(false)
                init()
            }
        }).finally(() => {
            setDeleting(true)
        })
    }

    const handleRpcInfo = () => {
        setIsRpcInfo(false);
    }

    const tableDom = (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        api key
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <span className="">actions</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {formData?.map((item, index) => {
                    return (
                        <tr key={index}
                            className="bg-white border-b hover:bg-gray-200   dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-800 cursor-pointer"
                            onClick={() => router.push(`/api-keys/detail/${item.api_key}`)}>
                            <th scope="row"
                                className=" cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {item.key_name}
                            </th>
                            <td className="px-6 py-4">
                                <div className='flex items-center cursor-pointer'>
                                    <StarText text={item.api_key}></StarText>
                                    <Copy text={item.api_key} /></div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className='flex'>
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        projectInfoClick(item, 'rpc')
                                    }} type="button"
                                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center me-2 mb-2">
                                        Connect API
                                    </button>

                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        projectInfoClick(item, 'info')
                                    }} type="button"
                                        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center me-2 mb-2">
                                        Project Info
                                    </button>
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        projectInfoClick(item, 'delete')
                                    }} type="button"
                                        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center me-2 mb-2">
                                        Delete
                                    </button>
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        router.push(`/api-keys/edit/${item.api_key}`)
                                    }} type="button"
                                        className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )
                })}


            </tbody>
        </table>)

    const dataDom = useLoading(status, tableDom)


    return (

        <div>
            <div className='flex items-center justify-between'>
                <PageTitle>API Keys</PageTitle>
                <Button onClick={() => setIsOpenCreate(true)} > keys apply</Button>


            </div>
            <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg overflow-hidden">
                {dataDom}
            </div>


            <Modal
                className='w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-md'
                isOpen={isOpenCreate}
                onClose={() => setIsOpenCreate(false)}
            >
                <ModalHeader>Name</ModalHeader>
                <ModalBody>
                    <VaildInput required={true}
                        name="key"
                        ref={keyNameRef}
                    />
                </ModalBody>
                <ModalFooter>
                    <button onClick={handleGenerateKey} type="button"
                        className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Generate API Key
                    </button>
                    {/* <Button className="sm:w-auto w-48 mb-6">Generate API Key</Button> */}
                </ModalFooter>
            </Modal>




            {/* project info */}
            <Modal
                className='w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-md'
                isOpen={isOpenProjectInfo}
                onClose={() => setIsOpenProjectInfo(false)}
            >
                {/* <ModalHeader>Project info </ModalHeader> */}
                <ModalBody>
                    {/* <VaildInput label='Access netowrk' name="access_netowrk" defaultValue="sepolia" disabled={true}></VaildInput> */}
                    <VaildInput label='Project code' name="project_code" defaultValue={currentItem.project_code}
                        disabled={true}></VaildInput>

                </ModalBody>
                {/* <ModalFooter>
          <Button onClick={() => setIsOpenCreate(true)} className="sm:w-auto w-48 mb-6">Generate API Key</Button>
        </ModalFooter> */}
            </Modal>

            {/* RPC Info */}
            <JsonRpcConnectComponent isRpcInfo={isRpcInfo} setIsRpcInfoFunc={handleRpcInfo} apiKey={currentItem.api_key} />

            {/* delete confirm */}
            <Modal
                className='w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-md'
                isOpen={isOpenDelete}
                onClose={() => setIsOpenDelete(false)}
            >
                <ModalHeader>Are you absolutely sure?</ModalHeader>
                <ModalBody>
                    <span>This action cannot be undone. This will permanently delete your API key and remove your data from our servers.</span>
                </ModalBody>

                <ModalFooter>
                    {/* <Button onClick={} className="sm:w-auto w-48 mb-6">cancel</Button> */}
                    <div className='flex items-center justify-end w-full '>
                        <button onClick={() => setIsOpenDelete(false)} type="button"
                            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            cancel
                        </button>
                        <Button iconLeft={deleting ? LoadingIcon : null} type="button" onClick={continueDelete}
                            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center me-2 mb-2">
                            Continue
                        </Button>
                    </div>

                </ModalFooter>
            </Modal>
        </div>
    )
}
