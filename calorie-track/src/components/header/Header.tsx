import React, { useState } from "react";
import classes from "./Header.module.css";
import { FaBell } from "react-icons/fa";
import { format } from "date-fns";
import CustomDatePicker from "../shared/datePicker/CustomDatePicker";

const Header: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
    setSelectedDate(new Date());
  };

  return (
    <div className={classes.headerWrapper}>
      <div className={classes.headerCon}>
        <div className={classes.headerGreetingMsg}>
          <p>Hello, Rishav!</p>
          <h3 onClick={toggleDatePicker}>
            Today, {format(new Date(), "MMM d")}
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
