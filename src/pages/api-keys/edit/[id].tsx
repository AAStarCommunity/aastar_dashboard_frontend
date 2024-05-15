import { Label, Input, HelperText, Button } from '@windmill/react-ui'
import PageTitle from '@/components/Typography/PageTitle';
import Switch from '@/components/Switch';
import { useState } from 'react';
import { IFromItemProps } from '@/utils/types';
import Form, { IFormItem, IFormRefs } from '@/components/Form';
import { useRef } from 'react';
export default function ApikeysEdit() {
    // const [apiKey, setForm] = useState('')
    const formRefs = useRef<IFormRefs>(null)

    function getformData() {
        formRefs.current?.getData(({ vailded, values }) => {
            if (vailded) {
                console.log(values)
            }
        })
    }

    const formArr: IFormItem[] = [
        {
            name: 'apikey',
            label: "Name (required)",
            desc: "Name of the API key",
            placeholder: 'aas',
            defaultValue: '',
            type: "input",
            required: true
        },
        {
            name: 'apikey1',
            label: "Name (required)2",
            desc: "Name of the API key",
            placeholder: 'aas',
            defaultValue: '121',
            type: "input",
            required: true
        },
        {
            name: 'apikey3',
            label: "Name (required)",
            desc: "Name of the API key",
            placeholder: 'aas',
            defaultValue: '3',
            type: "input"
        },
        {
            name: 'apikey4',
            label: "Name (required)",
            desc: "Name of the API key",
            placeholder: 'aas',
            defaultValue: '3',
            type: "input"
        },
        {
            name: 'apikey5',
            label: "Name (required)",
            desc: "Name of the API key",
            placeholder: 'aas',
            defaultValue: true,
            type: "switch",
        },
        {
            name: 'apikey6',
            label: "Name (required)",
            desc: "Name of the API key",
            placeholder: 'aas',
            defaultValue: '',
            type: "input",
            required: true
        }
    ]
    return (

        <>
            < PageTitle > Edit API key settings</ PageTitle>

            <div className='pb-10'>
                <Form formArr={formArr} ref={formRefs} />
                {/* <VaildInput defaultValue={apiKey} setValue={setApiKey} placeholder="production key" desc="Name of the API key" required={true} label="Name (required)"></VaildInput>
                <Label className='mb-6'>
                    <h4 className="mb-1 text-lg text-gray-700 dark:text-gray-200">User agents (optional)</h4>
                    <span className=" text-gray-500 dark:text-gray-400">A request will be allowed if its User-Agent matches any substring whitelisted here</span>
                    
                    <div className="flex items-center justify-between mt-2">
                        <Input className=" flex-1 mr-2" placeholder="production key" />
                        <Button onClick={() => { }}>add</Button>
                    </div>
                </Label>
                <Label className='mb-6'>
                    <h4 className="mb-1 text-lg text-gray-700 dark:text-gray-200">IPs / subnets (optional)</h4>
                    <span className=" text-gray-500 dark:text-gray-400">A request will be allowed if its source IP address matches any IP/subnet whitelisted here</span>
                   
                    <div className="flex items-center justify-between mt-2">
                        <Input className=" flex-1 mr-2" placeholder="production key" />
                        <Button onClick={() => { }}>add</Button>
                    </div>
                </Label>
                <Label className='mb-6'>
                    <h4 className="mb-1 text-lg text-gray-700 dark:text-gray-200">Origins (optional)</h4>
                    <span className=" text-gray-500 dark:text-gray-400">A request will be allowed if its Origin matches any substring whitelisted here</span>
                    
                    <div className="flex items-center justify-between mt-2">
                        <Input className=" flex-1 mr-2" placeholder="production key" />
                        <Button onClick={() => { }}>add</Button>
                    </div>
                </Label>

                <Label className='mb-6'>
                    <div className="flex items-center  mt-2 ">
                        <h4 className="mb-1 text-lg text-gray-700 dark:text-gray-200 mr-6">Enable bundler methods</h4>
                        <Switch></Switch>
                    </div>
                    <span className=" text-gray-500 dark:text-gray-400">Enable bundler methods to be called by this API key. (e.g. eth_sendUserOperation, eth_estimateUserOperationGas)</span>
                </Label>


                <Label className='mb-6'>
                    <div className="flex items-center  mt-2 ">
                        <h4 className="mb-1 text-lg text-gray-700 dark:text-gray-200 mr-6">Enable verifying paymaster</h4>
                        <Switch></Switch>
                    </div>
                    <span className=" text-gray-500 dark:text-gray-400">Enable verifying paymaster methods (pm_sponsorUserOperation) to be called by this API key without sponsorship policies</span>
                </Label>

                 */}
                <Button onClick={getformData} className='focus:outline-none hover:bg-white hover:text-aastar-700"'>Save changes</Button>
                <div className='text-gray-500 text-sm pt-4 dark:text-gray-400'>The changes will take effect in about a minute.</div>



            </div>
        </>
    )
}