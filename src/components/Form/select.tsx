import DatePicker from "tailwind-datepicker-react";
import React, {  useState } from "react";

interface DataDateRangePickerProps {
    startDate: Date;
    setStartDate: React.Dispatch<React.SetStateAction<Date>>;
    endDate: Date;
    setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  }
  export const DataDateRangePicker: React.FC<DataDateRangePickerProps> = ({ startDate, setStartDate, endDate, setEndDate }) => {
    const [showStartDate, setShowStartDate] = useState<boolean>(false);
    const [showEndDate, setShowEndDate] = useState<boolean>(false);
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 grid-cols-4  flex-col items-start gap-4">
        <div className="flex items-center gap-2">
            <label className="text-black dark:text-white">From:</label>
            <DatePicker
                show={showStartDate}
                setShow={setShowStartDate}
                selectedDateState = {[startDate, setStartDate]}
                onChange={(date) => setStartDate(date as Date)}
            />
        </div>
        <div className="flex items-center gap-2">
            <label className="text-black dark:text-white">To:</label>
            <DatePicker
                show={showEndDate}
                setShow={setShowEndDate}
                selectedDateState={[endDate, setEndDate]}
                onChange={(date) => setEndDate(date as Date)}
            />
        </div>
    </div>
    )
  }