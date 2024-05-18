import { IFromItemProps, IFromItemRefs } from "@/utils/types";
import { Label } from "@windmill/react-ui";
import { useState, useCallback, useImperativeHandle, forwardRef } from "react";

const Checkbox = forwardRef<IFromItemRefs<string[]>, IFromItemProps<string[]>>((props, ref) => {
  const [value, setValue] = useState<string[] | []>(props.defaultValue || [])
  const handleChange = useCallback((e: any, item: string) => {
    const setNewVal = (prev: string[]) => {
      const newValue = e.target.checked ? [...new Set([...prev, item])] : prev.filter(cur => cur !== item)
      props.setValue?.(newValue)
      return newValue
    }
    setValue(prev => setNewVal(prev))

  }, [props])


  function getData() {
    return {
      vaild: true,
      value
    }
  }
  useImperativeHandle(ref, () => ({
    getData,
    handleVaild: () => true
  }))

  return (
    <Label className={`${props.class ? props.class : 'mb-6'}`}>
      <div className="flex items-center overflow-hidden  dark:hover:bg-gray-600  "></div>
      {props.label && <h4 className="shrink-0 text-lg text-gray-700 dark:text-gray-200 mr-6">{props.label}</h4>}
      {props.desc && <div className="text-gray-500 dark:text-gray-400 my-2">{props.desc}</div>}
      <div className="flex flex-wrap">
        {
          props.list?.map(item => (
            <div className="flex items-center mb-4 w-1/5 mr-10" key={item}>
              <input id={item} name={props.name} value={item} onChange={(e) => handleChange(e, item)} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor={item} className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300">{item}</label>
            </div>
          ))

        }
      </div>

    </Label >
  )
})
Checkbox.displayName = "Checkbox"
export default Checkbox