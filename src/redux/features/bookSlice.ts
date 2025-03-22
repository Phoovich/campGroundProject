import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookingItem {
  nameLastname: string;
  tel: string;
  venue: string;
  bookDate: string;
}

interface BookState {
  bookItems: BookingItem[];
}

const initialState: BookState = {
  bookItems: []
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      state.bookItems = state.bookItems.filter(
        (item) => 
          item.venue !== action.payload.venue ||
          item.bookDate !== action.payload.bookDate
      );
      state.bookItems.push(action.payload);
    },
    removeBooking: (state, action: PayloadAction<BookingItem>) => {
      state.bookItems = state.bookItems.filter(
        (item) => 
          !(item.nameLastname === action.payload.nameLastname &&
          item.tel === action.payload.tel &&
          item.venue === action.payload.venue &&
          item.bookDate === action.payload.bookDate)
      );
    }
  }
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;