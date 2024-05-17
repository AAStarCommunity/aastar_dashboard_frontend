import { IFromItemProps, IFromItemRefs } from "@/utils/types";
import { Label } from "@windmill/react-ui";
import { useState, useCallback, useImperativeHandle, forwardRef } from "react";
import Datepicker from "tailwind-datepicker-react"

const DatePicker = forwardRef<IFromItemRefs<number>, IFromItemProps<number>>((props, ref) => {
  const [value, setValue] = useState<number | undefined>(props.defaultValue)
  const handleChange = useCallback((selectedDate: Date) => {
    const timestamp = new Date(selectedDate).getTime()
    console.log(timestamp)
    setValue(timestamp)
    props.setValue?.(timestamp)
    // console.log(e.target.checked)
  }, [])

  const options = {
    // title: "Demo Title",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: "Clear",
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    defaultDate: props.defaultValue ? new Date(props.defaultValue) : null,
    language: "en",
    disabledDates: [new Date('2024-5-16')],
    inputPlaceholderProp: props.placeholder || '',
    theme: {
      background: "inline-block p-4 rounded-lg shadow-lg bg-gray-100  dark:bg-gray-800",
      todayBtn: "hover-text-aastar-700",
      clearBtn: "hover-text-aastar-700",
      icons: "",
      text: "hover-text-aastar-700",
      disabledText: "hover:bg-gray-100 dark:hover:bg-gray-800 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center  dark:text-white font-semibold text-sm  text-black",
      input: 'pl-9 pr-2.5 py-2.5 block w-full text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md form-input focus:border-bule-400 border-gray-300 dark:border-gray-600 dark:focus:border-gray-600 dark:bg-gray-700 dark:focus:ring-gray-300 focus:ring focus:ring-bule-300',
      inputIcon: "",
      selected: "",
    },
  }

  const [show, setShow] = useState(false)
  const handleClose = (state: boolean) => {
    setShow(state)
  }
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
      <Datepicker options={options} onChange={handleChange} show={show} setShow={handleClose} />
      {/* </div> */}

    </Label>

  )
})
DatePicker.displayName = "DatePicker"
export default DatePicker