interface CampgroundItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    __v: number,
    id: string
  }
  
  interface CampgroundJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: CampgroundItem[]
  }

  interface BookingItem {
    _id: string;
    checkInDate: string;
    checkOutDate: string;
    bookDate: string;
    user: {
      name: string;
      email: string;
      tel: string;
    };
    campground: {
      name: string;
      address: string;
    };
  }
  