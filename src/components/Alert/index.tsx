import { connect, useMessageContext } from '@/context/messageContext';
import useDomAlready from '@/hooks/useDomAlready';
import { MessageType, IPropChild } from '@/utils/types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Transition } from '@windmill/react-ui'

function Alert({ children }: IPropChild) {
  const TYPE_CLASS: Record<MessageType, Record<string, string>> = {
    success: {
      wrap: 'bg-green-50 text-green-900 dark:bg-green-500 dark:text-white',
      svg: 'text-green-400 dark:text-green-300',
      path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    danger: {
      wrap: 'bg-red-50 text-red-900 dark:bg-red-700 dark:text-white',
      svg: 'text-red-400 dark:text-red-300',
      path: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    warning: {
      wrap: "bg-yellow-50 text-yellow-400 dark:bg-yellow dark:text-yellow-100",
      svg: "text-yellow-400 dark:text-yellow-100",
      path: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    info: {
      wrap: "bg-blue-50 text-blue-900 dark:bg-blue-500 dark:text-white",
      svg: "text-blue-400 dark:text-blue-300",
      path: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    },
    neutral: {
      wrap: " bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
      svg: "text-gray-400 dark:text-gray-500",
      path: "M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    }
  }

  const { documentMouned } = useDomAlready()
  const { store, setStore } = useMessageContext()
  useEffect(() => {
    if (store.show && !store.onClose) {
      setTimeout(() => {
        setStore({
          ...store,
          show: false
        })
      }, store.delay)
    }
  }, [setStore, store.delay, store.show])

  // Bind events as global methods
  function messgaeFunction(e: CustomEventInit) {
    setStore(e.detail)
  }
  useEffect(() => {
    document.body.addEventListener('message', messgaeFunction);
    return () => {
      document.body.removeEventListener('message', messgaeFunction)
    }
  })

  const closeHandle = () => {
    setStore({ ...store, show: false })
    store.onClose?.()
  }
  return (
    <>
      {documentMouned && createPortal(
        <div className="absolute right-5 top-5 z-50 w-96 " style={{ "display": store.show ? "block" : "none" }}>
          <Transition
            show={store.show}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={`p-4 min-h-12 pl-12 relative rounded-lg leading-5 ${TYPE_CLASS[store.type].wrap}`}
              role="alert"
            >
              <svg
                className={`h-5 w-5 ${TYPE_CLASS[store.type].svg} absolute left-0 top-0 ml-4 mt-4`}
                fill="none"
                strokeLinecap="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d={TYPE_CLASS[store.type].path}></path>
              </svg>
              <span className="block ml-7 break-words">{store.message}</span>
              {store.onClose && <button onClick={closeHandle} className="absolute top-0 right-0 mt-4 mr-4" aria-label="close">
                <svg className={`h-5 w-5 ${TYPE_CLASS[store.type].svg}`} fill="currentColor" viewBox="0 0 20 20" role="img" aria-hidden="true"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
              </button>}
            </div >
          </Transition>
        </div>
        , document.body)}
      {children}
    </>
  )
}


export default connect(Alert)

