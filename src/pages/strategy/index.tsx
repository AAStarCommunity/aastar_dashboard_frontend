import ajax, { API } from "@/ajax";
import Copy from "@/components/Copy";
import Switch from "@/components/Switch";
import PageTitle from "@/components/Typography/PageTitle";
import { REQUEST_STATUS } from "@/hooks/useLoading";
import { Button, Badge, Modal, ModalBody, ModalFooter, ModalHeader, Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow } from "@windmill/react-ui";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useTableLoad from "./components/useTableLoad";
import { ObjType } from "@/utils/types";
import Message from "@/utils/message";

export default function Strategy() {
  const router = useRouter()
  const [currentItem, setCurrentItem] = useState<ObjType<string>>({})
  const [isOpenDetele, setIsOpenDetele] = useState(false)
  const deleteClick = useCallback((item: ObjType<string>) => {
    setCurrentItem(item)
    setIsOpenDetele(true)
  }, [])

  const continueDetele = () => {
    ajax.detele(API.DETELE_STRATEGY, {
      strategy_code: currentItem.strategy_code
    }).then(({ data }) => {
      Message({
        type: "success",
        message: "Success Delete!"
      })

    })
  }

  const tableLoad = useTableLoad({ deleteClick, router })
  return (
    <>
      <div className='flex items-center justify-between'>
        <PageTitle>Strategy Data</PageTitle>

        <Button onClick={() => router.push(`/strategy/create`)} >Create Strategy</Button>

      </div>


      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">


        {tableLoad}
        {/* detele confirm */}
        <Modal className='w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-md'
          isOpen={isOpenDetele}
          onClose={() => setIsOpenDetele(false)}
        >
          <ModalHeader>Are you absolutely sure?</ModalHeader>
          <ModalBody>
            <span>This action cannot be undone. This will permanently delete your API key and remove your data from our servers.</span>
          </ModalBody>

          <ModalFooter>
            {/* <Button onClick={} className="sm:w-auto w-48 mb-6">cancel</Button> */}
            <div className='flex items-center justify-end w-full '>
              <button onClick={() => setIsOpenDetele(false)} type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                cancel
              </button>
              <button onClick={continueDetele} type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center me-2 mb-2">
                Continue
              </button>
            </div>

          </ModalFooter>
        </Modal>
      </div>




    </>
  )
}