import { LoadingIcon } from "~/public/icons";
import { Backdrop } from '@windmill/react-ui'
import useDomAlready from "@/hooks/useDomAlready";
import { createPortal } from "react-dom";
import { useMemo } from "react";

export type insertType = "body" | 'main' | 'self' | Element
interface ISpinProps {
  size?: 10 | 30 | 40
  container?: Element | DocumentFragment,
  tip?: string,
  insertTo?: insertType
}
export default function Spin({ size, container, tip, insertTo = 'main' }: ISpinProps) {
  const { documentMouned } = useDomAlready()
  const insertDom = useMemo(() => {
    if (documentMouned && insertTo !== 'self') {

      return insertTo === "body" ? document.body : (insertTo === "main" ? document.querySelector('main') : insertTo)
    }
    return undefined
  }, [documentMouned, insertTo])

  const loadingDom = <div className={`size-full absolute z-50 top-0`}>
    <div className={`size-full backdrop-blur-sm ${insertTo === 'self' ? 'dark:bg-black/30 bg-white/30' : 'bg-black/30 dark:bg-white/30'} absolute `}></div>
    <LoadingIcon className={`animate-spin absolute m-auto top-0 left-0 bottom-0 right-0 dark:text-white z-50 ${insertTo === 'self' ? 'size-12' : `size-${size ?? 30}`}  focus:outline-none`} />
  </div>
  return (
    <>
      {insertDom ? documentMouned && createPortal(
        loadingDom, insertDom as Element) : loadingDom
      }
    </>
  )
}
