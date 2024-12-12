package com.happy.buddy.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Embeddable
public class CourtPk implements Serializable {

    @Column(name = "facility_id")
    private Long facilityId;

    @Column(name = "activity_id")
    private Long activityId;
    
    @Column(name = "court_id")
    private Long courtId;


    public CourtPk() {}

    public CourtPk(Long facilityId, Long activityId, Long courtId) {
        this.facilityId = facilityId;
        this.activityId = activityId;
        this.courtId = courtId;

    }
}
