package com.microservice.apartment_service.service.serviceimpl;

import com.microservice.apartment_service.dto.ApartmentResponse;
import com.microservice.apartment_service.model.Apartment;
import com.microservice.apartment_service.repository.ApartmentRepository;
import com.microservice.apartment_service.service.ApartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApartmentServiceImpl implements ApartmentService {

    @Autowired
    private ApartmentRepository apartmentRepository;
    @Override
    public ApartmentResponse getAllApartments() {
        List<Apartment> apartments = apartmentRepository.findAll();
        int total = apartments.size();
        return new ApartmentResponse(apartments, total);
    }

    @Override
    public Apartment getApartmentById(Integer apartment_id) {
        return apartmentRepository.findById(apartment_id).orElseThrow(
                () -> new RuntimeException("Not found apartment has id: " + apartment_id));
    }

    @Override
    public Apartment saveApartment(Apartment apartment) {
        return apartmentRepository.save(apartment);
    }
    
    @Override
    public Apartment updateApartmentById(Integer apartment_id, Apartment updateApartment) {
        Apartment apartment = apartmentRepository.findById(apartment_id).orElseThrow(
                () -> new RuntimeException("Not found apartment has id: " + apartment_id));

        apartment.setApartment_name(updateApartment.getApartment_name());
        apartment.setArea(updateApartment.getArea());
        apartment.setNumber_of_room(updateApartment.getNumber_of_room());
        apartment.setPrice(updateApartment.getPrice());
        apartment.setStatus(updateApartment.getStatus());

        return apartmentRepository.save(apartment);
    }

    @Override
    public void deleteApartmentById(Integer apartment_id) {
        apartmentRepository.deleteById(apartment_id);
    }
}
