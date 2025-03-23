import Card from "./Card"
import Link from "next/link"


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
  
  interface CampgroundJson {
    success: boolean;
    count: number;
    data: CampgroundItem[];
  }
  

export default async function CampgroundCatalog({campgroundsJson} : {campgroundsJson:Promise<CampgroundJson>}) {
    const campgroundsJsonReady = await campgroundsJson

    return (
        <div className="font-serif">
            <h2 className="text-xl text-black text-center my-4">
                Explore {campgroundsJsonReady.count} camps in our camp catalog
            </h2>

            <div style={{margin:"20px", display:"flex",
                flexDirection:"row", alignContent:"space-around",
                justifyContent:"space-around", flexWrap:"wrap"}}>
                {
                    campgroundsJsonReady.data.map((campgroundItem:CampgroundItem) => (
                        <Link href={`/campground/${campgroundItem.id}`} className="w-1/5"> 
                            <Card 
                                campgroundName={campgroundItem.name} 
                                imgSrc={campgroundItem.picture}                     
                            />
                        </Link>
                    ))
                }        
            </div>
        </div>
    )
}