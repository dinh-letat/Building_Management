package com.microservice.apartment_service.service;

import com.microservice.apartment_service.model.Apartment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ApartmentService {

    List<Apartment> getAllApartments();

    Apartment getApartmentById(Integer apartment_id);

    Apartment saveApartment(Apartment apartment);

    Apartment updateApartmentById(Integer apartment_id, Apartment updateApartment);

    void deleteApartmentById(Integer apartment_id);

}
