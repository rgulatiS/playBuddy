package com.happy.buddy.repositories;


import com.happy.buddy.entities.Activity;
import com.happy.buddy.entities.Court;
import com.happy.buddy.entities.CourtPk;
import com.happy.buddy.entities.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CourtRepository extends JpaRepository<Court, CourtPk> {


    List<Court> findByIdFacilityIdAndIdActivityIdOrderByIdDesc(Long id_facilityId, Long id_activityId);

}
