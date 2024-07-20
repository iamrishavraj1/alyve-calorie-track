// import React, { useState, useEffect } from "react";
// import classes from "./FoodLog.module.css";
// import { FaBell } from "react-icons/fa";
// import { TbCalendarSearch } from "react-icons/tb";
// import { format, addDays, startOfWeek } from "date-fns";
// import CustomDatePicker from "../shared/datePicker/CustomDatePicker";

// const FoodLogPage: React.FC = () => {
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
//   const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
//   const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [searchResults, setSearchResults] = useState<any[]>([]);
//   const [selectedMeals, setSelectedMeals] = useState<any[]>([]);

//   const handleDateChange = (date: Date) => {
//     setSelectedDate(date);
//     setIsCalendarOpen(false);
//   };

//   const toggleDatePicker = () => {
//     setIsDatePickerOpen(!isDatePickerOpen);
//   };

//   const toggleCalendarOpener = () => {
//     setIsCalendarOpen(!isCalendarOpen);
//   };

//   const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newDate = new Date(selectedDate);
//     newDate.setMonth(
//       new Date(Date.parse(e.target.value + " 1, 2021")).getMonth()
//     );
//     setSelectedDate(newDate);
//   };

//   const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });
//   const weekDates = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

// const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   setSearchTerm(e.target.value);
// };

// const handleSearch = async () => {
//   if (searchTerm.trim() === "") return;

//   try {
//     const response = await fetch(
//       `https://api.edamam.com/api/food-database/parser?app_id=07d50733&app_key=80fcb49b500737827a9a23f7049653b9&ingr=${searchTerm}`
//     );
//     const data = await response.json();
//     setSearchResults(data.hints);
//   } catch (error) {
//     console.error("Error fetching search results:", error);
//   }
// };

//   const debounceSearch = (func: () => void, delay: number) => {
//     let debounceTimer: NodeJS.Timeout;
//     return function () {
//       clearTimeout(debounceTimer);
//       debounceTimer = setTimeout(() => func(), delay);
//     };
//   };

//   useEffect(() => {
//     const debouncedSearch = debounceSearch(handleSearch, 500);
//     debouncedSearch();
//   }, [searchTerm]);

//   const addMeal = (meal: any) => {
//     setSelectedMeals([...selectedMeals, meal]);
//   };

//   const removeMeal = (index: number) => {
//     const updatedMeals = selectedMeals.filter((_, i) => i !== index);
//     setSelectedMeals(updatedMeals);
//   };

//   const handleDone = () => {
//     // Navigate back to home screen
//     // Implement navigation logic here
//   };

//   const mealTabInfo = [
//     {
//       id: 1,
//       name: "Breakfast",
//       isActive: false,
//     },
//     {
//       id: 2,
//       name: "Lunch",
//       isActive: false,
//     },
//     {
//       id: 3,
//       name: "Dinner",
//       isActive: false,
//     },
//   ];

//   return (
//     <div className={classes.foodLogPageWrapper}>
//       <div className={classes.headerCon}>
//         <CustomDatePicker
//           selectedDate={selectedDate}
//           handleDateChange={handleDateChange}
//           toggleCalendarOpener={toggleCalendarOpener}
//           isCalendarOpen={isCalendarOpen}
//           handleMonthChange={handleMonthChange}
//           weekDates={weekDates}
//         />
//       </div>

//       <div className={classes.mealTabs}>
//         <button className={classes.mealTabBtn}></button>
//       </div>
//       <div className={classes.searchBar}>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//       </div>
//       {/* <div className={classes.searchResults}>
//         {searchResults.map((result, index) => (
//           <div key={index} className={classes.searchResultItem}>
//             <span>{result.food.label}</span>
//             <button onClick={() => addMeal(result)}>Add</button>
//           </div>
//         ))}
//       </div>
//       <div className={classes.selectedMeals}>
//         {selectedMeals.map((meal, index) => (
//           <div key={index} className={classes.selectedMealItem}>
//             <span>{meal.food.label}</span>
//             <span>{meal.food.nutrients.ENERC_KCAL} kcal</span>
//             <span>{meal.food.nutrients.PROCNT} g Protein</span>
//             <span>{meal.food.nutrients.CHOCDF} g Carbs</span>
//             <span>{meal.food.nutrients.FAT} g Fat</span>
//             <button onClick={() => removeMeal(index)}>Remove</button>
//           </div>
//         ))}
//       </div> */}
//       <button className={classes.doneButton} onClick={handleDone}>
//         Done
//       </button>
//     </div>
//   );
// };

// export default FoodLogPage;

import React, { useState, useEffect, useRef } from "react";
import classes from "./FoodLog.module.css";
import { FaBell } from "react-icons/fa";
import { TbCalendarSearch } from "react-icons/tb";
import { format, addDays, startOfWeek } from "date-fns";
import CustomDatePicker from "../shared/datePicker/CustomDatePicker";
import Image from "next/image";
import useDebounce from "@/hooks/useDebounce";
import FoodLogCard from "./foodLogCard/FoodLogCard";

const mealTabInfo = [
  {
    id: 1,
    name: "Breakfast",
    isActive: false,
  },
  {
    id: 2,
    name: "Lunch",
    isActive: false,
  },
  {
    id: 3,
    name: "Dinner",
    isActive: false,
  },
];

const dummyMeals = [
  {
    name: "Salad with egg",
    calories: 294,
    protein: 25,
    carbs: 21,
    fat: 14,
    image: "/assets/images/Vector.png",
  },
  {
    name: "Green vegetable",
    calories: 394,
    protein: 27,
    carbs: 32,
    fat: 42,
    image: "/assets/images/Vector.png",
  },
];
const FoodLogPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedMeals, setSelectedMeals] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string>("Breakfast");
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
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
    }
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

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

  const addMeal = (meal: any) => {
    const updatedMeals = {
      ...selectedMeals,
      [activeTab]: [...(selectedMeals[activeTab] || []), meal],
    };
    setSelectedMeals(updatedMeals);
    setSearchTerm("");
    setSearchResults([]);
    localStorage.setItem("selectedMeals", JSON.stringify(updatedMeals));
  };

  const removeMeal = (mealToRemove: any) => {
    const updatedMeals = {
      ...selectedMeals,
      [activeTab]: selectedMeals[activeTab].filter(
        (meal: any) => meal.foodId !== mealToRemove.foodId
      ),
    };
    setSelectedMeals(updatedMeals);
    localStorage.setItem("selectedMeals", JSON.stringify(updatedMeals));
  };

  useEffect(() => {
    const savedMeals = localStorage.getItem("selectedMeals");
    if (savedMeals) {
      setSelectedMeals(JSON.parse(savedMeals));
    }
  }, []);

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

        {searchResults.length > 0 && (
          <div className={classes.searchResultsDropdown}>
            {searchResults.map((result, index) => (
              <div
                key={index}
                className={classes.searchResultItem}
                onClick={() => addMeal(result.food)}>
                <span>{result.food.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={classes.mealCards}>
        {selectedMeals[activeTab]?.map((meal, index) => (
          <FoodLogCard
            key={index}
            meal={meal}
            onRemove={() => removeMeal(meal)}
          />
        ))}
      </div>

      <div className={classes.doneButtonCon}>
        <button className={classes.doneButton} onClick={""}>
          Done
        </button>
      </div>
    </div>
  );
};

export default FoodLogPage;
