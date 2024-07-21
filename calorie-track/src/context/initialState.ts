"use client";
import { ContextState } from "@/types/contextType";
import { MealData } from "@/types/edamamDataType";
import { getInitialMealData } from "@/utils/getLocalStorageData";

export const INITIAL_STATE: ContextState = {
  data: {
    mealData: getInitialMealData(),
    selectedDateKey: new Date().toLocaleDateString(),
  },
  setMealHandler: () => {},
  setSelectedDateHandler: () => {},
};
