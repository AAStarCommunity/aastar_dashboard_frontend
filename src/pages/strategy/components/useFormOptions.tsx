import { IFormItem } from "@/components/Form"
import { useState } from "react"
import { NET_LIST } from '@/utils/const';
const useFormOptions = (style: { readonly [x: string]: any }) => {
    const [formArr, setFormArr] = useState<IFormItem[]>([
        {
            name: 'strategy_name',
            label: "Name (required)",
            desc: "Name of the Strategy",
            placeholder: '',
            defaultValue: '',
            type: "input",
            required: true
        },
        {
            name: 'description',
            label: "Description",
            desc: "Description of the strategy.",
            placeholder: '',
            defaultValue: '',
            type: "input",
            inputType: "textarea"
        },
        {
            name: 'project_code',
            label: "Project Code",
            // desc: "Name of the API key",
            placeholder: '',
            defaultValue: '',
            type: "input"
        },
        {
            name: 'start_time',
            label: "Start Date",
            desc: "The date when this strategy should start.",
            placeholder: '',
            defaultValue: '',
            type: "datepicker",
            // group: 'time-group flex items-center w-full'
            group: `${style['time-group']} time-group flex items-center w-full max-lg:flex-col flex-row `
        },
        {
            name: 'end_time',
            label: "End date",
            desc: "The date when this strategy should end.",
            placeholder: '',
            defaultValue: '',
            type: "datepicker",
            // group: 'time-group flex items-center w-full'
            group: `${style['time-group']} time-group flex items-center w-full max-lg:flex-col flex-row `
        },
        {
            name: "switch",
            label: "Limit Setting",
            desc: "Maximum Number of All Operations",
            placeholder: '',
            defaultValue: '',
            type: "switch",
            isControl: true,
            group: `${style['limit-group']} time-group flex items-center w-full max-lg:flex-col flex-row `
        },
        {
            name: 'global_max_usd',
            label: "Global Maximums",
            desc: "Limit the total amount of USD or Native Tokens you are willing to sponsor.",
            placeholder: '',
            defaultValue: '',
            type: "input",
            inputType: "number",
            group: `${style['limit-group']} time-group flex items-center w-full max-lg:flex-col flex-row `
        },
        {
            name: 'per_user_max_usd',
            label: "Per User Maximums",
            desc: "Limit the amount of USD or Native Tokens you are willing to sponsor per user.",
            placeholder: '',
            defaultValue: '',
            type: "input",
            inputType: "number",
            group: `${style['limit-group']} time-group flex items-center w-full max-lg:flex-col flex-row `
        },

        {
            name: 'day_max_usd',
            label: "Maximum usage per day",
            desc: "Limit the amount of USD or Native Tokens you are willing to sponsor per day.",
            placeholder: '',
            defaultValue: '',
            type: "input",
            inputType: "number",
            group: `${style['limit-group']} time-group flex items-center w-full max-lg:flex-col flex-row `
        },

        {
            name: 'address_block_list',
            label: "Block Address List",
            // desc: "Limit the amount of USD or Native Tokens you are willing to sponsor per day.",
            placeholder: '',
            defaultValue: '',
            type: "input",
            addlist: true,
        },
        {
            name: "allchains",
            label: "Enabled for all chains",
            desc: "Enable this strategy for all chains.",
            placeholder: '',
            defaultValue: true,
            type: "switch",
            isControl: true,
            controlRevert: true,
            group: `${style['Chains-group']} Chains-group `
        },
        {
            name: 'chain_id_whitelist',
            label: "Enabled Chains",
            desc: "Select the chains you want to enable this policy for.",
            defaultValue: '',
            type: "checkbox",
            list: NET_LIST,
            group: `${style['Chains-group']} Chains-group `
        },

    ])

    return { formArr, setFormArr }
}


export default useFormOptions