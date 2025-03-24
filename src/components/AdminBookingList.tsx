"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AdminBookingsPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("https://a08-venue-explorer-backend.vercel.app/api/v1/bookings", {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await res.json();
        setBookings(data.data); // Adjust if your data is nested differently
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (session?.user?.role === "admin") {
      fetchBookings();
    }
  }, [session]);

  const handleDelete = async (bookingId: string) => {
    try {
      const res = await fetch(`https://a08-venue-explorer-backend.vercel.app/api/v1/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete booking");

      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (session?.user?.role !== "admin") {
    return <p className="text-red-500 text-center mt-10">Unauthorized: Admins only</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All Bookings</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings available.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white shadow rounded p-4 border-l-4 border-blue-500">
              <div className="mb-2">
                <span className="font-semibold">User:</span> {booking.user.name} ({booking.user.email})
              </div>
              <div className="mb-2">
                <span className="font-semibold">Campground:</span> {booking.campground.name} – {booking.campground.address}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Date:</span> {new Date(booking.bookDate).toLocaleDateString()}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Check-in:</span> {new Date(booking.checkInDate).toLocaleDateString()}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Check-out:</span> {new Date(booking.checkOutDate).toLocaleDateString()}
              </div>
              <button
                onClick={() => handleDelete(booking._id)}
                className="mt-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-700 transition"
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
