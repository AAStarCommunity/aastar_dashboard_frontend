import { IFromItemProps, IFromItemRefs } from "@/utils/types";
import { HelperText, Input, Label } from "@windmill/react-ui";

import { useState, useCallback, useImperativeHandle, forwardRef } from "react";

const ValidInput = forwardRef<IFromItemRefs, IFromItemProps>((
    { disabled, required = false, name, errorTip = "this is required", placeholder, label, desc, defaultValue },
    ref
) => {
    const [valided, setValided] = useState(true)
    const [value, setValue] = useState(defaultValue)
    const handleChange = useCallback((e: any) => {
        setValue?.(e.target.value)
    }, [])

    const handleVaild = function (value: any) {
        let vaild = valided
        setValided(true)
        if (required && !value) {
            setValided(false)
            vaild = false
        }

        return vaild
    }

    function getData() {
        handleVaild(value)
        return {
            vaild: valided,
            value
        }
    }
    useImperativeHandle(ref, () => ({
        getData,
        handleVaild
    }))
    return (
        <Label className='mb-6'>
            {label && <h4 className="mb-1 text-lg text-gray-700 dark:text-gray-200">{label}</h4>}
            {desc && <span className=" text-gray-500 dark:text-gray-400">{desc}</span>}
            {valided ? <Input disabled={disabled} role-id={name} className="mt-2" value={value} placeholder={placeholder} onChange={handleChange} onBlur={e => handleVaild(e.target.value)} />
                : <><Input disabled={disabled} role-id={name} className="mt-2" valid={valided} value={value} placeholder={placeholder} onChange={handleChange} onBlur={e => handleVaild(e.target.value)} />
                    <HelperText valid={valided}>{errorTip}</HelperText></>}

        </Label>
    )
})
ValidInput.displayName = 'ValidInput';
export default ValidInput