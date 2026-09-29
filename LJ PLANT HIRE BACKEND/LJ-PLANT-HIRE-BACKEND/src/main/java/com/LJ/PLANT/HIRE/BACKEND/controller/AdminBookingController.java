package com.LJ.PLANT.HIRE.BACKEND.controller;

import com.LJ.PLANT.HIRE.BACKEND.dto.UpdateStatusDto;
import com.LJ.PLANT.HIRE.BACKEND.model.BookingRequest;
import com.LJ.PLANT.HIRE.BACKEND.repository.BookingRequestRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/bookings")
public class AdminBookingController {

    @Autowired
    private BookingRequestRepository bookingRequestRepository;

    @GetMapping
    public List<BookingRequest> getAll() {
        return bookingRequestRepository.findAll();
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<BookingRequest> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStatusDto dto) {

        return bookingRequestRepository.findById(id)
                .map(booking -> {
                    booking.setStatus(dto.getStatus());
                    return ResponseEntity.ok(bookingRequestRepository.save(booking));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!bookingRequestRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        bookingRequestRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}