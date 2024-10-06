package com.happy.buddy.controllers;


import com.happy.buddy.entities.Activity;
import com.happy.buddy.repositories.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public HttpStatus addActivities(@RequestBody List<Activity> activities) {
        activityRepository.saveAll(activities);
        return HttpStatus.OK;

    }

    @GetMapping("/all")
    public List<Activity> getActivities() {
        return activityRepository.findAll();
    }

    @GetMapping("{id}")
    public Activity getActivity(@PathVariable Long id) {
        return activityRepository.findById(id).orElseThrow();
    }

}
