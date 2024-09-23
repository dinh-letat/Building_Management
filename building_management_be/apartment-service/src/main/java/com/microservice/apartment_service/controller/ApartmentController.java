package com.microservice.apartment_service.controller;

import com.microservice.apartment_service.model.Apartment;
import com.microservice.apartment_service.service.ApartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/apartments")
@CrossOrigin(origins = "http://localhost:3000" + "https://center-building.vercel.app/")
@Slf4j
public class ApartmentController {

    @Autowired
    private ApartmentService apartmentService;

    @GetMapping("")
    public ResponseEntity<List<Apartment>> getApartments(){
        try {
            List<Apartment> apartments = apartmentService.getAllApartments();
            log.info("List all apartment successfully!");
            return new ResponseEntity<>(apartments, HttpStatus.FOUND);
        } catch (Exception e){
            log.warn("Không tìm thấy dữ liệu!" + e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{apartment_id}")
    public ResponseEntity<Apartment> getApartmentById(@PathVariable("apartment_id") Integer apartment_id){
        try {
            Apartment apartment = apartmentService.getApartmentById(apartment_id);
            log.info("Found apartment has id " + apartment_id);
            return new ResponseEntity<>(apartment, HttpStatus.FOUND);
        } catch (Exception e){
            log.warn("Không tìm thấy dữ liệu!");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<Apartment> createApartment(@RequestBody Apartment apartment){
        try {
            Apartment newApartment = apartmentService.saveApartment(apartment);
            log.info("Create new apartment successfully!");
            return new ResponseEntity<>(newApartment, HttpStatus.CREATED);
        } catch (Exception e){
            log.error("Create new apartment has error!");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{apartment_id}")
    public ResponseEntity<Apartment> updateApartent(@PathVariable("apartment_id") Integer apartment_id, Apartment updateApartment){
        try {
            Apartment apartment = apartmentService.updateApartmentById(apartment_id, updateApartment);
            log.info("Update has successfully!");
            return new ResponseEntity<>(apartment, HttpStatus.FOUND);
        } catch (Exception e) {
            log.error("Update has error!");
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{apartment_id}")
    public ResponseEntity<String> deleteTask(@PathVariable("apartment_id") Integer apartment_id){
        try {
            apartmentService.deleteApartmentById(apartment_id);
            log.info("Delete has successfully!");
            return new ResponseEntity<>("Deleted!", HttpStatus.OK);
        } catch (Exception e) {
            // TODO: handle exception
            log.error("Delete has error");
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
