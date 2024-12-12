package com.happy.buddy.services;

import com.happy.buddy.entities.Activity;
import com.happy.buddy.entities.Court;
import com.happy.buddy.entities.CourtPk;
import com.happy.buddy.repositories.ActivityRepository;
import com.happy.buddy.repositories.CourtRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class CourtService {

    @Autowired
    private CourtRepository courtRepository;
    @Autowired
    private ActivityRepository activityRepository;


    public Court saveCourt(Court court) throws Exception {
        if (court.getId().getFacilityId() == null || court.getId().getActivityId() == null) {
            throw new Exception("court cannot be saved without facilityId and ActivityId" + court.toString());
        }
        long courtId = 1L;
        if (court.getId().getCourtId() == null) {
            List<Court> courtList =
                    courtRepository.findByIdFacilityIdAndIdActivityIdOrderByIdCourtIdDesc(court.getId().getFacilityId(), court.getId().getActivityId());
            Optional<Long> courtPkOptional = courtList.stream().findFirst().map(c -> c.getId().getCourtId());
            if (courtPkOptional.isPresent()) {
                courtId = courtPkOptional.get();
            }


            court.setId(new CourtPk(court.getId().getFacilityId(), court.getId().getActivityId(), courtId));


            Activity activity = new Activity();

            Optional<Activity> optionalActivity = activityRepository.findById(court.getId().getActivityId());
            if (optionalActivity.isPresent()) {
                activity = optionalActivity.get();
            } else {
                throw new Exception("passed ActivityId" + court.getId().getActivityId() +
                        " is not valid, thus court cannot be saved " +
                        " If you have new Activity Kindly add Activity First");
            }

            court.setCourtName(activity.getActivityName().concat(String.valueOf(courtId)));
            return courtRepository.saveAndFlush(court);


        } else {
            return courtRepository.saveAndFlush(court);
        }


    }

    static class sortByFacilityIdAndActivityId implements Comparator<Court> {

        public int compare(Court c1, Court c2) {
            int facilityCompare = c1.getId().getFacilityId().compareTo(c2.getId().getFacilityId());
            int activityCompare = c1.getId().getActivityId().compareTo(c2.getId().getActivityId());
            return facilityCompare == 0 ? activityCompare : facilityCompare;
        }

    }

    static class sortByCourtId implements Comparator<Court> {

        public int compare(Court c1, Court c2) {
            if(c1.getId().getCourtId() == null && c2.getId().getCourtId() == null) {
                return 0;
            }
            if(c1.getId().getCourtId() == null && c2.getId().getCourtId() != null) {
                return 0;
            }
            if(c1.getId().getCourtId() != null && c2.getId().getCourtId() == null) {
                return 1;
            }
            return c1.getId().getCourtId().compareTo(c2.getId().getCourtId());
        }


    }

    private List<List<Court>> listOfCourts(List<Court> courts) {
        if (courts == null || courts.isEmpty()) {
            return null;
        }

        courts.sort(new sortByFacilityIdAndActivityId());
        List<List<Court>> listOfCourts = new ArrayList<>();
        long facilityId = 0L;
        long activityId = 0;
        int ind = 0;
        for (Court court : courts) {
            List<Court> courtList = new ArrayList<>();
            if (ind == 0) {
                courtList = new ArrayList<>();
                facilityId = court.getId().getFacilityId();
                activityId = court.getId().getActivityId();
                courtList.add(court);
            } else {
                if (facilityId == court.getId().getFacilityId() && activityId == court.getId().getActivityId()) {
                    courtList.add(court);
                } else {
                    ind = 0;
                }
            }
            ind++;
            listOfCourts.add(courtList);
        }
        return listOfCourts;
    }

    @Transactional
    public List<Court> saveAllCourt(List<Court> courts) throws Exception {


        List<Court> courtList = new ArrayList<>();

        courts.sort(new sortByFacilityIdAndActivityId());
        List<Court> courtListWithError = new ArrayList<>();
        int index = 0;
        long activityId = 0L;
        long facilityId = 0L;
        long courtId = 0L;
        for (Court court : courts) {

            if (court.getId().getFacilityId() == null || court.getId().getActivityId() == null) {
                courtListWithError.add(court);

            } else {
                if (court.getId().getCourtId() == null) {
                    if (index == 0) {
                        index = 1;
                        activityId = court.getId().getActivityId();
                        facilityId = court.getId().getFacilityId();
                        courtId = getCourtIdUsingFacilityIdAndActivityId(court);
                    } else {
                        if (facilityId == court.getId().getFacilityId() && activityId == court.getId().getActivityId()) {
                            courtId++;
                            System.out.println(" updated CourtId " + courtId);
                        } else {
                            activityId = court.getId().getActivityId();
                            facilityId = court.getId().getFacilityId();
                            courtId = getCourtIdUsingFacilityIdAndActivityId(court);
                        }
                    }

                } else {
                    courtId = court.getId().getCourtId();
                    System.out.println();
                }

                Activity activity = getActivity(court.getId().getActivityId());
                court.setId(new CourtPk(court.getId().getFacilityId(), court.getId().getActivityId(), courtId));
                court.setCourtName(activity.getActivityName().concat(String.valueOf(courtId)));
                System.out.println(courtId + " || " + court.getCourtName());
                courtList.add(courtRepository.save(court));
            }
            ;


//
//        } else {
//            return courtRepository.saveAndFlush(court);
//        }
            if (!courtListWithError.isEmpty()) {
                courtListWithError.forEach(System.out::println);
            }

        }
        return courtList;
    }


    @Transactional
    public List<Court> saveAllCourtForFacilityAndActivity(List<Court> courts, long facilityId, long activityId) throws Exception {
        if (facilityId == 0 || activityId == 0) {
            throw new Exception();
        }
        List<Court> courtList = new ArrayList<>();
        int index = 0;
        Activity activity = getActivity(activityId);
        long courtId = 0L;
        courts.sort(new sortByCourtId());
        for (Court court : courts) {
            if (court.getId().getCourtId() == null) {
                if (index == 0) {
                    index = 1;
                    courtId = getCourtIdUsingFacilityIdAndActivityId(court);
                } else {
                    courtId++;
                }
            } else {
                courtId = court.getId().getCourtId();

            }

            court.setId(new CourtPk(court.getId().getFacilityId(), court.getId().getActivityId(), courtId));
            court.setCourtName(activity.getActivityName().concat(String.valueOf(courtId)));
            System.out.println(courtId + " || " + court.getCourtName());
            courtList.add(courtRepository.save(court));
        }
        return courtList;
    }


    private Activity getActivity(long activityId) {
        Activity activity = new Activity();
        Optional<Activity> optionalActivity = activityRepository.findById(activityId);
        if (optionalActivity.isPresent()) {
            activity = optionalActivity.get();
        }
        return activity;
    }

    private long getCourtIdUsingFacilityIdAndActivityId(Court court) {

        List<Court> courtList =
                courtRepository.findByIdFacilityIdAndIdActivityIdOrderByIdCourtIdDesc(court.getId().getFacilityId(), court.getId().getActivityId());
        Optional<Long> courtPkOptional = courtList.stream().findFirst().map(c -> c.getId().getCourtId());
        return courtPkOptional.orElse(1L);
    }

}
