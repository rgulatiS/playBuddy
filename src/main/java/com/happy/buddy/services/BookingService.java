package com.happy.buddy.services;

import com.happy.buddy.entities.Booking;
import com.happy.buddy.entities.Court;
import com.happy.buddy.entities.CourtPk;
import com.happy.buddy.repositories.BookingRepository;
import com.happy.buddy.repositories.CourtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private CourtRepository courtRepository;

    public Booking createBooking(Booking booking) throws Exception {

        if (!validateIfCourtExist(booking)) {
            throw new Exception("Court does not exist");
        }

        if (validateIfBookingAlreadyPresent(booking)) {
            throw new Exception("Booking Already exist");
        }
        return bookingRepository.save(booking);
    }

    private boolean validateIfCourtExist(Booking booking) {
        return courtRepository.existsById(booking.getCourt().getId());
    }

    private boolean validateIfBookingAlreadyPresent(Booking booking) {
        List<Booking> bookingList = bookingRepository.findBookingByCourt_IdAndCourtBookingDate(booking.getCourt().getId(), booking.getCourtBookingDate());
        RestTemplate    restTemplate = new RestTemplate();
        ResponseEntity<Booking> responseEntity = restTemplate.getForEntity("http://localhost:8080/booking", Booking.class);

        return bookingList.stream().anyMatch(b -> b.getCourtBookingFromTime().equals(booking.getCourtBookingFromTime())
                && b.getCourtBookingToTime().equals(booking.getCourtBookingToTime()));

    }
}
