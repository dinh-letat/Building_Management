# Resident Service #

## Function ##

    - Add, update, delete and resident infomation.
    - Add, update, delete and vehicle infomation.
    - Swagger API
    
## Database ##

    Residents(
        resident_id INT AUTO_INCREMENT PRIMARY KEY,
        resident_name VARCHAR(100) NOT NULL,
        phone_number VARCHAR(15) NOT NULL,
        email VARCHAR(100) NOT NULL,
        birthday TIMESTAMP,
        move_in_date TIMESTAMP,
        move_out_date TIMESTAMP,
    )    

    Vehicle(
        vehicle_id INT AUTO_INCREMENT PRIMARY KEY,
        vehicle_name VARCHAR(100) NOT NULL,
        license_plate VARCHAR(200 NOT NULL,
        vehicle_type VARCHAR(100) NOT NULL,
        color VARCHAR(55) 
        owner VARCHAR(100)
    )