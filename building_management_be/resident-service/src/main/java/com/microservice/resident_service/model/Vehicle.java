package com.microservice.resident_service.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity(name = "Vehicle")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "vehicle_id")
    private String vehicle_id;

    @Column(name = "vehicle_name")
    @NotBlank(message = "Tên không được để trống")
    private String vehicle_name;

    @Column(name = "license_plate")
    @NotBlank(message = "Biển số xe không được để trống")
    private String license_plate;

    @Column(name = "vehicle_type")
    @NotBlank(message = "Loại xe không được để trống")
    private String vehicle_type;

    @Column(name = "color")
    @NotBlank(message = "Màu xe không được để trống")
    private String color;

    @ManyToOne
    @JoinColumn(name = "resident_id")
    @JsonBackReference
    private Resident resident;

}
