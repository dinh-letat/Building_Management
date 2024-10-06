package com.microservice.apartment_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@SpringBootApplication
@EnableDiscoveryClient
public class ApartmentServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApartmentServiceApplication.class, args);
	}

}
