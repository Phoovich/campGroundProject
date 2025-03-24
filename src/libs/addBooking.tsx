export async function addBooking({
  capmgroundId,
  checkInDate,
  checkOutDate,
  userId,
  token, // Add token parameter
}: {
  capmgroundId: string;
  checkInDate: Date;
  checkOutDate: Date;
  userId: string;
  token: any; // Changed to any to handle both string and object with token property
}) {
  // Check if we should use the "token" directly or if it's nested in an object
  // This depends on your API's exact response structure
  const authToken =
    typeof token === "object" && token.token ? token.token : token;

  const response = await fetch(
    `https://swp-2-backend.vercel.app/api/v1/campgrounds/${capmgroundId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Add Authorization header
      },
      body: JSON.stringify({
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        user: userId,
        campground: capmgroundId,
      }),
    },
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Booking failed");
  }

  return await response.json();
}
