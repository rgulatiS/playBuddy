package com.happy.buddy.controllers;

import com.happy.buddy.entities.Buddy;
import com.happy.buddy.repositories.BuddyRepository;
import com.happy.buddy.services.BuddyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/buddy")
public class BuddyController {

    @Autowired
    private BuddyRepository buddyRepository;

    @Autowired
    private BuddyService buddyService;

    public BuddyController() {
    }

    @GetMapping("{id}")
    public Buddy getBuddy(@PathVariable String id) {
        return buddyRepository.findById(UUID.fromString(id)).orElse(new Buddy());
    }

    @GetMapping
    public List<Buddy> getAllBuddy() {
        return (List<Buddy>) buddyRepository.findAll();
    }

    @PostMapping
    public Buddy addBuddy(@RequestBody Buddy buddy) {
        //basic validation before save
        return buddyService.addBuddyWithAddressAndActivity(buddy);
    }

    @GetMapping("/phone/{phoneNumber}")
    public ResponseEntity<Buddy> getBuddyByPhoneNumber(@PathVariable String phoneNumber) {
        return buddyService.getBuddyByPhone(phoneNumber);
    }
}
