package com.happy.buddy.repositories;

import com.happy.buddy.entities.BuddyActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BuddyActivityRepository extends JpaRepository<BuddyActivity, UUID> {
}
