package com.tutorfinder.controller;

import com.tutorfinder.dto.TutorProfileDTO;
import com.tutorfinder.model.TutorProfile;
import com.tutorfinder.model.User;
import com.tutorfinder.service.TutorProfileService;
import com.tutorfinder.service.UserService;
import com.tutorfinder.repository.TutorProfileRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tutors/profile")
@CrossOrigin(origins = "http://localhost:5173")
public class TutorProfileController {

    @Autowired
    private TutorProfileService tutorProfileService;

    // ✅ Inject UserService
    @Autowired
    private UserService userService;

    // ✅ Inject TutorProfileRepository
    @Autowired
    private TutorProfileRepository tutorProfileRepository;

    @PostMapping("/{userId}")
    public ResponseEntity<TutorProfileDTO> saveOrUpdateProfile(
            @PathVariable("userId") Long userId, @RequestBody TutorProfile profile) {
        tutorProfileService.saveOrUpdateProfile(userId, profile);
        return ResponseEntity.ok(tutorProfileService.getProfileWithUserInfo(userId));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<TutorProfileDTO> getProfile(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(tutorProfileService.getProfileWithUserInfo(userId));
    }
    
    // ✅ Get all tutors with profiles
    @GetMapping("/all")
    public ResponseEntity<List<Map<String, Object>>> getAllTutorsWithProfiles() {
        List<User> tutors = userService.getAllTutors(); // fetch tutors from users

        List<Map<String, Object>> tutorDetails = tutors.stream().map(tutor -> {
            TutorProfile profile = tutorProfileRepository.findByUserId(tutor.getId()).orElse(null);

            Map<String, Object> tutorData = new HashMap<>();
            tutorData.put("id", tutor.getId());
            tutorData.put("name", tutor.getName());
            tutorData.put("email", tutor.getEmail());
            tutorData.put("phone", tutor.getPhone());
            tutorData.put("qualification", tutor.getQualification());
            tutorData.put("role", tutor.getRole());

            if (profile != null) {
                tutorData.put("subjects", profile.getSubjects());
                tutorData.put("experience", profile.getExperience());
                tutorData.put("bio", profile.getBio());
                tutorData.put("hourly_rate", profile.getHourlyRate());
                tutorData.put("location", profile.getLocation());
                tutorData.put("availability", profile.getAvailability());
            }

            return tutorData;
        }).toList();

        return ResponseEntity.ok(tutorDetails);
    }
}