package com.happy.buddy.controllers;


import com.happy.buddy.entities.Activity;
import com.happy.buddy.entities.Court;
import com.happy.buddy.entities.CourtPk;
import com.happy.buddy.entities.Facility;
import com.happy.buddy.repositories.CourtRepository;
import com.happy.buddy.repositories.FacilityRepository;
import com.happy.buddy.services.CourtService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Long addFacility(@RequestBody Facility facility) throws Exception {
        if (facility.getFacilityId() == null) {
            facility.setRegisteredOn(LocalDate.now());
        }
        System.out.println(facility.getCourts().size() + " Courts Size ");
        facility.getCourts().forEach( c -> System.out.println(c.getCourtFeatures()));


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
            return facilityId;
    }

    @GetMapping("{id}")
    public Facility getFacility(@PathVariable Long id) {
        return facilityRepository.findById(id).orElseThrow();
    }


    @GetMapping("/all/{city}")
    public List<Facility> getFacilities(@PathVariable String city) {
        return facilityRepository
                   .findFacilitiesByisActiveAndFacilityAddress_City(true,city);

    }

}
