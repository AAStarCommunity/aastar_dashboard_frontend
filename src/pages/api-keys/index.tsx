import { SetStateAction, useState } from 'react'
import Copy from '@/components/Copy'
import {
    TableContainer,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    Badge,
    TableFooter,
    Pagination,
    Button,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Input
} from '@windmill/react-ui'
import VaildInput from '@/components/VaildInput'


export default function Apikeys() {
    const [isOpenCreate, setIsOpenCreate] = useState(false)
    const [newKey, setNewKey] = useState('')

    return (
        <div className='p-9'>
            <div className='flex items-center justify-between'>
                <h1 className='dark:text-white font-bold text-2xl text-gray-900'>API Keys</h1>
                <Button onClick={() => setIsOpenCreate(true)}>API keys apply</Button>
            </div>
            <TableContainer className="pt-10">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>API Key Name</TableCell>
                            <TableCell>API Key Secret</TableCell>
                            <TableCell>access_netowrk</TableCell>
                            <TableCell>project_code</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <div className="flex items-center text-sm">
                                    <span className="font-semibold ml-2">Judith Ipsum</span>
                                    <Copy text={''} />
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="text-sm">$ 534.87</span>
                            </TableCell>
                            <TableCell>
                                <span className="text-sm">$ 534.87</span>
                            </TableCell>
                            <TableCell>
                                <Badge type="success">success</Badge>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <TableFooter>
                    <Pagination totalResults={10} resultsPerPage={4} onChange={() => { }} label="Table navigation" />
                </TableFooter>
            </TableContainer>

            <Modal className='w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-md'
                isOpen={isOpenCreate}
                onClose={() => setIsOpenCreate(false)}
            >
                <ModalHeader>Name</ModalHeader>
                <ModalBody>
                    <VaildInput required={true}
                        defaultValue={newKey}
                        name="key"
                        // getVaild={() => { }}
                        setValue={setNewKey} />
                </ModalBody>
                <ModalFooter>
                    <Button className="sm:w-auto w-48 mb-6">Generate API Key</Button>
                </ModalFooter>
            </Modal>
        </div >
    )
}