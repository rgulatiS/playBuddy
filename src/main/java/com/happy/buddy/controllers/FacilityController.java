package com.happy.buddy.controllers;


import com.happy.buddy.dto.ErrorDto;
import com.happy.buddy.entities.Activity;
import com.happy.buddy.entities.Court;
import com.happy.buddy.entities.CourtPk;
import com.happy.buddy.entities.Facility;
import com.happy.buddy.exceptions.NoDataFoundException;
import com.happy.buddy.repositories.CourtRepository;
import com.happy.buddy.repositories.FacilityRepository;
import com.happy.buddy.services.CourtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/facility")
public class FacilityController {

    @Autowired
    private FacilityRepository facilityRepository;

    @Autowired
    private CourtService courtService;


    @PostMapping
    public ResponseEntity<Long> addFacility(@RequestBody Facility facility) throws NoDataFoundException {
        if (facility.getFacilityId() == null) {
            facility.setRegisteredOn(LocalDate.now());
        }
//        System.out.println(facility.getCourts().size() + " Courts Size ");
//        facility.getCourts().forEach( c -> System.out.println(c.getCourtFeatures()));


        Long facilityId = facilityRepository.save(facility).getFacilityId();
        facility.getCourts().forEach(court -> court.getId().setFacilityId(facilityId));
        List<Court> courtList   = courtService.saveAllCourt(facility.getCourts());
//        facility.getCourts().forEach(court -> {
//            try {
//                court.getId().setFacilityId(facilityId);
//                courtList.add(courtService.saveCourt(court));
//            } catch (Exception e) {
//                throw new RuntimeException(e);
//            }
//        });
        courtList.forEach(court -> System.out.println(court.getCourtFeatures()));
            return new ResponseEntity<>(facilityId, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Facility> getFacility(@PathVariable Long id) throws NoDataFoundException {
        Facility facility = facilityRepository.findById(id)
                .orElseThrow(() -> new NoDataFoundException("Facility Id "+ id+ " not found "));
        return new ResponseEntity<>(facility, HttpStatus.OK);
    }


    @GetMapping("/all/{city}")
    public ResponseEntity<List<Facility>> getFacilities(@PathVariable String city) {
        List<Facility> facilityList = facilityRepository
                   .findFacilitiesByisActiveAndFacilityAddress_CityIgnoreCase(true,city);
        return new ResponseEntity<>(facilityList, HttpStatus.OK);

    }


    @ExceptionHandler(NoDataFoundException.class)
    public ResponseEntity<ErrorDto> handleNoDataFoundException(Exception e){
        ErrorDto errorDto = new ErrorDto();
        errorDto.setMessage(e.getMessage());
        return new ResponseEntity<>(errorDto, HttpStatus.NOT_FOUND);
    }

}
