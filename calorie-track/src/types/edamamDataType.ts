import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ReactNode } from "react";

type Nutrients = {
  ENERC_KCAL: number | null;
  PROCNT: number | null;
  FAT: number | null;
  CHOCDF: number | null;
  FIBTG: number | null;
};

type Measure = {
  uri: string | null;
  label: string | null;
};

type Food = {
  foodId: string | null;
  uri: string | null;
  label: string | null;
  nutrients: Nutrients | null;
  category: string | null;
  categoryLabel: string | null;
  foodContentsLabel: string | null;
  brand?: string | null;
  image?: string | null;
};

export type FoodItem = {
  image: string | StaticImport;
  name: string;
  label: ReactNode;
  nutrients: any;
  foodId: any;
  food: Food | null;
  measures: Measure[] | null;
};

export type MealItem = {
  name: string;
  calories: number;
};

export type Meal = {
  title: string;
  calories: number;
  items: MealItem[];
};

export type MealCardProps = {
  meal: Meal;
};

export type MealData = {
  [date: string]: {
    [mealType: string]: FoodItem[];
  };
};

export type CalorieData = {
  date: string;
  calories: string;
};

export type FoodLogCardProps = {
  meal: FoodItem;
  onRemove: () => void;
};
