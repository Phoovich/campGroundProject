export const getVenues = async (): Promise<any> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    const response = await fetch('https://a08-venue-explorer-backend.vercel.app/api/v1/venues');
    
    if(!response.ok) {
      throw new Error('Error fetching venues');
    }
    
    return response.json();
  };
  export default getVenues;