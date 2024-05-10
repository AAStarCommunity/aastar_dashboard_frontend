import { ObjType } from "@/utils/types";

interface InputProps extends ObjType {
    type?: string,
    placeholder?: string,
    className?: string,
}
export default function Input(props: InputProps) {
    return <input {...props} className={`block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1 ${props.className}`} />
}