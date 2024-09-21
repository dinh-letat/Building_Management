package com.microservice.apartment_service.controller;

import com.microservice.apartment_service.model.Apartment;
import com.microservice.apartment_service.service.ApartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/apartments")
@CrossOrigin(origins = "http://localhost:3000")
public class ApartmentController {

    @Autowired
    private ApartmentService apartmentService;

    @GetMapping("")
    public ResponseEntity<List<Apartment>> getApartments(){
        List<Apartment> apartments = apartmentService.getAllApartments();
        return new ResponseEntity<>(apartments, HttpStatus.FOUND);
    }

    @GetMapping("/{apartment_id}")
    public ResponseEntity<Apartment> getApartmentById(@PathVariable("apartment_id") Integer apartment_id){
        Apartment apartment = apartmentService.getApartmentById(apartment_id);
        return new ResponseEntity<>(apartment, HttpStatus.FOUND);
    }

    @PostMapping("")
    public ResponseEntity<Apartment> createApartment(@RequestBody Apartment apartment){
        Apartment newApartment = apartmentService.saveApartment(apartment);
        return new ResponseEntity<>(newApartment, HttpStatus.CREATED);
    }

    @PutMapping("/{apartment_id}")
    public ResponseEntity<Apartment> updateApartent(@PathVariable("apartment_id") Integer apartment_id, Apartment updateApartment){
        Apartment apartment = apartmentService.updateApartmentById(apartment_id, updateApartment);
        return new ResponseEntity<>(apartment, HttpStatus.FOUND);
    }

    @DeleteMapping("/{apartment_id}")
    public ResponseEntity<String> deleteTask(@PathVariable("apartment_id") Integer apartment_id){
        try {
            apartmentService.deleteApartmentById(apartment_id);
            return new ResponseEntity<>("Deleted!", HttpStatus.OK);
        } catch (Exception e) {
            // TODO: handle exception
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
