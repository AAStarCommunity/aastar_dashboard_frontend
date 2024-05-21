import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Authorize() {
    const router = useRouter()
    useEffect(() => {
        if (router.isReady) {
            router.replace(`/login?code=${router.query.code}`)
        }
    }, [router, router.isReady])
    return <></>
};
