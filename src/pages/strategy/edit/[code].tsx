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
                setommitted(false)
                ajax.put(API.UPDATE_API_KEY, {
                    api_key_name: values.key_name,
                    // project_code: values.project_code,
                    strategy_code: strategyCode
                }).then(() => {
                    setommitted(true)
                })
            }
        })
    }
    useEffect(() => {
        if (router.isReady) {
            strategyCode = router.query.code
            ajax.get(API.GET_STRATEGY, { strategy_code: strategyCode }).then(({ data }) => {
                if (data.code === 200) {
                    setFormArr(prev => mergeLoadedFields(prev, { ...data.data, ...data.data.execute_restriction }))
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