import { MealData } from "./edamamDataType";

type SelectedDatePayload = {
  selectedDateKey: string;
};
export type ContextState = {
  data: {
    mealData: MealData;
    selectedDateKey: string;
  };
  setMealHandler: (payload: { mealData: MealData | null }) => void;
  setSelectedDateHandler: (payload: SelectedDatePayload) => void;
};
