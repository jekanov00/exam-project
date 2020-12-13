const createReducer = (initialState, handlers) => {
  const reducer = (state = initialState, action) => {
    const { type } = action;
    return handlers.hasOwnProperty(type)
      ? handlers[type](state, action)
      : state;
  };
  return reducer;
};

export default createReducer;
