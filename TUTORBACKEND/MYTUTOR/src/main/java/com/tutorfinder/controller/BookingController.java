package com.tutorfinder.controller;

import com.tutorfinder.dto.BookingResponseDTO;
import com.tutorfinder.model.Booking;
import com.tutorfinder.model.TutorProfile;
import com.tutorfinder.model.User;
import com.tutorfinder.repository.BookingRepository;
import com.tutorfinder.repository.TutorProfileRepository;
import com.tutorfinder.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3002") // allow frontend
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TutorProfileRepository tutorProfileRepository;

    @Autowired
    private UserRepository userRepository;

    // Helper: convert Booking -> BookingResponseDTO
    private BookingResponseDTO convertToDTO(Booking booking) {
        User student = userRepository.findById(booking.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        TutorProfile tutorProfile = tutorProfileRepository.findByUserId(booking.getTutorId())
                .orElseThrow(() -> new RuntimeException("Tutor profile not found"));

        return new BookingResponseDTO(
                booking.getId(),
                student.getId(),
                student.getName(),
                student.getEmail(),
                student.getPhone(),
                tutorProfile.getUserId(),
                tutorProfile.getName(),
                booking.getStatus()
        );
    }

    // Create a booking
    @PostMapping("/book")
    public BookingResponseDTO createBooking(@RequestBody Booking booking) {
        if (booking.getStatus() == null) booking.setStatus("pending");
        Booking savedBooking = bookingRepository.save(booking);
        return convertToDTO(savedBooking);
    }

    // Get all bookings
    @GetMapping
    public List<BookingResponseDTO> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get bookings by tutor
    @GetMapping("/tutor/{tutorId}")
    public List<BookingResponseDTO> getTutorBookings(@PathVariable("tutorId") Long tutorId) {
        return bookingRepository.findByTutorId(tutorId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get bookings by student
    @GetMapping("/student/{studentId}")
    public List<BookingResponseDTO> getStudentBookings(@PathVariable("studentId") Long studentId) {
        return bookingRepository.findByStudentId(studentId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
 // Update booking status (Accept / Decline)
    @PutMapping("/{bookingId}")
    public BookingResponseDTO updateBookingStatus(
            @PathVariable("bookingId") Long bookingId,
            @RequestBody Booking requestBody
    ) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (requestBody.getStatus() != null) {
            booking.setStatus(requestBody.getStatus());
        }

        Booking updated = bookingRepository.save(booking);
        return convertToDTO(updated);
    }

    // Delete booking
    @DeleteMapping("/{bookingId}")
    public String deleteBooking(@PathVariable("bookingId") Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        bookingRepository.delete(booking);
        return "Booking deleted successfully";
    }
}
