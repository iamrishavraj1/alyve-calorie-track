import React, { useContext, useEffect, useState } from "react";
import classes from "./MealCards.module.css";
import MealCard from "./mealCard/MealCard";
import { AlyveCalorieTrackContext } from "@/context/context";
import { format } from "date-fns";

import { Meal } from "@/types/edamamDataType";

const MealCards: React.FC = () => {
  const ctx = useContext(AlyveCalorieTrackContext);
  const { data } = ctx;
  const { selectedDateKey } = data;

  const dateParam = selectedDateKey;
  const currentDate = dateParam ? dateParam : format(new Date(), "dd/MM/yyyy");

  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const mealData = data.mealData[currentDate]
      ? Object.entries(data.mealData[currentDate]).map(
          ([mealType, items]: any) => {
            const totalCalories = items.reduce(
              (sum: any, item: any) => sum + item.nutrients.ENERC_KCAL,
              0
            );
            return {
              title: mealType,
              calories: totalCalories,
              items: items.map((item: any) => ({
                name: item.label || "Unknown",
                calories: item.nutrients?.ENERC_KCAL || 0,
              })),
            };
          }
        )
      : [];
    setMeals(mealData);
  }, [currentDate, data.mealData]);

  return (
    <div className={classes.mealCardsWrapper}>
      {meals.length > 0 ? (
        meals.map((meal, index) => <MealCard key={index} meal={meal} />)
      ) : (
        <p>No meals recorded for today.</p>
      )}
    </div>
  );
};

export default MealCards;
