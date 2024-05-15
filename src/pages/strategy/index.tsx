import ajax, { API } from "@/ajax";
import Copy from "@/components/Copy";
import Switch from "@/components/Switch";
import PageTitle from "@/components/Typography/PageTitle";
import { Badge, Modal, ModalBody, ModalFooter, ModalHeader, Pagination, Table, TableBody, TableCell, TableContainer, TableFooter, TableHeader, TableRow } from "@windmill/react-ui";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Strategy() {
  const router = useRouter()
  // const [isOpenCreate, setIsOpenCreate] = useState(false)
  const [isOpenDetele, setIsOpenDetele] = useState(false)


  const continueDetele = () => {
    ajax
      .detele(API.DETELE_API_KEY, {
        params: {
          user_id: '122121'
        }
      })
      .then(({ data }) => {
        const newData = data.data;

      })
      .catch(error => {
        console.log(error);
      });
  }
  return (
    <>
      <div className='flex items-center justify-between'>
        <PageTitle>Strategy Data</PageTitle>
        <button onClick={() => router.push(`/strategy/edit/${111}`)} type="button" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Create Strategy</button>
        {/* <Button ></Button> */}

      </div>


      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple MacBook Pro 17
              </th>
              <td className="px-6 py-4">
                Silver
              </td>
              <td className="px-6 py-4">
                Laptop
              </td>
              <td className="px-6 py-4">
                <Switch name="status" class="mb-0"></Switch>
              </td>
              <td className="px-6 py-4 text-left">
                <button onClick={() => router.push(`/strategy/edit/${111}`)} type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                  Edit</button>
                {/* <button onClick={() => setIsOpenProjectInfo(true)} type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center me-2 mb-2">
                  Project Info
                </button> */}
                <button onClick={() => setIsOpenDetele(true)} type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center me-2 mb-2">
                  Detele
                </button>


              </td>
            </tr>

          </tbody>
        </table>

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
            <div className='flex items-center'>
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