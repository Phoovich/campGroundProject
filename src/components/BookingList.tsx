interface bookingList {
  success: boolean;
  count: number;
  data: bookingListItem[];
  error?: string;
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

  // Check if there's an error
  if (bookingListReady.error) {
    return (
      <div className="error-container">
        <h2>Error Loading Bookings</h2>
        <p>{bookingListReady.error}</p>
        <p>Please try again later or contact support.</p>
      </div>
    );
  }

  // Handle case when there's no data
  if (!bookingListReady.data || bookingListReady.data.length === 0) {
    return (
      <div className="empty-bookings">
        <h2>No Bookings Found</h2>
        <p>You don't have any bookings yet.</p>
      </div>
    );
  }

  return (
    <div className="booking-list">
      {bookingListReady.data.map((bookingListItem: bookingListItem) => (
        <div key={bookingListItem._id} className="booking-item">
          <p>Booking ID: {bookingListItem._id}</p>
          <p>User: {bookingListItem.user}</p>
          <p>
            Check-in:{" "}
            {new Date(bookingListItem.checkInDate).toLocaleDateString()}
          </p>
          <p>
            Check-out:{" "}
            {new Date(bookingListItem.checkOutDate).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
