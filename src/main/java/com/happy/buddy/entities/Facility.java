package com.happy.buddy.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@ToString
@Entity
@Table(name = "facility")
public class Facility {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "facility_id")
    private Long facilityId;

    private String facilityName;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="facility_address_id", referencedColumnName = "address_id")
    private Address facilityAddress;

    @OneToMany(mappedBy = "facility")
    private Set<Court> courts;


    private String facilityPocPhone;

    private String facilityPocEmail;

    @NonNull
    private String facilityOwnerPhone;

    @NonNull
    private String facilityOwnerEmail;

    private String facilityPocName;
    private String facilityOwnerName;

    private boolean isActive;
    private LocalDate registeredOn;

}