import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  bookItems: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBookings(state, action: PayloadAction<BookingItem[]>) {
      state.bookItems = action.payload;
    },
    removeBooking(state, action: PayloadAction<BookingItem>) {
      state.bookItems = state.bookItems.filter(
        (item) => item !== action.payload, // Adjust this logic based on how you identify bookings (e.g., by ID)
      );
    },
  },
});

export const { setBookings, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;

