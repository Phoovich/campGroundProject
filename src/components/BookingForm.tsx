'use client';
import { useState } from "react";
import { MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useDispatch } from "react-redux";
import { addBooking } from "@/redux/features/bookSlice";
import dayjs, { Dayjs } from "dayjs";

export default function BookingForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    nameLastname: '',
    contactNumber: '',
    campground: '',
    bookDate: dayjs()
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bookingItem = {
      nameLastname: formData.nameLastname,
      tel: formData.contactNumber,
      campground: formData.campground,
      bookDate: formData.bookDate.format('YYYY-MM-DD')
    };

    dispatch(addBooking(bookingItem));
    
    setFormData({
      nameLastname: '',
      contactNumber: '',
      campground: '',
      bookDate: dayjs()
    });
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col w-full max-w-md justify-center items-center bg-white text-black p-10 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Campground Booking</h1>
        <form 
          className="space-y-4 w-full flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <TextField
            variant="standard"
            type="text"
            name="Name-Lastname"
            label="Name-Lastname"
            className="w-full"
            fullWidth
            required
            value={formData.nameLastname}
            onChange={(e) => setFormData({...formData, nameLastname: e.target.value})}
          />
          <TextField
            variant="standard"
            type="tel"
            name="Contact-Number"
            label="Contact-Number"
            className="w-full"
            fullWidth
            required
            value={formData.contactNumber}
            onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="w-full"
              value={formData.bookDate}
              onChange={(newValue: Dayjs | null) => 
                setFormData({...formData, bookDate: newValue || dayjs()})
              }
            />
          </LocalizationProvider>
          <Select
            className="w-full"
            value={formData.campground}
            onChange={(e) => setFormData({...formData, campground: e.target.value})}
            fullWidth
            required
          >
            <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
            <MenuItem value="Spark">Spark Space</MenuItem>
            <MenuItem value="GrandTable">The Grand Table</MenuItem>
          </Select>
          <button
            type="submit"
            name="Book Campground"
            className="bg-blue-500 w-full text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Book Campground
          </button>
        </form>
      </div>
    </div>
  );
}