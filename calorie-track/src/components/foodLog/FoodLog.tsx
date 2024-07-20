"use client";
import React, { useState, useEffect, useRef, useContext } from "react";
import classes from "./FoodLog.module.css";
import CustomDatePicker from "../shared/datePicker/CustomDatePicker";
import useDebounce from "@/hooks/useDebounce";
import FoodLogCard from "./foodLogCard/FoodLogCard";
import { useRouter } from "next/navigation";
import { AlyveCalorieTrackContext } from "@/context/context";
import { FoodItem, MealData } from "@/types/edamamDataType";

const mealTabInfo = [
  { id: 1, name: "Breakfast", isActive: false },
  { id: 2, name: "Lunch", isActive: false },
  { id: 3, name: "Dinner", isActive: false },
];

const FoodLogPage: React.FC = () => {
  const ctx = useContext(AlyveCalorieTrackContext);
  const { setMealHandler } = ctx;
  const router = useRouter();
  const abortControllerRef = useRef<AbortController | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [selectedMeals, setSelectedMeals] = useState<MealData>({});
  const [activeTab, setActiveTab] = useState<string>("Breakfast");
  const [loading, setLoading] = useState<boolean>(false);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === "") {
      setSearchTerm("");
      setSearchResults([]);
      return;
    }
    setSearchTerm(e.target.value);
  };

  const handleSearch = async (searchTerm: string) => {
    setLoading(true);
    if (searchTerm.trim() === "") return;
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    try {
      const response = await fetch(
        `https://api.edamam.com/api/food-database/parser?app_id=07d50733&app_key=80fcb49b500737827a9a23f7049653b9&ingr=${searchTerm}`,
        { signal: abortController.signal }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSearchResults(data.hints);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const addMeal = (meal: FoodItem) => {
    const dateKey = selectedDate.toLocaleDateString();
    const updatedMeals = {
      ...selectedMeals,
      [dateKey]: {
        ...selectedMeals[dateKey],
        [activeTab]: [...(selectedMeals[dateKey]?.[activeTab] || []), meal],
      },
    };
    setSelectedMeals(updatedMeals);
    setSearchTerm("");
    setSearchResults([]);
    // if (typeof window !== "undefined") {
    //   global?.localStorage?.setItem(
    //     "selectedMeals",
    //     JSON.stringify(updatedMeals)
    //   );
    // }
    setMealHandler({ mealData: updatedMeals });
  };

  const removeMeal = (mealToRemove: FoodItem) => {
    const dateKey = selectedDate.toLocaleDateString();
    const updatedMeals = {
      ...selectedMeals,
      [dateKey]: {
        ...selectedMeals[dateKey],
        [activeTab]: selectedMeals[dateKey][activeTab].filter(
          (meal: any) => meal.foodId !== mealToRemove.foodId
        ),
      },
    };
    setSelectedMeals(updatedMeals);
    // if (typeof window !== "undefined") {
    //   global?.localStorage.setItem(
    //     "selectedMeals",
    //     JSON.stringify(updatedMeals)
    //   );
    // }
    setMealHandler({ mealData: updatedMeals });
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch(debouncedSearchTerm);
    }
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMeals: any = {};
      if (savedMeals) {
        setSelectedMeals(JSON.parse(savedMeals));
      }
    }
  }, [selectedDate]);

  const dateKey = selectedDate.toLocaleDateString(); // Use toLocaleDateString for consistent date format

  const handleDoneBtnClick = () => {
    router.push(`/?date=${dateKey}`);
  };

  return (
    <div className={classes.foodLogPageWrapper}>
      <div className={classes.headerCon}>
        <CustomDatePicker
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <div className={classes.mealTabs}>
          {mealTabInfo.map((tab) => (
            <button
              key={tab.id}
              className={`${classes.mealTabBtn} ${
                activeTab === tab.name ? classes.activeTab : ""
              }`}
              onClick={() => setActiveTab(tab.name)}>
              {tab.name}
            </button>
          ))}
        </div>
      </div>
      <div className={classes.searchBar}>
        <input
          type="search"
          placeholder="Add Your Meal"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {loading && (
          <div className={classes.searchResultsDropdown}>
            <div className={classes.searchResultItem}>
              <span>Please wait, we are fetching your meal...</span>
            </div>
          </div>
        )}
        {!loading && searchResults.length > 0 && (
          <div className={classes.searchResultsDropdown}>
            {searchResults.map((result: any, index) => (
              <div
                key={index}
                className={classes.searchResultItem}
                onClick={() => addMeal(result?.food)}>
                <span>{result?.food?.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={classes.mealCards}>
        {selectedMeals[dateKey]?.[activeTab]?.map((meal, index) => {
          return (
            <FoodLogCard
              key={index}
              meal={meal}
              onRemove={() => removeMeal(meal)}
            />
          );
        })}
      </div>
      <div className={classes.doneButtonCon}>
        <button className={classes.doneButton} onClick={handleDoneBtnClick}>
          Done
        </button>
      </div>
    </div>
  );
};

export default FoodLogPage;
