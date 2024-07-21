import React, { useContext, useState, useEffect } from "react";
import classes from "./Header.module.css";
import { FaBell } from "react-icons/fa";
import { format, isToday, parse, isValid } from "date-fns";
import CustomDatePicker from "../shared/datePicker/CustomDatePicker";
import { AlyveCalorieTrackContext } from "@/context/context";

const Header: React.FC = () => {
  const ctx = useContext(AlyveCalorieTrackContext);
  const { data, setSelectedDateHandler } = ctx;
  const { selectedDateKey } = data;

  const dateParam = selectedDateKey;

  const validateDateFormat = (date: string) => {
    const dateParts = date.split("/");
    return (
      dateParts.length === 3 &&
      dateParts[0].length === 2 &&
      dateParts[1].length === 2 &&
      dateParts[2].length === 4
    );
  };

  const initialDate =
    dateParam && validateDateFormat(dateParam)
      ? parse(dateParam, "dd/MM/yyyy", new Date())
      : new Date();

  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

  useEffect(() => {
    if (dateParam && validateDateFormat(dateParam)) {
      const formattedDate = parse(dateParam, "dd/MM/yyyy", new Date());
      if (isValid(formattedDate)) {
        setSelectedDate(formattedDate);
      } else {
        console.error("Invalid date format:", dateParam);
      }
    }
  }, [dateParam]);

  const handleDateChange = (date: Date) => {
    const formattedDate = format(date, "dd/MM/yyyy");
    setSelectedDateHandler({ selectedDateKey: formattedDate });
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
          <div onClick={toggleDatePicker}>
            <h3>
              {isDateToday
                ? `Today, ${format(new Date(), "MMM d")}`
                : `Selected Date: ${format(selectedDate, "MMM d")}`}
            </h3>
          </div>
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
