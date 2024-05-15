import { IFromItemProps, IFromItemRefs } from "@/utils/types"
import ValidInput from "../VaildInput"
import Switch from "../Switch";
import { useRef } from "react";
import { useImperativeHandle, forwardRef } from "react";
import { useCallback } from "react";

export interface IFormItem extends IFromItemProps {
    type: "switch" | "input" | "select",
}
interface IFormArrProps {
    formArr: IFormItem[]
}
export interface IFormRefs {
    getData: (callback: (arg0: { values: Record<string, unknown>; vailded: boolean; }) => void) => void
}
const Form = forwardRef<IFormRefs, IFormArrProps>(({ formArr }, ref) => {
    const refMap = useRef<Array<IFromItemRefs | null>>([])
    const getData = (callback: (arg0: { values: Record<string, unknown>; vailded: boolean; }) => void) => {
        let vailded = true
        const values: Record<string, unknown> = {}
        let unVaildedIndex = -1
        refMap.current.forEach((item, index) => {

            const result = item?.getData()
            const vaild = item?.handleVaild(result?.value as string)

            if (!vaild && unVaildedIndex == -1) {
                unVaildedIndex = index
                const id = formArr[index].name
                const top = document.querySelector(`[role-id=${id}]`)?.getBoundingClientRect().top
                console.log(formArr[index].name, top)
                top && document.querySelector('main')?.scrollTo(0, top)
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
    return (
        <>
            {formArr.map((item, index) => {
                switch (item.type) {
                    case "input":
                        return <ValidInput
                            key={item.name}
                            ref={f => { refMap.current[index] = f }}
                            {...item} />;
                    case "switch":
                        return <Switch
                            key={item.name}
                            ref={f => { refMap.current[index] = f }}
                            {...item} />

                    case "select":
                        return <div>select</div>
                }

            })}
        </>
    )
})
Form.displayName = 'Form'
export default Form