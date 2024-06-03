import {Button} from '@windmill/react-ui'
import PageTitle from '@/components/Typography/PageTitle';
import {useEffect, useState} from 'react';
import Form, {IFormItem, IFormRefs} from '@/components/Form';
import {useRef} from 'react';
import ajax, {API} from '@/ajax';
import {useRouter} from 'next/router';
import useLoading, {REQUEST_STATUS} from '@/hooks/useLoading';
import {LoadingIcon} from '~/public/icons';
import {mergeLoadedFields} from '@/utils';
import Message from '@/utils/message';
import style from "@/pages/strategy/edit/edit.module.scss";

export default function ApikeysEdit() {

    const formRefs = useRef<IFormRefs>(null)
    const router = useRouter()
    let apiKey = router.query.key
    const [status, setStatus] = useState<REQUEST_STATUS>(REQUEST_STATUS.LOADING)
    const [committed, setommitted] = useState(true)
    const [formArr, setFormArr] = useState<IFormItem[]>([
        {
            name: 'key_name',
            label: "Name (required)",
            desc: "Name of the API key",
            placeholder: '',
            defaultValue: '',
            type: "input",
            required: true
        },
        {
            name: 'project_code',
            label: "Project Code",
            // desc: "Name of the API key",
            placeholder: '',
            defaultValue: '',
            type: "input"
        },
        {
            name: "paymaster_enable",
            label: "Paymaster enable",
            desc: "Paymaster enable",
            placeholder: '',
            defaultValue: '',
            type: "switch",
            isControl: true,
            group: `${style['limit-group']} time-group flex items-center w-full max-lg:flex-col flex-row `
        },
        {
            name: "erc20_paymaster_enable",
            label: "Pay for gas fees of your users in exchange for ERC-20 tokens.",
            desc: "Pay for gas fees of your users in exchange for ERC-20 tokens.",
            placeholder: '',
            defaultValue: '',
            type: "switch",
            group: `${style['limit-group']} time-group flex items-center w-full max-lg:flex-col flex-row `
        },
        {
            name: "project_sponsor_paymaster_enable",
            label: "project sponsor paymaster enable",
            desc: "Sponsor gas fees By Project Deposit GasTank",
            placeholder: '',
            defaultValue: '',
            type: "switch",
            group: `${style['limit-group']} time-group flex items-center w-full max-lg:flex-col flex-row `
        },
        {
            name: "user_pay_paymaster_enable",
            label: "user fee pay paymaster enable",
            desc: "Sponsor gas fees By User Personal Deposit GasTank",
            placeholder: '',
            defaultValue: '',
            type: "switch",
            group: `${style['limit-group']} time-group flex items-center w-full max-lg:flex-col flex-row `
        },
        {
            name: "network_limit_enable",
            label: "Network limit enable",
            desc:  "Network limit enable",
            placeholder: '',
            defaultValue: '',
            type: "switch",
            isControl: true,
            group: `${style['network-limit-group']} time-group flex items-center w-full max-lg:flex-col flex-row `
        },
        {
            name: "ip_white_list",
            label: "ip white list",
            desc:  "Restrict read and write requests through this API key to specified IPv4 addresses",
            placeholder: '',
            defaultValue: '',
            type: "input",
            addlist: true,
            group: `${style['network-limit-group']} time-group flex items-center w-full max-lg:flex-col flex-row `
        },
        {
            name: "domain_white_list",
            label: "domain white list",
            desc:  "Restrict read and write requests through this API key to specified domains",
            placeholder: '',
            defaultValue: '',
            type: "input",
            addlist: true,
            group: `${style['network-limit-group']} time-group flex items-center w-full max-lg:flex-col flex-row `
        },
    ])

    function commitChange() {
        formRefs.current?.getData(({vailded, values}) => {
            if (vailded) {
                setommitted(false)
                ajax.put(API.UPDATE_API_KEY, {
                    api_key_name: values.key_name,
                    // project_code: values.project_code,
                    api_key: apiKey
                }).then(() => {
                    Message({
                        type: "success",
                        message: "Change submitted successfully!"
                    })
                    setommitted(true)
                })
            }
        })
    }

    useEffect(() => {
        if (router.isReady) {
            apiKey = router.query.key
            ajax.get(API.GET_API_KEY, {api_key: apiKey}).then(({data}) => {
                setFormArr(prev => {
                    return mergeLoadedFields(prev, data.data)
                })
                setStatus(REQUEST_STATUS.SUCCESS)
            })
        }
    }, [router, router.isReady, router.query])

    const dataDom = useLoading(status, <Form formArr={formArr} ref={formRefs}/>)


    return (
        <>
            < PageTitle> Edit API key settings</ PageTitle>
            <div className='pb-10 relative '>
                {dataDom}
                <Button onClick={commitChange} disabled={!committed} iconLeft={committed ? null : LoadingIcon}>Save
                    changes
                </Button>
                <div className='text-gray-500 text-sm pt-4 dark:text-gray-400'>The changes will take effect in about a
                    minute.
                </div>
            </div>
        </>
    )
}
