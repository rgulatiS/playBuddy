package com.happy.buddy.entities;


import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public class BaseFields {

//    @ColumnDefault(value="CURRENT_TIMESTAMP")
//    @Generated(GenerationTime.INSERT)
//    private Date createdAt;
//
//    @CreationTimestamp
//    private Date updatedAt;

    @CreationTimestamp(source = SourceType.DB)
    private Timestamp createdOn;
    @UpdateTimestamp(source = SourceType.DB)
    private Instant lastUpdatedOn;

    private String createdBy;
    private String updatedBy;
    private boolean isDeleted;

}
