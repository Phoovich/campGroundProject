export const getBookings = async (): Promise<any> => {
  const response = await fetch(
    "https://swp-2-backend.vercel.app/api/v1/bookings", // Fixed extra slash
  );

  if (!response.ok) {
    throw new Error("Error fetching bookings");
  }

  return response.json();
};
export default getBookings;
