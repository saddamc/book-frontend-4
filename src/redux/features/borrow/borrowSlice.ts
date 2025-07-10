import type { RootState } from "@/redux/store";
import type { IBorrow } from "@/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  borrows: IBorrow[];
}

const initialState: InitialState = {
  borrows: [],
};

// reducer part => 1
type DraftBorrow = Pick<
  IBorrow,
  "book" | "borrowerName" | "dueDate" | "quantity"
>;

// reducer part => 2
const createBorrow = (borrowData: DraftBorrow): IBorrow => {
  return { _id: nanoid(), ...borrowData };
};

const borrowSlice = createSlice({
  name: "borrow",
  initialState,
  reducers: {
    addBorrow: (state, action: PayloadAction<DraftBorrow>) => {
      const borrowData = createBorrow(action.payload);
      state.borrows.push(borrowData);
    },
  },
});

export const selectBorrows = (state: RootState) => {
  return state.borrow.borrows;
};

export const { addBorrow } = borrowSlice.actions;

export default borrowSlice.reducer;
