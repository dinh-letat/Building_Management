# Apartment Service #

## Function ##

    - Add, update, delete and apartment infomation.
    - State management for apartment: vacant, occupied, under_repair.
    - Track each apartment in detail: area, number of rooms, rental/sale price, etc.

## Database ##

    Apartments(
        apartment_id varchar(20) PRIMARY KEY,
        apaerment_name varchar(255),
        area DECIMAL(10, 2),
        number_of_rooms INT,
        price DECIMAL(10, 2),
        status ENUM('vacant', 'occupied', 'under_repair'),
        created_at TIMESTAMP,
        updated_at TIMESTAMP
    )

##  Swagger API  ##

[apartment-service-swagger-api](https://github.com/dinh-letat/Building_Management/blob/main/building_management_modal_script/apartment-service-swagger-api.png)