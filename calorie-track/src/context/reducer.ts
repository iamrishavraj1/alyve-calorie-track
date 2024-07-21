const deepCopy = (state: any) => JSON.parse(JSON.stringify(state));

export const setMealReducer = (state: any, action: any) => {
  let stateCopy = deepCopy(state);
  stateCopy.data.mealData = action.data.mealData;
  return stateCopy;
};

export const setSelectedDateReducer = (state: any, action: any) => {
  let stateCopy = deepCopy(state);
  stateCopy.data.selectedDateKey = action.data.selectedDateKey;
  return stateCopy;
};
