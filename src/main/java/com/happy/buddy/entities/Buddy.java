package com.happy.buddy.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.happy.buddy.enums.Gender;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "buddy", uniqueConstraints = { @UniqueConstraint(columnNames = { "email", "phone" }) })
@Getter
@Setter
@ToString
public class Buddy {

    @Id
    @UuidGenerator
    @Column(name = "buddy_id")
    private UUID buddyId;
    private String buddyName;

    @Column
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime buddyDob;
    private Gender gender;


    private String email;
    private String phone;

    private String emergencyContact;
    private String emergencyContactPhone;
    private String emergencyContactEmail;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_buddy_id", referencedColumnName = "buddy_id")
    private List<BuddyActivity> buddyActivities;

//    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
//    @JoinTable(
//            name = "activity",
//            joinColumns = @JoinColumn(name = "buddyId"),
//            inverseJoinColumns = @JoinColumn(name = "activityId"))
//    private List<Activity> activities;


}
