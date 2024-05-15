import { LoadingIcon } from "~/public/icons";
import { Backdrop } from '@windmill/react-ui'
import useDomAlready from "@/hooks/useDomAlready";
import { createPortal } from "react-dom";
interface ISpinProps {
  size?: 10 | 30 | 40
  container?: Element | DocumentFragment,
  tip?: string
}
export default function Spin({ size, container, tip }: ISpinProps) {
  const { documentMouned } = useDomAlready()
  return (
    <>
      {documentMouned && createPortal(
        <div className="size-full absolute z-50 top-0">
          <Backdrop />
          <LoadingIcon className={`animate-spin absolute m-auto top-0 left-0 bottom-0 right-0 dark:text-white z-50 size-${size ?? 30} focus:outline-none`} />

        </div>, document.body)}
    </>
  )
}
