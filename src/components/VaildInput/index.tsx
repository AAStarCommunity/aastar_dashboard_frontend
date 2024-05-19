import { IFromItemProps, IFromItemRefs, ObjType } from "@/utils/types";
import { Button, HelperText, Input, Label, Textarea } from "@windmill/react-ui";

import { useState, useCallback, useImperativeHandle, forwardRef, useEffect } from "react";
import { CloseIcon } from "~/public/icons";

const ValidInput = forwardRef<IFromItemRefs<string | number | undefined>, IFromItemProps>((
    { disabled, inputType, addlist, required = false, name, errorTip = "this is required", placeholder, label, desc, defaultValue },
    ref
) => {
    const [valided, setValided] = useState(true)
    const [value, setValue] = useState(defaultValue)
    const [listVal, setListVal] = useState<(string | number | undefined)[]>([])
    const handleChange = useCallback((e: any) => {
        setValue?.(e.target.value)
    }, [])

    const handleVaild = function (value: any) {
        let vaild = valided
        setValided(true)
        if (required && (addlist ? !listVal.length : !value)) {
            setValided(false)
            vaild = false
        }

        return vaild
    }

    function getData() {
        const parseValue = inputType == 'number' ? parseInt(value) : value
        handleVaild(parseValue)
        return {
            vaild: valided,
            value: addlist ? listVal : parseValue
        }
    }
    const handleAddlist = useCallback(() => {
        setListVal(prev => [
            ...prev,
            value
        ])
        setValue('')
    }, [value])



    const deleteListVal = useCallback((index: number) => {

        listVal.splice(index, 1)
        setListVal([...listVal])
    }, [listVal])

    useEffect(() => {
        if (addlist) {
            setListVal(defaultValue || [])
            setValue('')
            // addlist ? setListVal([]) : 
        }
    }, [])

    const empty = () => {
        setValue('')
    }

    useImperativeHandle(ref, () => ({
        getData,
        handleVaild,
        empty
    }))

    const renderComponent = () => {
        const inputProps: {
            disabled: boolean | undefined;
            "role-id": string;
            value: string;
            placeholder: string | undefined;
            onChange: (e: any) => void;
            onBlur: (e: any) => boolean;
            css: undefined;
            onPointerEnterCapture: undefined;
            onPointerLeaveCapture: undefined;
            valid?: boolean
        } = {
            disabled,
            "role-id": name,
            value: value as string,
            placeholder,
            onChange: handleChange,
            onBlur: (e: any) => handleVaild(e.target.value),
            css: undefined,
            onPointerEnterCapture: undefined,
            onPointerLeaveCapture: undefined
        }
        if (!valided) {
            inputProps.valid = valided
        }
        if (inputType === "textarea") {
            return <Textarea {...inputProps} />
        } else {
            return <Input type={inputType} crossOrigin={undefined} {...inputProps} />
        }
    }
    return (
        <Label className='mb-6'>

            {label && <h4 className="mb-2 text-lg text-gray-700 dark:text-gray-200">{label}</h4>}
            {desc && <div className=" mb-2 text-gray-500 dark:text-gray-400">{desc}</div>}

            <div className="flex items-center">
                {renderComponent()}
                {addlist && <Button onClick={handleAddlist} className="ml-4">Add</Button>}
            </div>
            {!valided && <HelperText valid={valided}>{errorTip}</HelperText>}
            {addlist &&
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {listVal.map((item, index) =>
                        <li className="pb-3 sm:pb-4 border-blue-200 py-4" key={item}>
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {item}
                                    </p>
                                </div>
                                <span onClick={() => deleteListVal(index)} className='dark:text-white transition-all text-slate-900 hover-text-aastar-700 hover:cursor-pointer size-6 ml-2'>
                                    <CloseIcon />
                                </span>

                            </div>
                        </li>)}
                </ul>
            }


        </Label >
    )
})
ValidInput.displayName = 'ValidInput';
export default ValidInput