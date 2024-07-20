const deepCopy = (state: any) => JSON.parse(JSON.stringify(state));

export const setMealReducer = (state: any, action: any) => {
  let stateCopy = deepCopy(state);
  stateCopy.data.mealData = action.data.mealData;
  return stateCopy;
};
