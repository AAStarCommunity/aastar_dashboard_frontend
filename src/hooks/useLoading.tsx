import Spin, { insertType } from '@/components/Spin';
import { Button } from '@windmill/react-ui';
import React from 'react'
import { EmptyIcon, ErrorIcon } from '~/public/icons'

export enum REQUEST_STATUS {
    SUCCESS = "success",
    FAIL = "fail",
    LOADING = "loading",
    Empty = "empty"
}
interface IUseLoadingOptions {
    loadingTo: insertType,
    emptyDOM?: React.ReactNode,
    errTips?: String
}

function useLoading(status: string, dom: React.ReactNode, options?: IUseLoadingOptions, emptyMsg?: string, emptyGuideButtonLink?: string, emptyGuideButtonText?: string) {
    emptyMsg = emptyMsg || 'There is no data available.  To start viewing your metrics here, need to send your request'
    emptyGuideButtonLink = emptyGuideButtonLink || "https://docs.aastar.io/"
    emptyGuideButtonText = emptyGuideButtonText || "View Docs"
    switch (status) {
        case REQUEST_STATUS.LOADING: {
            return <Spin tip='loading' insertTo={options?.loadingTo} />;
        }
        case REQUEST_STATUS.SUCCESS: {
            return dom;
        }
        case REQUEST_STATUS.FAIL: {
            return <div className="flex flex-col justify-center items-center my-auto h-full gap-2 text-gray-500 dark:text-gray-200">
                <ErrorIcon></ErrorIcon>
                <div className="opacity-50">


                    {options?.errTips || 'Network error please try again'}
                </div>
            </div>
        }
      
        case REQUEST_STATUS.Empty: {
            return <div className="flex flex-col justify-center items-center my-auto h-full gap-2 text-gray-500 dark:text-gray-200">
                <EmptyIcon></EmptyIcon>
                <div className='pt-4'>No Data</div>
                <div className="opacity-50">
                   {emptyMsg}
                </div>
                <Button tag='a' href={emptyGuideButtonLink} target='_blank' rel='noreferrer' size='small' className='mt-4'>{emptyGuideButtonText}</Button>
              
            </div>
        }
        default: options?.emptyDOM || null;

    }
}

export default useLoading;