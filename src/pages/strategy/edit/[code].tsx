import { Button } from '@windmill/react-ui'
import PageTitle from '@/components/Typography/PageTitle';
import { useEffect, useState } from 'react';
import Form, { IFormItem, IFormRefs } from '@/components/Form';
import { useRef } from 'react';
import ajax, { API } from '@/ajax';
import router, { useRouter } from 'next/router';
import useLoading, { REQUEST_STATUS } from '@/hooks/useLoading';
import { LoadingIcon } from '~/public/icons';
import { mergeLoadedFields } from '@/utils';
import style from "./edit.module.scss";
// import useFormOptions from '../components/useFormOptions';
import Message from '@/utils/message';
import { NET_LIST } from '@/utils/const';
export const formOptions: IFormItem[] =
    [
        {
            name: 'strategy_name',
            label: "Name (required)",
            desc: "Name of the Strategy",
            placeholder: '',
            defaultValue: '',
            type: "input",
            required: true
        },
        {
            name: 'description',
            label: "Description",
            desc: "Description of the strategy.",
            placeholder: '',
            defaultValue: '',
            type: "input",
            inputType: "textarea"
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
            name: 'start_time',
            label: "Start Date",
            desc: "The date when this strategy should start.",
            placeholder: '',
            defaultValue: '',
            type: "datepicker",
            // group: 'time-group flex items-center w-full'
            group: `${style['time-group']} time-group flex items-center w-full max-lg:flex-col flex-row `
        },
        {
            name: 'end_time',
            label: "End date",
            desc: "The date when this strategy should end.",
            placeholder: '',
            defaultValue: '',
            type: "datepicker",
            // group: 'time-group flex items-center w-full'
            group: `${style['time-group']} time-group flex items-center w-full max-lg:flex-col flex-row `
        },
        {
            name: "switch",
            label: "Limit Setting",
            desc: "Maximum Number of All Operations",
            placeholder: '',
            defaultValue: '',
            type: "switch",
            isControl: true,
            group: `${style['limit-group']} time-group flex items-center w-full max-lg:flex-col flex-row `
        },
        {
            name: 'global_max_usd',
            label: "Global Maximums",
            desc: "Limit the total amount of USD or Native Tokens you are willing to sponsor.",
            placeholder: '',
            defaultValue: '',
            type: "input",
            inputType: "number",
            group: `${style['limit-group']} time-group flex items-center w-full max-lg:flex-col flex-row `
        },
        {
            name: 'per_user_max_usd',
            label: "Per User Maximums",
            desc: "Limit the amount of USD or Native Tokens you are willing to sponsor per user.",
            placeholder: '',
            defaultValue: '',
            type: "input",
            inputType: "number",
            group: `${style['limit-group']} time-group flex items-center w-full max-lg:flex-col flex-row `
        },

        {
            name: 'day_max_usd',
            label: "Maximum usage per day",
            desc: "Limit the amount of USD or Native Tokens you are willing to sponsor per day.",
            placeholder: '',
            defaultValue: '',
            type: "input",
            inputType: "number",
            group: `${style['limit-group']} time-group flex items-center w-full max-lg:flex-col flex-row `
        },

        {
            name: 'address_block_list',
            label: "Block Address List",
            // desc: "Limit the amount of USD or Native Tokens you are willing to sponsor per day.",
            placeholder: '',
            defaultValue: '',
            type: "input",
            addlist: true,
        },
        {
            name: "allchains",
            label: "Enabled for all chains",
            desc: "Enable this strategy for all chains.",
            placeholder: '',
            defaultValue: true,
            type: "switch",
            isControl: true,
            controlRevert: true,
            group: `${style['Chains-group']} Chains-group`
        },
        {
            name: 'chain_id_whitelist',
            label: "Enabled Chains",
            desc: "Select the chains you want to enable this policy for.",
            defaultValue: [],
            type: "checkbox",
            list: NET_LIST,
            group: `${style['Chains-group']} Chains-group`
        },

    ]


export default function ApikeysEdit() {
    const [formArr, setFormArr] = useState<IFormItem[]>(formOptions)

    const formRefs = useRef<IFormRefs>(null)
    const router = useRouter()
    let strategyCode = router.query.code
    const [status, setStatus] = useState<REQUEST_STATUS>(REQUEST_STATUS.LOADING)
    const [committed, setommitted] = useState(true)

    function commitChange() {
        formRefs.current?.getData(({ vailded, values }) => {
            if (vailded) {
                console.log(values)
                setommitted(false)
                // if (values.allchains) { values.chain_id_whitelist = [] }
                // if (!values.switch) { values.day_max_usd = ''; values.global_max_usd = ''; values.per_user_max_usd = '' }
                ajax.put(API.UPDATE_STRATEGY, {
                    ...values
                }).then(() => {
                    setommitted(true)
                    Message({
                        type: "success",
                        message: "Change Saved!"
                    })
                })
            }
        })
    }
    useEffect(() => {
        if (router.isReady) {
            strategyCode = router.query.code
            ajax.get(API.GET_STRATEGY, { strategy_code: strategyCode }).then(({ data }) => {
                if (data.code === 200) {
                    const exec = data.data.execute_restriction
                    const addMap = {
                        // chain_id_whitelist: ['ethereum-mainnet'],
                        allchains: !data.data.execute_restriction?.chain_id_whitelist?.length,
                        switch: exec.day_max_usd || exec.global_max_usd || exec.per_user_max_usd
                    }
                    setFormArr(prev => mergeLoadedFields(prev, { ...data.data, ...exec, ...addMap }))
                    setStatus(REQUEST_STATUS.SUCCESS)
                } else {
                    setStatus(REQUEST_STATUS.FAIL)
                }
            }).catch(() => {
                setStatus(REQUEST_STATUS.FAIL)
            })
        }
    }, [router, router.isReady, router.query])

    const dataDom = useLoading(status, <Form formArr={formArr} ref={formRefs} />)


    return (

        <div className={style.form}>
            < PageTitle > Edit Strategy</ PageTitle>

            <div className='pb-10 relative md '>
                {dataDom}
                <Button onClick={commitChange} iconLeft={committed ? null : LoadingIcon}>Save changes
                </Button>
                <div className='text-gray-500 text-sm pt-4 dark:text-gray-400'>The changes will take effect in about a minute.</div>
            </div>
        </div>
    )
}