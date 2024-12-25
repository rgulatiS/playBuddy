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
@Table(name = "activity")
public class Activity extends BaseFields {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "activity_id")
    private Long activityId;

    private String activityName;
    private ActivityType activityType;
    private String description;


}
