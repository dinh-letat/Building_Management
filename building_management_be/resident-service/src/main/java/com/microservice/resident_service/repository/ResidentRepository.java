package com.microservice.resident_service.repository;

import com.microservice.resident_service.model.Resident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResidentRepository extends JpaRepository<Resident, Integer> {

}
