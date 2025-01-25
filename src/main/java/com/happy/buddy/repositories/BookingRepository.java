package com.happy.buddy.repositories;

import com.happy.buddy.entities.Booking;
import com.happy.buddy.entities.CourtPk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {

     List<Booking> findAllByBookedAt(String city);
     List<Booking> findAllByBookedAtAndCourtBookingDate(String city, LocalDate courtBookingDate);
     List<Booking> findBookingByCourt_IdAndCourtBookingDate(CourtPk courtpk, LocalDate bookingDate);
}
