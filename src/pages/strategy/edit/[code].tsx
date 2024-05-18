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
import useFormOptions from '../components/useFormOptions';
import Message from '@/utils/message';


export default function ApikeysEdit() {

    const { formArr, setFormArr } = useFormOptions(style)

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