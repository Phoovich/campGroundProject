export const getCampgrounds = async (): Promise<any> => {
  const response = await fetch(
    "https://swp-2-backend.vercel.app/api/v1/campgrounds",
  );

  if (!response.ok) {
    throw new Error("Error fetching campgrounds");
  }

  return response.json();
};
export default getCampgrounds;
