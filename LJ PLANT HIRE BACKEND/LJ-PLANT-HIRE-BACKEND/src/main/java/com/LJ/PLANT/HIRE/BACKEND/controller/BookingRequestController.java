package com.LJ.PLANT.HIRE.BACKEND.controller;

import com.LJ.PLANT.HIRE.BACKEND.dto.BookingRequestDto;
import com.LJ.PLANT.HIRE.BACKEND.model.BookingRequest;
import com.LJ.PLANT.HIRE.BACKEND.repository.BookingRequestRepository;
import com.LJ.PLANT.HIRE.BACKEND.service.BookingRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingRequestController {

    @Autowired
    private BookingRequestService bookingRequestService;

    @PostMapping
    public ResponseEntity<BookingRequest> create(@Valid @RequestBody BookingRequestDto dto) {
        BookingRequest saved = bookingRequestService.createBooking(dto);
        return ResponseEntity.ok(saved);
    }
}