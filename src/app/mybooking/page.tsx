import getBookings from "@/libs/getBookings";
import BookingList from "@/components/BookingList";

const mybooking: React.FC = () => {
  const Booking = getBookings();

  return (
    <div>
      <h1>Bookings</h1>
      <BookingList bookingList={Booking} />
    </div>
  );
};

export default mybooking;
