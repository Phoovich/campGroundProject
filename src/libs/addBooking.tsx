export async function addBooking({
  campgroundId,
  checkInDate,
  checkOutDate,
  token, // Add token parameter
}: {
  campgroundId: string;
  checkInDate: Date;
  checkOutDate: Date;
  token: any; // Changed to any to handle both string and object with token property
}) {
  // Check if we should use the "token" directly or if it's nested in an object
  // This depends on your API's exact response structure
  const authToken =
    typeof token === "object" && token.token ? token.token : token;

  const response = await fetch(
    `https://swp-2-backend.vercel.app/api/v1/campgrounds/${campgroundId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Add Authorization header
      },
      body: JSON.stringify({
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        // Let the backend use the authenticated user
        // The backend will use req.user.id from the auth token
      }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Booking failed");
  }

  return await response.json();
}
