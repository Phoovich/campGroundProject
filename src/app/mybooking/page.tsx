import { getBookings } from "@/libs/getBookings";
import BookingList from "@/components/BookingList";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const Mybooking = async () => {
  // รอให้ getServerSession ทำงานเสร็จก่อนด้วย await
  const session = await getServerSession(authOptions);

  // ตรวจสอบว่ามีเซสชันหรือไม่
  if (!session) {
    // ถ้าไม่มี session ให้ redirect ไปหน้า login
    redirect("/api/auth/signin");
  }

  // ตรวจสอบว่ามี token หรือไม่
  if (!session.user?.token) {
    return (
      <div>
        <h1>Bookings</h1>
        <div className="error-container">
          <h2>ไม่พบข้อมูลการยืนยันตัวตน</h2>
          <p>ระบบไม่พบ token สำหรับการเข้าถึง API</p>
          <p>กรุณา logout และ login ใหม่อีกครั้ง</p>
        </div>
      </div>
    );
  }

  // ส่ง token ไปที่ getBookings function
  const Booking = getBookings(session.user.token);

  return (
    <div>
      <h1>Bookings</h1>
      <BookingList bookingList={Booking} />
    </div>
  );
};

export default Mybooking;
