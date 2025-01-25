package com.happy.buddy.controllers;


import com.happy.buddy.entities.Activity;
import com.happy.buddy.entities.CourtPk;
import com.happy.buddy.entities.Facility;
import com.happy.buddy.entities.Court;
import com.happy.buddy.repositories.CourtRepository;
import com.happy.buddy.repositories.FacilityRepository;
import com.happy.buddy.services.CourtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/court")
public class CourtController {

    @Autowired
    private CourtRepository courtRepository;
    @Autowired
    private CourtService courtService;


    @PostMapping
    public CourtPk addCourt(@RequestBody Court court) throws Exception {
//        Facility facility = court.getFacility();
//        Activity activity = court.getActivity();
        return courtService.saveCourt(court).getId();
    }

    @GetMapping()
    public Court getCourt(@RequestParam("facilityId") Long facilityId, @RequestParam("activityId") Long activityId,
                          @RequestParam("courtId") Long courtId){
        CourtPk courtPk = new CourtPk();
        courtPk.setFacilityId(facilityId);
        courtPk.setActivityId(activityId);
        courtPk.setCourtId(courtId);
        return courtRepository.findById(courtPk).orElse(null);
    }
//    @GetMapping("{city}")
//    public FacilityActivityCourt getFacilities(@PathVariable String city) {
//        return facilityActivityCourtRepository.findByFacilityCity(city).orElseThrow();
//    }


    //    @PostMapping("/all")
//    public List<Court> getCourts(@RequestBody List<Activity> activities) {
////        facilityRepository.findFacilitiesByActive(true);
//
//        return courtRepository.findByActivityInAndFacilityActive(activities, true);
//
//    }
}
