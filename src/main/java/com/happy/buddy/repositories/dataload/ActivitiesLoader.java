package com.happy.buddy.repositories.dataload;

import com.happy.buddy.entities.Activity;
import com.happy.buddy.enums.ActivityType;
import com.happy.buddy.repositories.ActivityRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class ActivitiesLoader implements CommandLineRunner {


    private final ActivityRepository activityRepository;

    public ActivitiesLoader(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Load initial data into the database
        activityRepository.save(new Activity("Cricket", ActivityType.OUTDOOR, "Outdoor game for 2 Teams of 11 player"));
        activityRepository.save(new Activity("Badminton", ActivityType.OUTDOOR, "Wooden Standard Court"));
        activityRepository.save(new Activity("Pool", ActivityType.INDOOR, "Indoor Pool Table"));
        activityRepository.save(new Activity("Swimming", ActivityType.OUTDOOR, "Open Swimming pool with 30ft*40ft with 6ft depth"));

    }
}

