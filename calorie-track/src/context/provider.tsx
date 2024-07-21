"use client";
import { useReducer } from "react";
import { AlyveCalorieTrackContext } from "./context";
import { INITIAL_STATE } from "./initialState";
import * as reducers from "./reducer";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_MEAL":
      return reducers.setMealReducer(state, action);
    case "SET_SELECTED_DATE":
      return reducers.setSelectedDateReducer(state, action);

    default:
      return state;
  }
};

export const AlyveCalorieTrackProvider = ({ children }: any) => {
  const [alyveCalorieTrackData, dispatch] = useReducer(reducer, INITIAL_STATE);

  const dispatchHandler = (type: any) => (data: any) => {
    dispatch({ type, data });
  };

  const value = {
    data: JSON.parse(JSON.stringify(alyveCalorieTrackData.data)),
    setMealHandler: dispatchHandler("SET_MEAL"),
    setSelectedDateHandler: dispatchHandler("SET_SELECTED_DATE"),
  };

  return (
    <AlyveCalorieTrackContext.Provider value={value}>
      {children}
    </AlyveCalorieTrackContext.Provider>
  );
};
