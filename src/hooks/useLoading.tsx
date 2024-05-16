import Spin from '@/components/Spin';
import React from 'react'

export enum REQUEST_STATUS {
    SUCCESS = "success",
    FAIL = "fail",
    LOADING = "loading",
}

function useLoading(status: string, dom: React.ReactNode, emptyDOM?: React.ReactNode) {
    switch (status) {
        case REQUEST_STATUS.LOADING: {
            return <Spin tip='loading' />;
        }
        case REQUEST_STATUS.SUCCESS: {
            return dom;
        }
        case REQUEST_STATUS.FAIL: {
            // return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="请求错误!" />;
        }
        default: {//waiting
            return emptyDOM || null;
        }
    }
}

export default useLoading;