import React from "react";
import classes from "./MealCards.module.css";
import MealCard from "./mealCard/MealCard";

const MealCards: React.FC = () => {
  const meals = [
    {
      title: "Breakfast",
      calories: 450,
      items: [
        { name: "Oatmeal", calories: 150 },
        { name: "Eggs", calories: 200 },
        { name: "Banana", calories: 80 },
      ],
    },
    {
      title: "Lunch",
      calories: 650,
      items: [
        { name: "Grilled Chicken Salad", calories: 450 },
        { name: "Whole wheat Bread", calories: 200 },
        { name: "Apple", calories: 80 },
      ],
    },
    {
      title: "Dinner",
      calories: 950,
      items: [
        { name: "Grilled Salmon", calories: 350 },
        { name: "Roasted Vegetables", calories: 200 },
      ],
    },
  ];

  return (
    <div className={classes.mealCardsWrapper}>
      {meals.map((meal, index) => (
        <MealCard key={index} meal={meal} />
      ))}
    </div>
  );
};

export default MealCards;
