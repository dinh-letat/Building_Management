import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap';

const Apartments = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [apartments, setApartments] = useState([]);
    const [newApartment, setNewApartment] = useState({
        apartment_name: "",
        area: "",
        number_of_room: "",
        price: "",
        status: "VACANT",
        create_at: new Date().toISOString().slice(0, 19).replace('T', ' '), // Tạo giá trị cho create_at,
        update_at: null
    });


    const getApartments = () => {
        try {
            fetch('http://localhost:8909/api/apartments')
                .then(res => res.json())
                .then(data => setApartments(data))
        } catch (err) {
            console.error("Error fetching products:", err)
        }
    }

    useEffect(() => {
        getApartments();
    }, []);

    // create new resident api
    const createResident = async (apartmentData) => {
        try {
            const response = await fetch('http://localhost:8909/api/apartments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apartmentData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Resident created successfully', data);
                setApartments([...apartments, data]); // Add the new resident to the list
                handleClose(); // Close the modal after successful creation
                getApartments();
            } else {
                console.error('Failed to create resident:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewApartment((prevApartment) => ({
            ...prevApartment,
            [name]: value,
        }));
    };

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        createResident(newApartment); // Pass the new resident data to the API
    };

    // delete apartment by id
    const deleteApartmentById = async (id) => {
        try {
            const response = await fetch(`http://localhost:8909/api/apartments/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Apartment deleted successfully');
                getApartments(); // Cập nhật lại danh sách căn hộ sau khi xóa
            } else {
                const errorData = await response.json();
                console.error('Failed to delete apartment:', errorData.message);
            }
        } catch (error) {
            console.error('Error deleting apartment:', error);
        }
    };


    const [itemsPerPage, setItemsPerPage] = useState(10);
    const handleItemsPerPageChange = (e) => {
        const value = e.target.value;
        setItemsPerPage(value);
        // Gọi lại API để lấy căn hộ với số lượng hiển thị tương ứng, nếu cần
        getApartments(); // Thay đổi hàm này nếu có truyền tham số vào API
    };

    return (
        <div className='vehicle'>
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h3 className='m-0'>Danh Sách Căn Hộ</h3>
                <Button onClick={handleShow}>Thêm mới</Button>
            </div>

            <div className="table-content bg-white m-3 p-3">
                <div className="func-table d-flex justify-content-between align-items-center py-3">
                    <div className="select-group">
                        Hiển thị
                        <select name="" id="" className='mx-2'
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}>
                            <option value="{10}">10</option>
                            <option value="{20}">20</option>
                            <option value="{30}">30</option>
                            <option value="{50}">50</option>
                            <option value="{100}">100</option>
                        </select>
                        mục
                    </div>
                </div>

                <Table hover striped bordered className='w-100 text-center'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên Căn Hộ</th>
                            <th>Diện Tích</th>
                            <th>Số Phòng</th>
                            <th>Giá</th>
                            <th>Trạng Thái</th>
                            <th>Ngày Tạo</th>
                            <th>Ngày Cập Nhật</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apartments.map((apartment, id) => (
                            <tr key={id}>
                                <td>{id + 1}</td>
                                <td>{apartment.apartment_name}</td>
                                <td>{apartment.area}</td>
                                <td>{apartment.number_of_room}</td>
                                <td>{apartment.price}</td>
                                <td>{apartment.status}</td>
                                <td>{apartment.create_at}</td>
                                <td>{apartment.update_at}</td>
                                <td className='d-flex justify-content-around align-items-center'>
                                    <Button variant="secondary">Xem</Button>
                                    <Button variant="warning" onClick={handleClose}> Sửa</Button>
                                    <Button variant="danger" onClick={() => deleteApartmentById(apartment.apartment_id)}>Xoá</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Modal to add resident */}
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Mới Căn Hộ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên Căn Hộ</Form.Label>
                            <Form.Control
                                type="text"
                                name='apartment_name'
                                value={newApartment.apartment_name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Diện Tích</Form.Label>
                            <Form.Control
                                type="number"
                                name='area'
                                value={newApartment.area}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Số Phòng</Form.Label>
                            <Form.Control
                                type="number"
                                name='number_of_room'
                                value={newApartment.number_of_room}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Giá</Form.Label>
                            <Form.Control
                                type="number"
                                name='price'
                                value={newApartment.price}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Trạng Thái</Form.Label>
                            <Form.Select
                                name="status"
                                value={newApartment.status}
                                onChange={handleChange}
                            >
                                <option value="VACANT">Trống</option>
                                <option value="OCCUPIED">Đang sử dụng</option>
                                <option value="UNDER_REPAIR">Đang sửa chữa</option>
                            </Form.Select>
                        </Form.Group>


                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Apartments
