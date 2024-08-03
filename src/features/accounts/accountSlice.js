import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loanAmount: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account", // this will be the first part of the action (ex. account/<action>)
  initialState,
  reducers: {
    deposite(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      if (state.balance < action.payload) return;
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(loanAmount, loanPurpose) {
        return {
          payload: { loanAmount, loanPurpose },
        };
      },
      reducer(state, action) {
        state.balance += action.payload.loanAmount;
        state.loanAmount += action.payload.loanAmount;
        state.loanPurpose = action.payload.loanPurpose;
      },
    },
    returnLoan(state, action) {
      state.balance -= state.loanAmount;
      state.loanAmount = 0;
      state.loanPurpose = "";
    },
    convertCurrency(state, action) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, returnLoan } = accountSlice.actions;

//* We'll Make an Action Creator outside the RTK action creators, why? cuz we need to add the Thunk Functionality in one of the actions

export function deposite(amount, currency) {
  if (currency === "USD") return { type: "account/deposite", payload: amount };
  return async function (dispatch) {
    dispatch({ type: "account/convertCurrency" });
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await response.json();
    const convertedCurrency = data.rates.USD;
    dispatch({ type: "account/deposite", payload: convertedCurrency });
  };
}

export default accountSlice.reducer;
