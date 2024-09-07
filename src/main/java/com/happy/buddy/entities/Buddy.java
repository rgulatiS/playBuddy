package com.happy.buddy.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.happy.buddy.enums.Gender;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "buddy")
@Getter
@Setter
@ToString
public class Buddy {

    @Id
    @UuidGenerator
    private UUID buddyId;
    private String buddyName;

    @Column
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime buddyDob;
    private Gender gender;

    private String address;
    private String city;
    private String state;
    private String country;
    private Integer pinCode;

    private String email;
    private String phone;

    private String emergencyContact;
    private String emergencyContactPhone;
    private String emergencyContactEmail;




}
