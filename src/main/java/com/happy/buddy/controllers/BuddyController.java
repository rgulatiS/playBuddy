package com.happy.buddy.controllers;

import com.happy.buddy.entities.Buddy;
import com.happy.buddy.repositories.BuddyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/buddy")
public class BuddyController {

    @Autowired
    private BuddyRepository buddyRepository;

    public BuddyController() {}

    @GetMapping("{id}")
    public Buddy getBuddy(@PathVariable String id){
        return buddyRepository.findById(UUID.fromString(id)).orElse(new Buddy());
    }

    @GetMapping
    public List<Buddy> getAllBuddy(){
        return (List<Buddy>) buddyRepository.findAll();
    }

    @PostMapping
    public UUID addBuddy(@RequestBody  Buddy buddy){
        //basic validation before save
        return buddyRepository.save(buddy).getBuddyId();
    }
}
