interface bookingList {
  success: boolean;
  count: number;
  data: bookingListItem[];
}

interface bookingListItem {
  _id: string;
  checkInDate: Date;
  checkOutDate: Date;
  user: string;
  campground: object;
  createdAt: Date;
}

export default async function BookingList({
  bookingList,
}: {
  bookingList: Promise<bookingList>;
}) {
  const bookingListReady = await bookingList;
  return (
    <div>
      {bookingListReady.data.map((bookingListItem: bookingListItem) => (
        <div>
          <p>{bookingListItem._id}</p>
          <p>{bookingListItem.user}</p>
        </div>
      ))}
    </div>
  );
}
