import React, { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AlyveCalorieTrackContext } from "@/context/context";
import { format, subDays } from "date-fns";
import classes from "./Analytics.module.css";
import { useRouter } from "next/navigation";
import { CalorieData } from "@/types/edamamDataType";

const Analytics = () => {
  const ctx = useContext(AlyveCalorieTrackContext);
  const { data } = ctx;
  const router = useRouter();
  const [calorieData, setCalorieData] = useState<CalorieData[]>([]);

  useEffect(() => {
    const getLast7DaysData = () => {
      const last7Days = [];
      for (let i = 6; i >= 0; i--) {
        const date = subDays(new Date(), i);
        const formattedDate = format(date, "dd/MM/yyyy");
        const dayData = data.mealData[formattedDate] || {};
        let totalCalories = 0;

        Object.values(dayData).forEach((meals: any) => {
          meals?.forEach((meal: any) => {
            totalCalories += meal.nutrients.ENERC_KCAL;
          });
        });

        last7Days.push({
          date: format(date, "MMM d"),
          calories: totalCalories.toFixed(1),
        });
      }
      setCalorieData(last7Days);
    };

    getLast7DaysData();
  }, [data]);

  const handleBackBtnClick = () => {
    router.push(`/`);
  };

  return (
    <div className={classes.analyticsWrapper}>
      <h2>Analytics</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={calorieData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="calories" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <p>- Basic bar chart to show calories trend of the last 7 days</p>
      <div className={classes.backToHomeBtnCon}>
        <button className={classes.backToHomeBtn} onClick={handleBackBtnClick}>
          Back to home
        </button>
      </div>
    </div>
  );
};

export default Analytics;
