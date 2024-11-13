package com.happy.buddy.services;

import com.happy.buddy.entities.Activity;
import com.happy.buddy.entities.Court;
import com.happy.buddy.entities.CourtPk;
import com.happy.buddy.repositories.ActivityRepository;
import com.happy.buddy.repositories.CourtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourtService {

    @Autowired
    private CourtRepository courtRepository;
    @Autowired
    private ActivityRepository activityRepository;
//    @Autowired
//    private ActivityRepository activityRepository;

    public Court saveCourt(Court court) throws Exception {
        long courtId = 1L;
        Activity activity = new Activity();
        if (court.getId() == null || court.getId().getFacilityId() == null || court.getId().getActivityId() == null) {

            throw new Exception("court cannot be saved without facilityId and ActivityId" + court.toString());
        }
        Optional<Activity> optionalActivity = activityRepository.findById(court.getId().getActivityId());
        if (optionalActivity.isPresent()) {
            activity = optionalActivity.get();
        }
        else {
            throw new Exception("passed ActivityId" + court.getId().getActivityId() +
                    " is not valid, thus court cannot be saved " +
                    " If you have new Activity Kindly add Activity First" );
        }
//        Activity activity = court.getActivity();
//
//        if (activity != null && activity.getActivityId() == null) {
//            activityRepository.save(activity);
//        }

        Optional<Court> existingCourt = courtRepository.findById(court.getId());
        if (existingCourt.isPresent()) {
            courtId = existingCourt.get().getId().getCourtId();
        } else {
            List<Court> courtList =
                    courtRepository.findByIdFacilityIdAndIdActivityIdOrderByIdDesc(court.getId().getFacilityId(), court.getId().getActivityId());
            Optional<Long> courtPkOptional = courtList.stream().findFirst().map(c -> c.getId().getCourtId());
            if (courtPkOptional.isPresent()) {
                courtId = courtPkOptional.get();
            }
        }
        court.setId(new CourtPk(court.getId().getFacilityId(), court.getId().getActivityId(), courtId));

        court.setCourtName(activity.getActivityName().concat(String.valueOf(courtId)));
        return courtRepository.save(court);
    }

}
