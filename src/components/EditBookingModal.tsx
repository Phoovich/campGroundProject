"use client";

import { useState, useEffect } from "react";
import updateBooking from "@/libs/updateBooking";

interface EditBookingModalProps {
  bookingId: string;
  campgroundName: string;
  currentCheckInDate: string;
  currentCheckOutDate: string;
  token: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (updatedData: any) => void;
}

export default function EditBookingModal({
  bookingId,
  campgroundName,
  currentCheckInDate,
  currentCheckOutDate,
  token,
  isOpen,
  onClose,
  onSuccess,
}: EditBookingModalProps) {
  // แปลงวันที่จาก ISO string เป็น YYYY-MM-DD format สำหรับ input date
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const [checkInDate, setCheckInDate] = useState(
    formatDateForInput(currentCheckInDate),
  );
  const [checkOutDate, setCheckOutDate] = useState(
    formatDateForInput(currentCheckOutDate),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setCheckInDate(formatDateForInput(currentCheckInDate));
      setCheckOutDate(formatDateForInput(currentCheckOutDate));
      setError(null);
    }
  }, [isOpen, currentCheckInDate, currentCheckOutDate]);

  // ตรวจสอบว่าวันที่ checkOut ต้องมาหลังวันที่ checkIn
  const validateDates = () => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkOut <= checkIn) {
      setError("วันที่เช็คเอาท์ต้องมาหลังวันที่เช็คอิน");
      return false;
    }

    // ตรวจสอบว่าวันที่เช็คอินต้องไม่เป็นวันในอดีต
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkIn < today) {
      setError("วันที่เช็คอินต้องไม่เป็นวันในอดีต");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateDates()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // แปลงวันที่เป็น ISO string
      const checkInISO = new Date(checkInDate).toISOString();
      const checkOutISO = new Date(checkOutDate).toISOString();

      const result = await updateBooking(
        bookingId,
        {
          checkInDate: checkInISO,
          checkOutDate: checkOutISO,
        },
        token,
      );

      if (result.success) {
        onSuccess(result.data);
        onClose();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "เกิดข้อผิดพลาดในการอัปเดตการจอง",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="bg-green-600 text-white px-6 py-4 rounded-t-lg">
          <h3 className="text-lg font-semibold">แก้ไขการจอง</h3>
          <p className="text-sm text-green-100">{campgroundName}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              วันที่เช็คอิน
            </label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              วันที่เช็คเอาท์
            </label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={isSubmitting}
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-md text-white ${
                isSubmitting
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
