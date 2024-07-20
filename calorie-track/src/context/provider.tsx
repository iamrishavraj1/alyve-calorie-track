"use client";
import { useReducer } from "react";
import { AlyveCalorieTrackContext } from "./context";
import { INITIAL_STATE } from "./initialState";
import * as reducers from "./reducer";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_AUTHORISED":

    default:
      return state;
  }
};

export const AlyveCalorieTrackProvider = ({ children }) => {
  const [alyveCalorieTrackData, dispatch] = useReducer(reducer, INITIAL_STATE);

  const dispatchHandler = (type) => (data) => {
    dispatch({ type, data });
  };

  const value = {
    data: JSON.parse(JSON.stringify(alyveCalorieTrackData.data)),
    setUserAuthorisedHandler: dispatchHandler("SET_USER_AUTHORISED"),
  };

  return (
    <AlyveCalorieTrackContext.Provider value={value}>
      {children}
    </AlyveCalorieTrackContext.Provider>
  );
};
