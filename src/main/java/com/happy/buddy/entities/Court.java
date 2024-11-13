package com.happy.buddy.entities;


import com.happy.buddy.enums.ActivityType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;




@Getter
@Setter
@ToString
@Entity
@Table(name = "court")
public class Court {


    @EmbeddedId
    private CourtPk id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "facility_id", referencedColumnName = "facility_id", insertable=false, updatable=false)
    private Facility facility;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "activity_id", referencedColumnName = "activity_id", insertable=false, updatable=false)
    private Activity activity;

    //activityName + seq
    private String courtName;

//    private Integer minimumPersonRequired;
//    private Integer maximumPersonRequired;
    private String courtFeatures;

    public Facility getFacility() {
        return null;
    }

}
