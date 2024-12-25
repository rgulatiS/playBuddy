package com.happy.buddy.controllers;


import com.happy.buddy.dto.ErrorDto;
import com.happy.buddy.entities.Activity;
import com.happy.buddy.exceptions.NoDataFoundException;
import com.happy.buddy.repositories.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/activity")
public class ActivityController {

    @Autowired
    private ActivityRepository activityRepository;

//
//    @PostMapping
//    public Long addActivity(@RequestBody Activity activity) {
//        return activityRepository.save(activity).getActivityId();
//    }

    @CachePut(value = "activities")
    @PostMapping()
    public ResponseEntity<String> addActivities(@RequestBody List<Activity> activities)  {
        try {
            activityRepository.saveAll(activities);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        String message = "Activity added successfully";
        return new ResponseEntity<>(message, HttpStatus.CREATED);

    }

    @Cacheable(value = "activities")
    @GetMapping("/all")
    public ResponseEntity<List<Activity>> getActivities() {
        return new ResponseEntity<>(activityRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Activity> getActivity(@PathVariable Long id) throws NoDataFoundException {
        return new ResponseEntity<>(activityRepository.findById(id)
                .orElseThrow(() -> new NoDataFoundException("No Data Found for id " + id)), HttpStatus.OK);
    }


}
