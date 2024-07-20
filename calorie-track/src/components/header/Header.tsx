import React, { useContext, useState, useEffect } from "react";
import classes from "./Header.module.css";
import { FaBell } from "react-icons/fa";
import { format, isToday } from "date-fns";
import CustomDatePicker from "../shared/datePicker/CustomDatePicker";
import { useSearchParams, useRouter } from "next/navigation";

const Header: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const dateParam = searchParams.get("date");
  const initialDate = dateParam
    ? new Date(dateParam.split("/").reverse().join("-"))
    : new Date();

  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

  useEffect(() => {
    if (dateParam) {
      const [day, month, year] = dateParam.split("/");
      const date = new Date(`${year}-${month}-${day}`);
      setSelectedDate(date);
    }
  }, [dateParam]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = format(date, "dd/MM/yyyy");
    router.push(`/?date=${formattedDate}`);
  };

  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const isDateToday = isToday(selectedDate);

  return (
    <div className={classes.headerWrapper}>
      <div className={classes.headerCon}>
        <div className={classes.headerGreetingMsg}>
          <p>Hello, Rishav!</p>
          <h3 onClick={toggleDatePicker}>
            {isDateToday
              ? `Today, ${format(new Date(), "MMM d")}`
              : `Selected Date: ${format(selectedDate, "MMM d")}`}
          </h3>
        </div>
        <div className={classes.notificationBell}>
          <FaBell />
        </div>
      </div>
      {isDatePickerOpen && (
        <CustomDatePicker
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      )}
    </div>
  );
};

export default Header;
