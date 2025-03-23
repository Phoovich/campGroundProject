import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookingItem {
  nameLastname: string;
  tel: string;
  campground: string;
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
          item.campground !== action.payload.campground ||
          item.bookDate !== action.payload.bookDate
      );
      state.bookItems.push(action.payload);
    },
    removeBooking: (state, action: PayloadAction<BookingItem>) => {
      state.bookItems = state.bookItems.filter(
        (item) => 
          !(item.nameLastname === action.payload.nameLastname &&
          item.tel === action.payload.tel &&
          item.campground === action.payload.campground &&
          item.bookDate === action.payload.bookDate)
      );
    }
  }
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;