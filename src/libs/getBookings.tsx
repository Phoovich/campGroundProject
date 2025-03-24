export const getBookings = async (token: string): Promise<any> => {
  const response = await fetch(
    "https://swp-2-backend.vercel.app/api/v1/bookings",
    {
      headers: {
        Authorization: `Bearer ${token}`, // เพิ่มส่วน Authorization header
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Error fetching bookings: ${response.status} - ${response.statusText}`,
    );
  }

  return response.json();
};
