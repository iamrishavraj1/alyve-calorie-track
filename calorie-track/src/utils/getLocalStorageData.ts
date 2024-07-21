import { MealData } from "@/types/edamamDataType";

export const getInitialMealData = (): MealData => {
  if (typeof window !== "undefined") {
    const savedMeals = window.localStorage.getItem("selectedMeals");
    return savedMeals ? JSON.parse(savedMeals) : {};
  }

  return {};
};
