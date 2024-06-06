import Message from '@/utils/message';
import copy from 'copy-to-clipboard';
import { useCallback } from 'react';
import { CopyIcon } from '~/public/icons';
interface ICopyProps {
    text: string
}
export default function Copy({ text }: ICopyProps) {
    const copyHandle = useCallback(() => {
        copy(text)
        Message({
            type: 'neutral',
            message: "copied!",
            delay: 800
        })
    }, [text])

    return (
        <CopyIcon className="dark:text-white text-slate-900 hover-text-aastar-700 hover:cursor-pointer size-4 ml-2" onClick={(e: { stopPropagation: () => void; })=>{
            e.stopPropagation()
            copyHandle()
        }} />
    )
}
