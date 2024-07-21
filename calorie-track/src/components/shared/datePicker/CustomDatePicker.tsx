import React, { useState } from "react";
import classes from "./CustomDatePicker.module.css";
import { TbCalendarSearch } from "react-icons/tb";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, addDays, startOfWeek } from "date-fns";

const CustomDatePicker = ({ selectedDate, onDateChange }: any) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const toggleCalendarOpener = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(
      new Date(Date.parse(e.target.value + " 1, 2021")).getMonth()
    );
    onDateChange(newDate);
  };

  const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  return (
    <div className={classes.datePickerCon}>
      <div className={classes.monthPicker}>
        <div className={classes.monthSelectCon}>
          <select
            className={classes.monthSelect}
            value={format(selectedDate, "MMMM")}
            onChange={(e) => handleMonthChange(e)}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={format(new Date(2021, i, 1), "MMMM")}>
                {format(new Date(2021, i, 1), "MMMM")}
              </option>
            ))}
          </select>
        </div>

        <div className={classes.calendarIconCon}>
          <TbCalendarSearch onClick={toggleCalendarOpener} />
        </div>
      </div>
      <div className={classes.datePicker}>
        {weekDates.map((date, index) => (
          <div
            key={index}
            className={`${classes.dateItem} ${
              format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                ? classes.selected
                : ""
            }`}
            onClick={() => onDateChange(date)}>
            <p>{format(date, "EEE d")}</p>
          </div>
        ))}
      </div>

      {isCalendarOpen && (
        <div className={classes.customDatePicker}>
          <DatePicker
            selected={selectedDate}
            onChange={onDateChange}
            inline
            showDisabledMonthNavigation
            renderCustomHeader={() => <div></div>}
          />
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
