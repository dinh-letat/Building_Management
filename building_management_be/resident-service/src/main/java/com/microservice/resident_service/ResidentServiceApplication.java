package com.microservice.resident_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ResidentServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ResidentServiceApplication.class, args);
	}

}
