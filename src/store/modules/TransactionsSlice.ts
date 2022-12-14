import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { transactionType } from "../../types/";

const adapter = createEntityAdapter<transactionType>({
  selectId: (item) => item.id,
});

export const { selectAll, selectById } = adapter.getSelectors(
  (state: RootState) => state.transactions
);

const sliceNameSlice = createSlice({
  name: "transactions",
  initialState: adapter.getInitialState(),
  reducers: {
    addOneTransaction: adapter.addOne,
    addMany: adapter.addMany,
    updateOne: adapter.updateOne,
  },
});

export const { addOneTransaction, addMany, updateOne } = sliceNameSlice.actions;
export default sliceNameSlice.reducer;
