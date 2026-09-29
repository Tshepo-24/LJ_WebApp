package com.LJ.PLANT.HIRE.BACKEND.service;

import com.LJ.PLANT.HIRE.BACKEND.dto.BookingRequestDto;
import com.LJ.PLANT.HIRE.BACKEND.model.BookingRequest;
import com.LJ.PLANT.HIRE.BACKEND.model.Equipment;
import com.LJ.PLANT.HIRE.BACKEND.repository.BookingRequestRepository;
import com.LJ.PLANT.HIRE.BACKEND.repository.EquipmentRepository;
import com.LJ.PLANT.HIRE.BACKEND.util.ReferenceTokenGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookingRequestService {

    @Autowired
    private BookingRequestRepository bookingRequestRepository;

    @Autowired
    private EquipmentRepository equipmentRepository;

    public BookingRequest createBooking(BookingRequestDto dto) {
        Equipment equipment = equipmentRepository.findById(dto.getEquipmentId())
                .orElseThrow(() -> new RuntimeException("Equipment not found"));

        String token;
        do {
            token = ReferenceTokenGenerator.generate();
        } while (bookingRequestRepository.existsByReferenceToken(token));

        BookingRequest booking = new BookingRequest();
        booking.setEquipment(equipment);
        booking.setCustomerName(dto.getCustomerName());
        booking.setCustomerPhone(dto.getCustomerPhone());
        booking.setCustomerEmail(dto.getCustomerEmail());
        booking.setSiteLocation(dto.getSiteLocation());
        booking.setStartDate(dto.getStartDate());
        booking.setEndDate(dto.getEndDate());
        booking.setReferenceToken(token);

        return bookingRequestRepository.save(booking);
    }
}