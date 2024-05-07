import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomInput = ({ value, onClick }) => {
  return (
    <button type="button" onClick={onClick} className="text-primary p-[16px] ">
      C
    </button>
  );
};

const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      customInput={<CustomInput />}
      dateFormat="MM/dd/yyyy"
    />
  );
};

export default CustomDatePicker;
