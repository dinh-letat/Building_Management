package com.microservice.resident_service.controller;

import com.microservice.resident_service.dto.ResidentRequest;
import com.microservice.resident_service.model.Resident;
import com.microservice.resident_service.model.Vehicle;
import com.microservice.resident_service.service.ResidentService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/residents")
//@Slf4j
public class ResidentController {

    @Autowired
    private static Logger log = LoggerFactory.getLogger(ResidentController.class);

    @Autowired
    private ResidentService residentService;

    @GetMapping("")
    public ResponseEntity<List<Resident>> getResidents(){
        try {
            List<Resident> residents = residentService.getAllResident();
            log.info("List all resident has successfully!");
            return new ResponseEntity<>(residents, HttpStatus.OK);
        } catch (Exception e){
            log.info("Không tìm thấy dữ liệu" + e);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{resident_id}")
    public ResponseEntity<Resident> getResidentById(@PathVariable("resident_id") Integer resident_id){
        try {
            Resident resident = residentService.getResidentById(resident_id);
            log.info("Found resident has id: " + resident_id);
            return new ResponseEntity<>(resident, HttpStatus.OK);
        } catch (Exception e) {
            log.warn("Không tìm thấy dữ liệu hoặc đường dẫn không đúng!");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> createNewResident(@Valid @RequestBody ResidentRequest residentRequest) {
        try {
            Resident resident = new Resident();
            resident.setResident_name(residentRequest.getResident_name());
            resident.setPhone_number(residentRequest.getPhone_number());
            resident.setEmail(residentRequest.getEmail());
            resident.setBirthday(residentRequest.getBirthday());

            List<Vehicle> vehicles = residentRequest.getVehicles();

            // Check for null or empty vehicle list
            if (vehicles != null && !vehicles.isEmpty()) {
                resident.setVehicles(vehicles);  // Set vehicles in the resident if available
            }

            // Save resident and vehicles
            Resident savedResident = residentService.addResidentWithVehicles(resident, vehicles);
            log.info("Resident '{}' and Vehicles added successfully", resident.getResident_name());

            // Return the created resident with HTTP 201 status
            return new ResponseEntity<>(savedResident, HttpStatus.CREATED);
        } catch (Exception e) {
            log.warn("Tạo mới không thành công, vui lòng thử lại! " + e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{resident_id}")
    public ResponseEntity<Resident>  updateResident(@Valid @PathVariable("resident_id") Integer resident_id, Resident updateResident){
        try {
            Resident resident = residentService.updateResidentById(resident_id, updateResident);
            log.info("Update new resident completed!");
            return new ResponseEntity<>(resident, HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{resident_id}")
    public ResponseEntity<String> deleteResident(@PathVariable("resident_id") Integer resident_id) {
        try {
            residentService.deleteResidentById(resident_id);
            log.info("Delete resident with id: " + resident_id + " successfully!");
            return new ResponseEntity<>("Deleted!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
