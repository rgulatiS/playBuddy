package com.happy.buddy.entities;


import com.happy.buddy.enums.ActivityType;
import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "activity", uniqueConstraints = @UniqueConstraint(columnNames =
        { "activity_name", "activity_type" }))
public class Activity extends BaseFields {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "activity_id")
    private Long activityId;

    private String activityName;
    private ActivityType activityType;
    private String description;

    public Activity(String activityName, ActivityType activityType, String description) {
        this.activityName = activityName;
        this.activityType = activityType;
        this.description = description;
    }
}
