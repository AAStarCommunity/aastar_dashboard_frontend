import { Button } from '@windmill/react-ui'
import PageTitle from '@/components/Typography/PageTitle';
import { useState } from 'react';
import Form, { IFormRefs } from '@/components/Form';
import { useRef } from 'react';
import ajax, { API } from '@/ajax';
import { LoadingIcon } from '~/public/icons';
import style from "./edit/edit.module.scss";
import Message from '@/utils/message';
import { formOptions } from './edit/[code]';


export default function ApikeysEdit() {

    const formRefs = useRef<IFormRefs>(null)
    const [committed, setommitted] = useState(true)

    function commitChange() {
        formRefs.current?.getData(({ vailded, values }) => {

            if (vailded) {

                setommitted(false)
                ajax.post(API.ADD_STRATEGY, {
                    ...values
                }).then(({ data }) => {
                    setommitted(true)
                    if (data.code === 200) {
                        Message({
                            type: "success",
                            message: "Create Successful!"
                        })
                    }
                })
            }
        })
    }

    return (

        <div className={style.form}>
            < PageTitle > Create Strategy</ PageTitle>

            <div className='pb-10 relative md '>
                <Form formArr={formOptions} ref={formRefs} />
                <Button onClick={commitChange} iconLeft={committed ? null : LoadingIcon}>Create Now
                </Button>
                <div className='text-gray-500 text-sm pt-4 dark:text-gray-400'>The changes will take effect in about a minute.</div>
            </div>
        </div>
    )
}