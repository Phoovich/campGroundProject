/**
 * ฟังก์ชันสำหรับลบการจอง
 * @param bookingId - ID ของการจองที่ต้องการลบ
 * @param token - JWT token สำหรับการยืนยันตัวตน
 * @returns ผลลัพธ์จาก API
 */
export const deleteBooking = async (
  bookingId: string,
  token: string,
): Promise<{ success: boolean; message: string }> => {
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
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    // ดึงข้อมูล response แม้ว่าสถานะจะไม่ OK
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
      message: data.message || "Booking deleted successfully",
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

export default deleteBooking;
