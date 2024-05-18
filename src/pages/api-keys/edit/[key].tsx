import { Button } from '@windmill/react-ui'
import PageTitle from '@/components/Typography/PageTitle';
import { useEffect, useState } from 'react';
import Form, { IFormItem, IFormRefs } from '@/components/Form';
import { useRef } from 'react';
import ajax, { API } from '@/ajax';
import { useRouter } from 'next/router';
import useLoading, { REQUEST_STATUS } from '@/hooks/useLoading';
import { LoadingIcon } from '~/public/icons';
import { mergeLoadedFields } from '@/utils';
import Message from '@/utils/message';

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
        }
    ])
    function commitChange() {
        formRefs.current?.getData(({ vailded, values }) => {
            console.log(apiKey)
            if (vailded) {
                setommitted(false)
                console.log(values)
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
            ajax.get(API.GET_API_KEY, { api_key: apiKey }).then(({ data }) => {
                setFormArr(prev => {
                    return mergeLoadedFields(prev, data.data)
                })
                setStatus(REQUEST_STATUS.SUCCESS)
            })
        }
    }, [router, router.isReady, router.query])

    const dataDom = useLoading(status, <Form formArr={formArr} ref={formRefs} />)


    return (

        <>
            < PageTitle > Edit API key settings</ PageTitle>

            <div className='pb-10 relative '>
                {dataDom}
                <Button onClick={commitChange} iconLeft={committed ? null : LoadingIcon}>Save changes
                </Button>
                <div className='text-gray-500 text-sm pt-4 dark:text-gray-400'>The changes will take effect in about a minute.</div>
            </div>
        </>
    )
}