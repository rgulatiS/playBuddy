package com.happy.buddy.entities;

import com.happy.buddy.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.UUID;


@Setter
@Getter
@Entity
@Table(name = "booking"
, uniqueConstraints = {@UniqueConstraint(columnNames = {"facility_id", "activity_id", "court_id","court_booking_date", "court_booking_from_time"})
        , @UniqueConstraint(columnNames = {"facility_id", "activity_id", "court_id","court_booking_date", "court_booking_to_time"})})
@AllArgsConstructor
@NoArgsConstructor
public class Booking extends BaseFields {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID bookingId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "court_id", referencedColumnName = "court_id", insertable = false, updatable = false)
    @JoinColumn(name = "facility_id", referencedColumnName = "facility_id", insertable = false, updatable = false)
    @JoinColumn(name = "activity_id", referencedColumnName = "activity_id", insertable = false, updatable = false)
    private Court court;
//    private Integer courtBookingFromTime;
//    private Integer courtBookingToTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buddy_id", referencedColumnName = "buddy_id", insertable = false, updatable = false)
    private Buddy buddy;

    private String bookedAt;
    private boolean isPaymentReceived;
    private BookingStatus bookingStatus;
    private LocalDate courtBookingDate;
    private Integer courtBookingFromTime;
    private Integer courtBookingToTime;
    private boolean isCancelled;
}
