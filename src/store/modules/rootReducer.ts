import { combineReducers } from "@reduxjs/toolkit";

import wallet from "./WalletSlice";
import transactions from "./TransactionsSlice";

export default combineReducers({
  wallet,
  transactions,
});
