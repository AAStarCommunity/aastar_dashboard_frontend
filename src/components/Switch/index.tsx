import { IFromItemProps, IFromItemRefs } from "@/utils/types";
import { Label } from "@windmill/react-ui";
import { useState, useCallback, useImperativeHandle, forwardRef } from "react";

const Switch = forwardRef<IFromItemRefs, IFromItemProps>((props, ref) => {
  const [value, setValue] = useState(!!props.defaultValue)
  const handleChange = useCallback((e: any) => {
    setValue(e.target.checked)
    props.setValue?.(e.target.checked)
    // console.log(e.target.checked)
  }, [])


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
      <div className="flex items-center overflow-hidden  mt-2 ">
        {props.label && <h4 className="mb-1 text-lg text-gray-700 dark:text-gray-200 mr-6">{props.label}</h4>}
        <label className="inline-flex overflow-hidden items-center cursor-pointer ">
          <input type="checkbox" onChange={handleChange} value="" checked={!!value} className="sr-only peer absolute" />
          <div className="relative w-11 h-6  bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-br from-green-400 to-blue-600"></div>
        </label>
      </div>
      {props.desc && <span className="text-gray-500 dark:text-gray-400">{props.desc}</span>}
    </Label>

  )
})
Switch.displayName = "Switch"
export default Switch