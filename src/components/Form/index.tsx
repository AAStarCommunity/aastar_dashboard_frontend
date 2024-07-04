import { IFromItemProps, IFromItemRefs, ObjType } from "@/utils/types"
import ValidInput from "../VaildInput"
import Switch from "../Switch";
import DatePicker from "../DatePicker";

import { useEffect, useMemo, useRef, useState } from "react";
import { useImperativeHandle, forwardRef } from "react";
import Checkbox from "../Checkbox";
import { NEW_DETAIL_LIST } from '@/utils/const';
import { Modal, ModalBody } from "@windmill/react-ui";
import Copy from "../Copy";

export interface IFormItem extends IFromItemProps {
  type: "switch" | "input" | "select" | "datepicker" | "checkbox",
  index?: number // save original index
}
interface IFormArrProps {
  formArr: IFormItem[]
}
export interface IFormRefs {
  getData: (callback: (arg0: { values: Record<string, unknown>; vailded: boolean; }) => void) => void
}
const Form = forwardRef<IFormRefs, IFormArrProps>(({ formArr }, ref) => {
  const refMap = useRef<Array<IFromItemRefs | null>>([])
  const [controlObj, setControlObj] = useState<Record<string, boolean>>({})

  useEffect(() => {
    formArr.forEach((item, index) => {
      if (item.isControl) {
        setControlObj((prev) => ({
          ...prev,
          [index]: item.defaultValue
        }))
      }
    })
  }, [])

  useEffect(() => {

    for (const key in controlObj) {
      const val = controlObj[key];
      let switchItem: IFormItem
      formArr.forEach((item, index) => {
        if (index.toString() === key) {
          switchItem = item

        } else if (item.group && item.group === switchItem?.group) {
          // if the switch control the group items hide, when condition is hide, group items empty.
          const emptyCondition = item.controlRevert ? !val : val

          if (!emptyCondition) {
            refMap.current[index]?.empty?.()
          }
        }

      })
    }
  }, [controlObj, formArr])

  const getData = (callback: (arg0: { values: Record<string, unknown>; vailded: boolean; }) => void) => {
    let vailded = true
    const values: Record<string, unknown> = {}
    let unVaildedIndex = -1
    refMap.current.forEach((item, index) => {

      const result = item?.getData()
      const vaild = item?.handleVaild(result?.value as string)
      if (!vaild) {
        vailded = false
        if (unVaildedIndex == -1) {
          unVaildedIndex = index
          const id = formArr[index].name
          const top = document.querySelector(`[role-id=${id}]`)?.getBoundingClientRect().top

          top && document.querySelector('main')?.scrollTo(0, top)
        }
      }

      values[formArr[index].name] = result?.value
    });

    callback({
      values,
      vailded
    })

  }
  useImperativeHandle(ref, () => ({
    getData
  }))

  const groupItems = useMemo(() => {
    const newMap = new Map()
    formArr.forEach((item, index) => {
      if (item.group) {
        let arr = []
        if (newMap.has(item.group)) {
          arr = newMap.get(item.group)
        }
        // save original index
        arr.push({ ...item, index })
        newMap.set(item.group, arr)
      } else {
        newMap.set(item.name, { ...item, index })
      }
    })
    const newValues: IFormItem[] | Array<Array<IFormItem>> = []
    const newKeys: string[] = []
    newMap.forEach((value, key) => {
      newValues.push(value)
      newKeys.push(key)
    })
    return {
      keys: newKeys,
      values: newValues
    }
  }, [formArr])



  const renderFormItem = (item: IFormItem) => {
    const index = item.index as number
    switch (item.type) {
      case "input":
        return <ValidInput
          key={item.name}
          ref={f => { refMap.current[index] = f }}
          {...item} />;
      case "switch":
        return <Switch
          key={item.name}

          setValue={(val) => { setControlObj(prev => ({ ...prev, [index]: val })) }}
          ref={f => { refMap.current[index] = f }}
          {...item} />
      case "select":
        return <div>select</div>
      case "checkbox":
        return <Checkbox key={item.name}
          ref={f => { refMap.current[index] = f }}
          {...item}>
        </Checkbox>

      case "datepicker":
        return <DatePicker key={item.name}
          ref={f => { refMap.current[index] = f }}
          {...item}>
        </DatePicker>

    }
  }

  return (
    <>
      {groupItems.values.map((item) => {
        if (Array.isArray(item)) {
          const frstItem = item[0]
          return <div key={frstItem.group} className={frstItem.isControl ? "" : frstItem.group}>
            {
              frstItem.isControl ?
                (<>
                  {renderFormItem(frstItem)}
                  <div className={`control-list ${frstItem.group} 
                  ${(frstItem.controlRevert ?
                      (!controlObj[frstItem.index as number]) :
                      controlObj[frstItem.index as number]) ? "block" : "hidden"}`}>
                    {
                      item.map((s, k) => {
                        return k !== 0 ? renderFormItem(s) : ''
                      })
                    }
                  </div>
                </>) :
                item.map((s, k) => {
                  return renderFormItem(s)
                })
            }
          </div>
        } else {
          return renderFormItem(item)
        }

      })}
    </>
  )
})
Form.displayName = 'Form'
export default Form





interface NetworkSelectComponentProps {
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
export const  NetworkSelect: React.FC<NetworkSelectComponentProps> = ({ handleSelectChange }) => {
  return (
      <select 
          className="block  border rounded px-2 py-1 mb-4 dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white" 
          name="select" 
          onChange={handleSelectChange}
      >
            <option value='All'>All</option>
          {NEW_DETAIL_LIST.map((item, index) => (
              <option key={index} value={item.networkId}>{item.networkName}</option>
          ))}
      </select>
  );
};;


export function DataShowCard(
  { dataNum, dataName }: {
      dataNum?: string,
      dataName: string
  }
) {
  let dataNumDefault = dataNum || '_ _'
  return (
      <div className="p-9 bg-white dark:bg-gray-800 shadow rounded-md grid  col-span-1">
          <div className="text-4xl font-bold text-left dark:text-gray-300"> {dataNumDefault}</div>
          <div className="text-gray-500 text-left ">{dataName}</div>
      </div>
  )
}


export function JsonRpcConnectComponent({ isRpcInfo, setIsRpcInfoFunc, apiKey }: {
  isRpcInfo: boolean,
  setIsRpcInfoFunc: () => void,
  apiKey: string
}) {
  const [network, setNetwork] = useState('');
  const rpcUrl = `https://paymaster.aastar.io/api/v1/paymaster/${network}/rpc?apikey=${apiKey}`;
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setNetwork(e.target.value);
  };
  return (
      <Modal
          className='w-full px-10 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-md'
          isOpen={isRpcInfo}
          onClose={setIsRpcInfoFunc}
      >
          <ModalBody>
              <div className='bg-white dark:bg-gray-800 p-30 rounded-lg w-full max-w-sm space-y-4'>
                  <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">Networks</h2>
                  <label className="text-black dark:text-white">Select a network</label>
                  <NetworkSelect handleSelectChange={handleSelectChange} />

                  <div className="mt-4 space-y-4'">
                      <div className='flex'>
                          <label className="text-black dark:text-white">Paymaster RPC URL</label>
                          <Copy text={rpcUrl} />
                      </div>
                      <input
                          type="text"
                          value={rpcUrl}
                          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white"
                          readOnly
                      />
                  </div>
              </div>
          </ModalBody>
      </Modal>
  )
}
