package com.microservice.resident_service.service.serviceimpl;

import com.microservice.resident_service.model.Resident;
import com.microservice.resident_service.repository.ResidentRepository;
import com.microservice.resident_service.service.ResidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ResidentServiceImple implements ResidentService  {

    @Autowired
    private ResidentRepository residentRepository;

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
    public Resident saveResident(Resident resident) {
        return residentRepository.save(resident);
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
