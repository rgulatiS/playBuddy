package com.happy.buddy.services;

import com.happy.buddy.entities.Activity;
import com.happy.buddy.entities.Address;
import com.happy.buddy.entities.Buddy;
import com.happy.buddy.entities.BuddyActivity;
import com.happy.buddy.repositories.ActivityRepository;
import com.happy.buddy.repositories.AddressRepository;
import com.happy.buddy.repositories.BuddyActivityRepository;
import com.happy.buddy.repositories.BuddyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BuddyService {

    @Autowired
    private BuddyRepository buddyRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private BuddyActivityRepository buddyActivityRepository;

    @Autowired
    private ActivityRepository activityRepository;

    public UUID addBuddyWithAddressAndActivity(Buddy buddy) {

        Buddy buddySaved = buddyRepository.save(buddy);
        Address address = new Address();
        if( buddy.getAddress() != null ) {address = addressRepository.save(buddy.getAddress());}
        List<BuddyActivity> buddyActivityListM = buddy.getBuddyActivities().stream().map(x-> {
            BuddyActivity buddyActivity = new BuddyActivity();

            Optional<Activity> optionalActivity = activityRepository.findById(x.getActivity().getActivityId());
            optionalActivity.ifPresent(buddyActivity::setActivity);
            return buddyActivity;
        }).toList();
        List<BuddyActivity> buddyActivityList = buddyActivityRepository.saveAll(buddyActivityListM);
        buddy.setAddress(address);
        buddy.setBuddyActivities(buddyActivityList);
        System.out.println("Saved Buddy Id " + buddySaved.getBuddyId());
        return buddySaved.getBuddyId();

    }


}


