"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { addBooking } from "@/libs/addBooking";
import getUserProfile from "@/libs/getUserProfile";
import { useSession } from "next-auth/react";

// Instead of using react-datepicker, we'll use the native date input
export default function BookingForm() {
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  const searchParams = useSearchParams();
  const campgroundId = searchParams.get("campgroundId");
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    // Fetch user profile when session is available
    const fetchUserProfile = async () => {
      if (session?.user?.token) {
        try {
          const userData = await getUserProfile(session.user.token);
          setUserProfile(userData);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          setError("Failed to fetch user profile. Please try again later.");
        }
      }
    };

    fetchUserProfile();
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkInDate || !checkOutDate) {
      setError("Please select both check-in and check-out dates");
      return;
    }

    const checkInDateObj = new Date(checkInDate);
    const checkOutDateObj = new Date(checkOutDate);

    if (checkOutDateObj <= checkInDateObj) {
      setError("Check-out date must be after check-in date");
      return;
    }

    if (!campgroundId) {
      setError("Campground ID is missing");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (!session || !session.user || !session.user.token) {
        setError("You must be logged in to make a booking");
        return;
      }

      // Now passing all required parameters to addBooking
      const bookingData = await addBooking({
        campgroundId: campgroundId,
        checkInDate: checkInDateObj,
        checkOutDate: checkOutDateObj,
        token: session.user.token,
      });

      // Redirect to success page or booking details
      router.push(`/booking/confirmation?id=${bookingData._id}`);
    } catch (error: any) {
      setError(error.message || "Failed to create booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // If no session, show login prompt
  if (!session) {
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Booking Form</h2>
        <p className="text-red-500">Please log in to make a booking</p>
        <button
          onClick={() => router.push("/login")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Booking Form</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Check-in Date:</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            min={today}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Check-out Date:</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            min={checkInDate || today}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Selected Campground ID:</label>
          <input
            type="text"
            value={campgroundId || "No campground selected"}
            className="w-full p-2 border rounded bg-gray-100"
            disabled
          />
          {!campgroundId && (
            <p className="text-red-500 text-sm mt-1">
              Please select a campground first
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !campgroundId}
          className={`w-full p-2 rounded text-white ${
            isLoading || !campgroundId
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isLoading ? "Processing..." : "Book Now"}
        </button>
      </form>
    </div>
  );
}
