export default (state = {}, action) => {
  switch (action.type) {
    case "POKEMON":
      return action.payload;
    case "CLEAR_POKEMON":
      return {};
    default:
      return state;
  }
};
