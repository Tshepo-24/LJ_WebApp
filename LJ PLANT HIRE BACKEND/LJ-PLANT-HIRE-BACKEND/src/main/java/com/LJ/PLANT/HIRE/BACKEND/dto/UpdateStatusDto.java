package com.LJ.PLANT.HIRE.BACKEND.dto;

import com.LJ.PLANT.HIRE.BACKEND.model.BookingStatus;
import jakarta.validation.constraints.NotNull;

public class UpdateStatusDto {

    @NotNull(message = "Status is required")
    private BookingStatus status;

    public BookingStatus getStatus() { return status; }
    public void setStatus(BookingStatus status) { this.status = status; }
}