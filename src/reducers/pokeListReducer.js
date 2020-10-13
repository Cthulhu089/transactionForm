export default (state = {}, action) => {
  switch (action.type) {
    case "POKE_LIST":      
      return action.payload;
    default:
      return state;
  }
};
