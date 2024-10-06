package com.microservice.resident_service.service.serviceimpl;

import com.microservice.resident_service.model.Resident;
import com.microservice.resident_service.model.Vehicle;
import com.microservice.resident_service.repository.ResidentRepository;
import com.microservice.resident_service.repository.VehicleRepository;
import com.microservice.resident_service.service.ResidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResidentServiceImple implements ResidentService  {

    @Autowired
    private ResidentRepository residentRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public List<Resident> getAllResident() {
        return residentRepository.findAll();
    }

    @Override
    public Resident getResidentById(Integer resident_id) {
        return residentRepository.findById(resident_id).orElseThrow(
                () -> new RuntimeException("Not found resident has id: " + resident_id)
        );
    }


    @Override
    public Resident addResidentWithVehicles(Resident resident, List<Vehicle> vehicles) {
        // Assign the resident to each vehicle
        if (vehicles != null) {
            for (Vehicle vehicle : vehicles) {
                vehicle.setResident(resident);  // Link vehicle to resident
            }
        }

        resident.setVehicles(vehicles);  // Set vehicles in the resident
        Resident savedResident = residentRepository.save(resident);  // Save the resident and cascade save vehicles

        return savedResident;  // Return the saved resident
    }

    @Override
    public Resident updateResidentById(Integer resident_id, Resident updateResident) {
        Resident resident = residentRepository.findById(resident_id).orElseThrow(
                () -> new RuntimeException("Not found resident has id: " + resident_id)
        );

        resident.setResident_name(updateResident.getResident_name());
        resident.setEmail(updateResident.getEmail());
        resident.setPhone_number(updateResident.getPhone_number());
        resident.setBirthday(updateResident.getBirthday());

        return residentRepository.save(resident);
    }

    @Override
    public void deleteResidentById(Integer resident_id) {
        Optional<Resident> resident = residentRepository.findById(resident_id);
        if (resident.isPresent()) {
            residentRepository.deleteById(resident_id);
        } else {
            throw new RuntimeException("Resident với id " + resident_id + " không tồn tại!");
        }
    }
}
