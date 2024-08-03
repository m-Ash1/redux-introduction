import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
const { createStore, combineReducers, applyMiddleware } = require("redux");
// Redux Reducers Store

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
