interface CampgroundItem {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  picture: string;
  dailyrate: number;
  __v: number;
  id: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getCampground = async (id: string): Promise<CampgroundItem> => {
  await delay(300);

  const response = await fetch(
    `https://swp-2-backend.vercel.app/api/v1/campgrounds/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch campground");
  }

  const json = await response.json();
  return json.data;
};

export default getCampground;
