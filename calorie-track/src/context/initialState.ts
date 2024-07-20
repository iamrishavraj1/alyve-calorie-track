"use client";
import { MealData } from "@/types/edamamDataType";

export const INITIAL_STATE = {
  data: {
    mealData: {} as any,
  },
  setMealHandler: (p0: { mealData: MealData | null }) => {},
};
