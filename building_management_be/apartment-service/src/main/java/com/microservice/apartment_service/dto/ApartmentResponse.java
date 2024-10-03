package com.microservice.apartment_service.dto;

import com.microservice.apartment_service.model.Apartment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApartmentResponse {
    private List<Apartment> apartments;
    private int total;
}
