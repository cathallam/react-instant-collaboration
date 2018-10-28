import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

// Reduces all the user related data
// Updates state based on current user and loads it to true
const initialUserState = {
  currentUser: null,
  isLoading: true
};

// ...Spreads all the properties from initialUserState
const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false
      };
    case actionTypes.CLEAR_USER:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
// Storing channels in global state
const initialChannelState = {
  currentChannel: null
};
// ...Spreads all the properties from initialUserState
const channel_reducer = (state = initialChannelState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel
      }
    default:
      return state;
  }
}
// Creates a new reducer 
// Puts information for user reducer and creates a channel reducer on channel data
// Only modify on certain part of state e.g. Global state

const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer
});

export default rootReducer;

