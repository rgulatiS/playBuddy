package com.happy.buddy.repositories;


import com.happy.buddy.entities.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FacilityRepository extends JpaRepository<Facility, Long> {
}
