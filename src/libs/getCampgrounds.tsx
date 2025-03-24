export const getCampgrounds = async (): Promise<any> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const response = await fetch(
    "https://swp-2-backend.vercel.app/api/v1/campgrounds",
  );

  if (!response.ok) {
    throw new Error("Error fetching campgrounds");
  }

  return response.json();
};
export default getCampgrounds;
