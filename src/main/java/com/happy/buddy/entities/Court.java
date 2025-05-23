package com.happy.buddy.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.happy.buddy.enums.ActivityType;
import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@ToString
@Entity
@Table(name = "court")
@AllArgsConstructor
@NoArgsConstructor
public class Court extends BaseFields {


    @EmbeddedId
    private CourtPk id;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "activity_id", referencedColumnName = "activity_id", insertable = false, updatable = false)
    private Activity activity;


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "facility_id", referencedColumnName = "facility_id", insertable = false, updatable = false)
    @JsonBackReference
    private Facility facility;

    //activityName + seq
    private String courtName;

    //    private Integer minimumPersonRequired;
//    private Integer maximumPersonRequired;
    private String courtPriceForOneHour;
    private String courtPriceForTwoHours;
    private String courtPriceForFourHours;
    private String courtPriceForFullDay;

    private boolean isLessPlayerDiscountAvailable;
    private Integer lessPlayerDiscountInPercent;

    private String courtFeatures;


}
