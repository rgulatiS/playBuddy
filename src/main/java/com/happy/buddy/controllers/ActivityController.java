package com.happy.buddy.controllers;


import com.happy.buddy.entities.Activity;
import com.happy.buddy.repositories.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping()
    public ResponseEntity<String> addActivities(@RequestBody List<Activity> activities) {
        activityRepository.saveAll(activities);
        String message = "Activity added successfully";
        return new ResponseEntity<>(message, HttpStatus.CREATED);

    }

    @GetMapping("/all")
    public ResponseEntity<List<Activity>> getActivities() {
        return new ResponseEntity<>(activityRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<Activity> getActivity(@PathVariable Long id) {
        return new ResponseEntity<>(activityRepository.findById(id).orElseThrow(), HttpStatus.OK);
    }

}
