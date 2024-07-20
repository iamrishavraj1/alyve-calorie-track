const deepCopy = (state) => JSON.parse(JSON.stringify(state));

export const setUserAuthorisedReducer = (state, action) => {
  let stateCopy = deepCopy(state);
  stateCopy.data.isUserAuthorised = action.data.isUserAuthorised;
  return stateCopy;
};
