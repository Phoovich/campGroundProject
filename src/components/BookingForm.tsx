'use client';

import { useState } from "react";
import { MenuItem, Select, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSession } from "next-auth/react";
import dayjs, { Dayjs } from "dayjs";

export default function BookingForm() {
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    campground: '',
    checkInDate: dayjs(),
    checkOutDate: dayjs().add(1, 'day'),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      campground: formData.campground, // This should be the campground ObjectId
      checkInDate: formData.checkInDate.toISOString(),
      checkOutDate: formData.checkOutDate.toISOString(),
    };

    try {
      const res = await fetch("https://a08-venue-explorer-backend.vercel.app/api/v1/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      alert("Booking successful!");
    } catch (err) {
      console.error(err);
      alert("Error creating booking.");
    }
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col w-full max-w-md justify-center items-center bg-white text-black p-10 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Book a Campground</h1>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Check-in Date"
              value={formData.checkInDate}
              onChange={(value) =>
                setFormData({ ...formData, checkInDate: value || dayjs() })
              }
              className="w-full"
            />
            <DatePicker
              label="Check-out Date"
              value={formData.checkOutDate}
              onChange={(value) =>
                setFormData({ ...formData, checkOutDate: value || dayjs().add(1, 'day') })
              }
              className="w-full"
            />
          </LocalizationProvider>
          <Select
            className="w-full"
            value={formData.campground}
            onChange={(e) =>
              setFormData({ ...formData, campground: e.target.value })
            }
            fullWidth
            required
            displayEmpty
          >
            <MenuItem value="" disabled>Select Campground</MenuItem>
            <MenuItem value="campgroundObjectId1">The Bloom Pavilion</MenuItem>
            <MenuItem value="campgroundObjectId2">Spark Space</MenuItem>
            <MenuItem value="campgroundObjectId3">The Grand Table</MenuItem>
          </Select>
          <button
            type="submit"
            className="bg-blue-500 w-full text-white px-4 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}
