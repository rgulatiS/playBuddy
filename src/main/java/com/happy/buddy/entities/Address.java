package com.happy.buddy.entities;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;


@Setter
@Getter
@ToString
@Entity
@Table(name ="address")
public class Address extends BaseFields{

    @Id
    @UuidGenerator
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "address_id")
    private UUID addressId;

    private String addressType;
    private String gpsLocation;
    private String buildingNo;
    private String addressLine1;
    private String addressLine2;
    private String street;
    private String city;
    private String state;
    private String zip;
    private String country;


}
