package com.LJ.PLANT.HIRE.BACKEND.repository;

import com.LJ.PLANT.HIRE.BACKEND.model.BookingRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRequestRepository extends JpaRepository<BookingRequest, Long> {
    boolean existsByReferenceToken(String referenceToken);
}
