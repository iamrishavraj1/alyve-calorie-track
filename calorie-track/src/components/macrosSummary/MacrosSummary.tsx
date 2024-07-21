"use client";
import React, { useContext, useEffect, useState } from "react";
import classes from "./MacrosSummary.module.css";
import CircularProgressBar from "./circularProgressBar/CircularProgressBar";
import NormalProgressBar from "./normalProgressBar/NormalProgressBar";
import { AlyveCalorieTrackContext } from "@/context/context";
import { format } from "date-fns";

const MacrosSummary: React.FC = () => {
  const ctx = useContext(AlyveCalorieTrackContext);
  const { data } = ctx;
  const { selectedDateKey } = data;

  const dateParam = selectedDateKey;
  const currentDate = dateParam ? dateParam : format(new Date(), "dd/MM/yyyy");

  const [macros, setMacros] = useState({
    protein: 0,
    carbs: 0,
    fats: 0,
    calories: 0,
  });

  useEffect(() => {
    if (data.mealData && data.mealData[currentDate]) {
      const meals = data.mealData[currentDate];
      let totalProtein = 0;
      let totalCarbs = 0;
      let totalFats = 0;
      let totalCalories = 0;

      Object.values(meals).forEach((meal: any) => {
        meal.forEach((item: any) => {
          totalProtein += item.nutrients.PROCNT;
          totalCarbs += item.nutrients.CHOCDF;
          totalFats += item.nutrients.FAT;
          totalCalories += item.nutrients.ENERC_KCAL;
        });
      });

      setMacros({
        protein: totalProtein,
        carbs: totalCarbs,
        fats: totalFats,
        calories: totalCalories,
      });
    } else {
      setMacros({
        protein: 0,
        carbs: 0,
        fats: 0,
        calories: 0,
      });
    }
  }, [data, currentDate]);

  const targetProtein = 200;
  const targetCarbs = 250;
  const targetFats = 200;
  const targetCalories = 2500;

  const normalProgressBarsData = [
    {
      item: "Protein",
      percentage: ((macros.protein / targetProtein) * 100).toFixed(1),
      quantity: `${macros.protein.toFixed(1)}/${targetProtein.toFixed(1)} g`,
    },
    {
      item: "Carbs",
      percentage: ((macros.carbs / targetCarbs) * 100).toFixed(1),
      quantity: `${macros.carbs.toFixed(1)}/${targetCarbs.toFixed(1)} g`,
    },
    {
      item: "Fats",
      percentage: ((macros.fats / targetFats) * 100).toFixed(1),
      quantity: `${macros.fats.toFixed(1)}/${targetFats.toFixed(1)} g`,
    },
  ];

  return (
    <div className={classes.macrosSummaryPadding}>
      <div className={classes.macrosSummaryWrapper}>
        <div className={classes.macrosSummaryCon}>
          <div className={classes.circularProgressCon}>
            <CircularProgressBar
              percentage={((macros.calories / targetCalories) * 100).toFixed(1)}
            />
          </div>
          <div className={classes.normalProgressCon}>
            {normalProgressBarsData.map((data, index) => (
              <NormalProgressBar
                key={index}
                items={data.item}
                percentage={parseFloat(data.percentage)}
                quantity={data.quantity}
              />
            ))}
          </div>
        </div>
        <div className={classes.caloriesInfo}>
          <p>
            {macros.calories.toFixed(1)}/{targetCalories} Kcal
          </p>
        </div>
      </div>
    </div>
  );
};

export default MacrosSummary;
