package com.happy.buddy.repositories;

import com.happy.buddy.entities.Buddy;
;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface BuddyRepository extends JpaRepository<Buddy, UUID> {

    Optional<Buddy> findByPhone(String phoneNumber);
}
