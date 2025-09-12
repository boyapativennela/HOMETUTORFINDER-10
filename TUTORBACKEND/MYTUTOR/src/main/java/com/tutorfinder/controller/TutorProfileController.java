package com.tutorfinder.controller;

import com.tutorfinder.model.TutorProfile;
import com.tutorfinder.service.TutorProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/tutors/profile")
@CrossOrigin(origins = "http://localhost:5173")  // allow frontend
public class TutorProfileController {

    @Autowired
    private TutorProfileService tutorProfileService;

    @PostMapping("/{userId}")
    public ResponseEntity<TutorProfile> createProfile(
            @PathVariable("userId") Long userId,
            @RequestBody TutorProfile profile
    ) {
        TutorProfile createdProfile = tutorProfileService.createProfile(userId, profile);
        return ResponseEntity.ok(createdProfile);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<TutorProfile> updateProfile(
            @PathVariable("userId") Long userId,
            @RequestBody TutorProfile profile
    ) {
        TutorProfile updatedProfile = tutorProfileService.updateProfile(userId, profile);
        return ResponseEntity.ok(updatedProfile);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<TutorProfile> getProfile(@PathVariable("userId") Long userId) {
        Optional<TutorProfile> profile = tutorProfileService.getProfile(userId);
        return profile.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}