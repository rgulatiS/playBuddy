package com.happy.buddy.controllers;


import com.happy.buddy.entities.Booking;
import com.happy.buddy.repositories.BookingRepository;
import com.happy.buddy.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private BookingRepository bookingRepository;


    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/booking/{id}")
    public Booking getBooking(@PathVariable UUID id) {
        return bookingRepository.findById(id).orElse(null);
    }

    @GetMapping("/bookings/{city}")
    public List<Booking> getAllBookings(@PathVariable String city) {
        return bookingRepository.findAllByBookedAt(city);
    }

    @GetMapping("/bookings/today/{city}")
    public List<Booking> getTodayBookings(@PathVariable String city) {
        return bookingRepository.findAllByBookedAtAndCourtBookingDate(city, LocalDate.now());
    }

    @PostMapping("/booking")
    public Booking createBooking(@RequestBody Booking booking) throws Exception {
        return bookingService.createBooking(booking);
    }


}
