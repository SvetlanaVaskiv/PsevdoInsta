import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "./authReducers";
import { promiseReducer } from "./promiseReducer";
import { actionUserInfo } from "./actions";
function localStorageReduser(name, reducer) {
  return (state, action) => {
    let newState;
    if (state === undefined && localStorage[name]) {
      try {
        newState = JSON.parse(localStorage[name]);

        return newState;
      } catch (errors) {
        return errors;
      }
    }
    newState = reducer(state, action);
    localStorage.setItem(name, JSON.stringify(newState));
    return newState;
  };
}

let store = createStore(
  combineReducers({
    promise: localStorageReduser("promise", promiseReducer),
    authReducer,
  }),
  applyMiddleware(thunk)
);

store.subscribe(() => console.log(store.getState()));
store.subscribe(() => {
  const state = store.getState();

  if (
    state.promise &&
    state.promise.login &&
    state.promise.login.payload &&
    localStorage.authToken
  ) {
    store.dispatch(actionUserInfo(state.promise.login.payload));
  }
});

const delay = (ms) => new Promise((ok) => setTimeout(() => ok(ms), ms));

export default store;
