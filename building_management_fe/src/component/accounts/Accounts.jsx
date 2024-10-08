import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import { ReactNotifications, Store } from 'react-notifications-component';
import Pagination from 'react-bootstrap/Pagination';
import 'react-notifications-component/dist/theme.css';

const Accounts = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [accounts, setAccounts] = useState([]);
    const [newResident, setNewResident] = useState({
        resident_name: "",
        email: "",
        phone_number: "",
        birthday: "",
        move_in_date: "",
        move_out_date: ""
    });

    useEffect(() => {
        getAccounts();
    }, []);

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
                Store.addNotification({
                    title: "Thêm thành công!",
                    message: data.message || "An error occurred while trying to log in.",
                    type: "success", // màu đỏ cho lỗi
                    insert: "top",
                    container: "top-left",
                    dismiss: {
                        duration: 5000, // Tự động tắt sau 3 giây
                        onScreen: true
                    }
                });
                console.log('Resident created successfully', data);
                setAccounts([...accounts, data]); // Add the new resident to the list
                handleClose(); // Close the modal after successful creation

            } else {
                console.error('Failed to create resident:', data.message);
                Store.addNotification({
                    title: "Thêm không thành công!",
                    message: data.message || "Nhập đúng chính xác các trường",
                    type: "warning", // màu đỏ cho lỗi
                    insert: "top",
                    container: "top-left",
                    dismiss: {
                        duration: 5000, // Tự động tắt sau 3 giây
                        onScreen: true
                    }
                });
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };

    // get residents api
    const getAccounts = async () => {
        try {
            const response = await fetch('http://localhost:8905/api/auth', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                setAccounts(data);
                console.log('Fetched accounts:', data);
            } else {
                console.error('Failed to fetch accounts:', data.message);
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
    return (
        <div className='accounts'
            style={{ height: '93vh' }}>
            <ReactNotifications />
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h3 className='m-0'>Danh Sách Tài Khoản</h3>
                <Button onClick={handleShow}>Đăng ký tài khoản mới</Button>
            </div>

            <div className="table-content bg-white m-3 p-3">
                <div className="func-table d-flex justify-content-between align-items-center py-3">
                    <div className="select-group">
                        Hiển thị
                        <select name="" id="" className='mx-2'>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        mục
                    </div>
                </div>

                <Table hover striped bordered className='w-100 text-center'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account, id) => (
                            <tr key={id}>
                                <td>{account.email}</td>
                                <td>{account.role}</td>
                                <td className='d-flex justify-content-around align-items-center'>
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
                    <Modal.Title>Thêm mới tài khoản</Modal.Title>
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

            {/* Panigation */}
            <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </div>
    )
}

export default Accounts
