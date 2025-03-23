'use client';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';
import { removeBooking, BookingItem } from '@/redux/features/bookSlice';

export default function BookingList() {
  const bookItems = useSelector((state: RootState) => 
    state.bookSlice.bookItems // เรียกใช้ตรงตาม key ใน store
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleCancelBooking = (booking: BookingItem) => {
    dispatch(removeBooking(booking));
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-center mt-5 text-gray-600">My Bookings</h1>
      
      {bookItems.length === 0 ? (
        <div className="text-center text-gray-500 text-xl">
          No Campground Booking
        </div>
      ) : (
        <div className="grid gap-4 max-w-2xl mx-auto">
          {bookItems.map((item: BookingItem, index: number) => (
            <div 
              key={index}
              className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-4">
                <div className="flex gap-2 items-baseline">
                  <span className="font-semibold text-gray-800 min-w-[60px]">Name:</span>
                  <span className="text-gray-600">{item.nameLastname}</span>
                </div>
                <div className="flex gap-2 items-baseline">
                  <span className="font-semibold text-gray-800 min-w-[60px]">Contact:</span>
                  <span className="text-gray-600">{item.tel}</span>
                </div>
                <div className="flex gap-2 items-baseline">
                  <span className="font-semibold text-gray-800 min-w-[60px]">Campground:</span>
                  <span className="text-gray-600">{item.campground}</span>
                </div>
                <div className="flex gap-2 items-baseline">
                  <span className="font-semibold text-gray-800 min-w-[60px]">Date:</span>
                  <span className="text-gray-600">{item.bookDate}</span>
                </div>
              </div>
              <button
                onClick={() => handleCancelBooking(item)}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}