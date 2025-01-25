package com.happy.buddy.enums;

public enum BookingStatus {
    WAITING_PAYMENT(1),
    COMPLETED(2),
    CANCELLED(3),
    BOOKING_UTILIZED(4),
    BOOKING_NOT_UTILIZED(5);



    BookingStatus(int i) {
    }
}
