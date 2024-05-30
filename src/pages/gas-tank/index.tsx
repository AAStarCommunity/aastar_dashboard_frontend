import {Line} from "recharts";
import PageTitle from "@/components/Typography/PageTitle";
import {Button} from "@windmill/react-ui";
import {useRouter} from "next/router";

const data = {
    labels: ['23 Nov', '24', '25', '26', '27', '28', '29', '30'],
    datasets: [
        {
            label: 'Balance Over Time',
            data: [25000, 27000, 29000, 31000, 33000, 37000, 42000, 45678.9],
            borderColor: 'black',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
    ],
};


export default function GasTank() {
    const router = useRouter()
    return (<>
        <div className='flex items-center justify-between'>
            <PageTitle>Gas Tank</PageTitle>
            <dl>
                <Button onClick={() => router.push(`/strategy/create`)}>Deposit Gas Tank</Button>
                <Button onClick={() => router.push(`/strategy/create`)}>WithDraw Gas Tank</Button>
            </dl>
        </div>
        <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg overflow-hidden">
            ALl Balance
        </div>
        <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg overflow-hidden">
            APi Tank consume View
        </div>
        <div className="mt-10 relative overflow-x-auto shadow-md sm:rounded-lg overflow-hidden">
            Strategy View
        </div>
    </>)
}
