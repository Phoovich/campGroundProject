/**
 * ฟังก์ชันสำหรับอัปเดตการจอง
 * @param bookingId - ID ของการจองที่ต้องการอัปเดต
 * @param bookingData - ข้อมูลที่ต้องการอัปเดต (checkInDate, checkOutDate)
 * @param token - JWT token สำหรับการยืนยันตัวตน
 * @returns ผลลัพธ์จาก API
 */
export const updateBooking = async (
  bookingId: string,
  bookingData: {
    checkInDate: string;
    checkOutDate: string;
  },
  token: string,
): Promise<{ success: boolean; message: string; data?: any }> => {
  if (!token) {
    throw new Error("Authorization token is required");
  }

  if (!bookingId) {
    throw new Error("Booking ID is required");
  }

  try {
    const response = await fetch(
      `https://swp-2-backend.vercel.app/api/v1/bookings/${bookingId}`,
      {
        method: "PUT", // หรือ PATCH ขึ้นอยู่กับ API
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      },
    );

    // ดึงข้อมูล response
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = { success: false, message: "Failed to parse response" };
    }

    if (!response.ok) {
      // ส่งกลับข้อความข้อผิดพลาดจาก API หรือข้อความทั่วไป
      return {
        success: false,
        message:
          data.message || `Error: ${response.status} - ${response.statusText}`,
      };
    }

    return {
      success: true,
      message: data.message || "Booking updated successfully",
      data: data.data,
    };
  } catch (error) {
    console.error("API request failed:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

export default updateBooking;
