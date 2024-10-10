package com.microservice.resident_service.dto;

import com.microservice.resident_service.model.Vehicle;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ResidentRequest {
    private String resident_name;
    private String phone_number;
    private String email;
    private LocalDate birthday;
    private List<Vehicle> vehicles;
}
