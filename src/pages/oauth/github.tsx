import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Authorize() {
    const router = useRouter()
    useEffect(() => {
        // console.log(router)
        if (router.isReady) {
            console.log(router.query, 'router.query')
            router.replace('/login', {
                query: { ...router.query }
            })
        }
    }, [router, router.isReady])
    return <></>
};
