interface CampgroundItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    dailyrate: number,
    __v: number,
    id: string
  }
  
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  
  const getCampground = async (
    id: string
  ): Promise<{ success: boolean; data: CampgroundItem }> => {
    await delay(300);
  
    const response = await fetch(
      `https://a08-venue-explorer-backend.vercel.app/api/v1/venues/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    const json = await response.json();
    return json;
  };
  
  export default getCampground;