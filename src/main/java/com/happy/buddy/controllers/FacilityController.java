package com.happy.buddy.controllers;


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

@RestController
@CrossOrigin
@RequestMapping("/facility")
public class FacilityController {

    @Autowired
    private FacilityRepository facilityRepository;

    @Autowired
    private CourtService courtService;


    @PostMapping
    public Long addFacility(@RequestBody Facility facility) {
        if (facility.getFacilityId() == null) {
            facility.setRegisteredOn(LocalDate.now());
        }

        Long facilityId = facilityRepository.save(facility).getFacilityId();
        List<Court> courtList   = new ArrayList<>();
        facility.getCourts().forEach(court -> {
            try {
                court.getId().setFacilityId(facilityId);
                courtList.add(courtService.saveCourt(court));
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
            return facilityId;
    }

    @GetMapping("{id}")
    public Facility getFacility(@PathVariable Long id) {
        return facilityRepository.findById(id).orElseThrow();
    }

}
