package com.microservice.apartment_service.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity(name = "Apartments")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Apartment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "apartment_id")
    private int apartment_id;

    @Column(name = "apartment_name")
    @NotBlank(message = "Tên căn hộ không được để trống")
    private String apartment_name;

    @Column(name = "area")
    @NotBlank(message = "Diện tích không được để trống")
    private double area;

    @Column(name = "number_of_room")
    @NotBlank(message = "Nhập số căn hộ")
    private int number_of_room;

    @Column(name = "price")
    @NotBlank(message = "Nhập đầy đủ giá căn hộ")
    private double price;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "create_at")
    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd' 'HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Timestamp create_at;

    @Column(name = "update_at")
    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd' 'HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Timestamp update_at;

    public enum Status{
        VACANT, OCCUPIED, UNDER_REPAIR;
    }
}
