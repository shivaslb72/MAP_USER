import data from "./data.json"
console.log("shiva", data.members)
const usersInitialState = data.members

const usersReducer = (state = usersInitialState, action) => {
  switch (action.type) {
    case "GET_USERS": {
      return state;
    }
    default: {
      return [...state];
    }
  }
};
export default usersReducer;
