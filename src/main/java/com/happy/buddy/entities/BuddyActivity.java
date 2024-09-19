package com.happy.buddy.entities;

import com.happy.buddy.enums.ProficiencyLevel;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;
import java.util.UUID;


@Getter
@Setter
@Entity
@Data
@Table(name = "buddy_activity")
public class BuddyActivity {

    @Id
    @UuidGenerator
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "buddy_activity_id")
    private UUID buddyActivityId;

    

    @ManyToOne
    @JoinColumn(name="activity_id")
    private Activity activity;

    private ProficiencyLevel selfDeclaredProficiency;



}
