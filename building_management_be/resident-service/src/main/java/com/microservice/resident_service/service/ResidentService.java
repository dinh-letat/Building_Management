package com.microservice.resident_service.service;

import com.microservice.resident_service.model.Resident;
import com.microservice.resident_service.model.Vehicle;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ResidentService {

    List<Resident> getAllResident();

    Resident getResidentById(Integer resident_id);

//    Resident saveResident(Resident resident, List<Vehicle> vehicles);

    Resident addResidentWithVehicles(Resident resident, List<Vehicle> vehicles);

    Resident updateResidentById(Integer resident_id, Resident updateResident);

    void deleteResidentById(Integer resident_id);
}
