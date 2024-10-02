import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap';

const Resident = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [residents, setResidents] = useState([]);
    const [newResident, setNewResident] = useState({
        resident_name: "",
        email: "",
        phone_number: "",
        birthday: "",
        move_in_date: "",
        move_out_date: ""
    });

    useEffect(() => {
        getResidents();
    }, []);

    // get residents api
    const getResidents = async () => {
        try {
            const response = await fetch('http://localhost:8908/api/residents', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                setResidents(data);
                console.log('Fetched residents:', data);
            } else {
                console.error('Failed to fetch residents:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // create new resident api
    const createResident = async (residentData) => {
        try {
            const response = await fetch('http://localhost:8908/api/residents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(residentData),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Resident created successfully', data);
                setResidents([...residents, data]); // Add the new resident to the list
                handleClose(); // Close the modal after successful creation
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
        setNewResident((prevResident) => ({
            ...prevResident,
            [name]: value,
        }));
    };

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        createResident(newResident); // Pass the new resident data to the API
    };

    const residentDetails = () => {

    }

    return (
        <div className='resident'>
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h3 className='m-0'>Danh Sách Cư Dân</h3>
                <Button onClick={handleShow}>Thêm mới</Button>
            </div>

            <div className="table-content bg-white m-3 p-3">
                <div className="func-table d-flex justify-content-between align-items-center py-3">
                    <div className="select-group">
                        Hiển thị
                        <select name="" id="" className='mx-2'>
                            <option value="">10</option>
                            <option value="">20</option>
                            <option value="">30</option>
                            <option value="">50</option>
                        </select>
                        mục
                    </div>
                </div>

                <Table hover striped bordered className='w-100 text-center'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ Tên</th>
                            <th>Email</th>
                            <th>Số Điện Thoại</th>
                            <th>Ngày Sinh</th>
                            <th>Ngày Đăng Ký Nhận Phòng</th>
                            <th>Ngày Huỷ</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {residents.map((resident, id) => (
                            <tr key={id}>
                                <td>{id + 1}</td>
                                <td>{resident.resident_name}</td>
                                <td>{resident.email}</td>
                                <td>{resident.phone_number}</td>
                                <td>{resident.birthday}</td>
                                <td>{resident.move_in_date}</td>
                                <td>{resident.move_out_date}</td>
                                <td className='d-flex justify-content-around align-items-center'>
                                    <Button variant='secondary' onClick={residentDetails}>Xem</Button>
                                    <Button variant="warning" onClick={handleClose}> Sửa</Button>
                                    <Button variant="danger" type="submit">Xoá</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Modal to add resident */}
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm mới cư dân</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Họ Tên</Form.Label>
                            <Form.Control
                                type="text"
                                name='resident_name'
                                value={newResident.resident_name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name='email'
                                value={newResident.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Số Điện Thoại</Form.Label>
                            <Form.Control
                                type="text"
                                name='phone_number'
                                value={newResident.phone_number}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ngày Sinh</Form.Label>
                            <Form.Control
                                type="date"
                                name='birthday'
                                value={newResident.birthday}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ngày Đăng Ký Nhận Phòng</Form.Label>
                            <Form.Control
                                type="date"
                                name='move_in_date'
                                value={newResident.move_in_date}
                                onChange={handleChange}
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" type="submit">
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Resident;
