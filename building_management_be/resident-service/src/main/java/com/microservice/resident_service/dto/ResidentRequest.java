package com.microservice.resident_service.dto;

import com.microservice.resident_service.model.Vehicle;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResidentRequest {
    private String resident_name;
    private String phone_number;
    private String email;
    private LocalDate birthday;
    private List<Vehicle> vehicles;
}
