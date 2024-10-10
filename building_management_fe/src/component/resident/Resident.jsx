import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Modal, Container } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import fetchURL from '../../api/AxiosInstance';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";

const Resident = () => {
    const [show, setShow] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Track if in edit mode
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newResident, setNewResident] = useState({
        resident_name: "",
        email: "",
        phone_number: "",
        birthday: "",
        move_in_date: "",
        vehicles: [{
            vehicle_name: "",
            license_plate: "",
            vehicle_type: "",
            color: ""
        }]
    });
    const [currentResidentId, setCurrentResidentId] = useState(null); // To store the resident ID for editing

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        fetchResidents();
    }, []);

    const fetchResidents = async () => {
        try {
            const response = await fetchURL('/api/residents');
            const data = response.data.map(resident => ({
                ...resident,
                birthday: formatDate(resident.birthday),
                move_in_date: formatDate(resident.move_in_date)
            }));
            setResidents(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle form submit
    const handleSubmits = (e) => {
        e.preventDefault();
        // Ensure date fields are formatted correctly before submitting
        const formattedResident = {
            ...newResident,
            birthday: formatDate(newResident.birthday),
            move_in_date: formatDate(newResident.move_in_date),
        };
        handleResidentSubmit(formattedResident);
    };

    // Create or update resident API
    const handleResidentSubmit = async (residentData) => {
        try {
            let response;
            if (isEditing) {
                // Update existing resident
                response = await fetch(`http://localhost:8908/api/residents/${currentResidentId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(residentData),
                });
            } else {
                // Create new resident
                response = await fetch('http://localhost:8908/api/residents', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(residentData),
                });
            }

            const data = await response.json();
            if (response.ok) {
                console.log(isEditing ? 'Resident updated successfully' : 'Resident created successfully', data);
                if (isEditing) {
                    setResidents((prev) => prev.map(res => res.id === currentResidentId ? data : res)); // Update resident in list
                } else {
                    setResidents([...residents, data]); // Add new resident to the list
                }
                handleClose(); // Close the modal after successful creation/update
            } else {
                console.error('Failed to save resident:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewResident((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Open modal for creating new resident
    const handleShowAdd = () => {
        setIsEditing(false); // Set to false to indicate adding a new resident
        setNewResident({
            resident_name: "",
            email: "",
            phone_number: "",
            birthday: "",
            move_in_date: "",
            vehicles: [
                {
                    vehicle_name: "",
                    license_plate: "",
                    vehicle_type: "",
                    color: ""
                }
            ]
        });
        setShow(true);
    };

    // Open modal for editing resident
    const handleShowEdit = (resident) => {
        setIsEditing(true); // Set to true to indicate editing a resident
        setCurrentResidentId(resident.id); // Set the ID of the resident being edited
        setNewResident({
            resident_name: resident.resident_name,
            email: resident.email,
            phone_number: resident.phone_number,
            birthday: resident.birthday,
            move_in_date: resident.move_in_date,
        });
        setShow(true);
    };

    // handle delete api
    const deleteResidentById = async (resident_id) => {
        try {
            const response = await fetch(`http://localhost:8908/api/residents/${resident_id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Resident has id:' + resident_id + ' deleted successfully');
                fetchResidents(); // Cập nhật lại danh sách căn hộ sau khi xóa
            } else {
                const errorData = await response.json();
                console.error('Failed to delete resident:', errorData.message);
            }
        } catch (error) {
            console.error('Error deleting resident:', error);
        }
    };

    // handle get api by id and response resident object data
    // const fetchResidentBId = async (resident_id) => {
    //     try {
    //         const response = await fetch(`http://localhost:8908/api/residents/${resident_id}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });

    //         if (response.ok) {
    //             // Parse the response as JSON
    //             const data = await response.json();
    //             console.log('Resident ID:', resident_id);
    //             console.log('Response Data:', data);

    //             // Handle or use the resident data (e.g., set it in state if needed)
    //             handleResidentDetails(resident_id);  // Assuming you're setting a single resident
    //         } else {
    //             // Handle failed fetch and display an error message
    //             const errorData = await response.json();
    //             console.error('Failed to fetch resident:', errorData.message);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching resident:', error);
    //     }
    // };


    const navigate = useNavigate(); // Hook điều hướng
    const handleResidentDetails = (resident_id) => {
        // Navigate to the resident details page with the ID in the URL
        navigate(`/resident/${resident_id}`);
    };

    const handleClose = () => setShow(false);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className='resident'
            style={{ height: '92vh' }}>
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h3 className='m-0'>Danh Sách Cư Dân</h3>
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
                    <div>
                        <Button className='me-3' onClick={handleShowAdd}>Thêm mới</Button>
                        <Button variant='success' onClick={handlePrint}>In</Button>
                    </div>
                </div>

                <Table hover striped className='w-100 m-0 text-center'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ Tên</th>
                            <th>Email</th>
                            <th>Số Điện Thoại</th>
                            <th>Ngày Sinh</th>
                            <th>Ngày Nhận Phòng</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {residents.length > 0 ? (
                            residents.map((resident, id) => (
                                <tr key={id}>
                                    <td>{id + 1}</td>
                                    <td>{resident.resident_name}</td>
                                    <td>{resident.email}</td>
                                    <td>{resident.phone_number}</td>
                                    <td>{resident.birthday}</td>
                                    <td>{resident.move_in_date}</td>
                                    <td className='d-flex justify-content-around align-items-center'>
                                        <Button variant="secondary">
                                            <FaEye className='pb' onClick={() => handleResidentDetails(resident.resident_id)} />
                                        </Button>
                                        <Button variant="warning" onClick={() => handleShowEdit(resident)}>
                                            <CiEdit className='pb' />
                                        </Button>
                                        <Button variant="danger" onClick={() => deleteResidentById(resident.resident_id)}>
                                            <CiTrash className='pb' />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No resident data available</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>

            {/* Modal to add/edit resident */}
            <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? "Sửa cư dân" : "Thêm mới cư dân"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmits}>
                        <Form.Group className="mb-3">
                            <Form.Label>Họ Tên</Form.Label>
                            <Form.Control
                                type="text"
                                name='resident_name'
                                value={newResident.resident_name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name='email'
                                value={newResident.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Số Điện Thoại</Form.Label>
                            <Form.Control
                                type="text"
                                name='phone_number'
                                value={newResident.phone_number}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ngày Sinh</Form.Label>
                            <Form.Control
                                type="date"
                                name='birthday'
                                value={newResident.birthday}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ngày Đăng Ký Nhận Phòng</Form.Label>
                            <Form.Control
                                type="date"
                                name='move_in_date'
                                value={newResident.move_in_date}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Tên Phương Tiện</Form.Label>
                            <Form.Control
                                type="text"
                                name='vehicle_name'
                                value={newResident.vehicle_name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Biển Số</Form.Label>
                            <Form.Control
                                type="text"
                                name='license_plate'
                                value={newResident.license_plate}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Loại Phương Tiện</Form.Label>
                            <Form.Control
                                type="text"
                                name='vehicle_type'
                                value={newResident.vehicle_type}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Màu Sắc</Form.Label>
                            <Form.Control
                                type="text"
                                name='color'
                                value={newResident.color}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Đóng
                            </Button>
                            <Button variant="primary" type="submit">
                                {isEditing ? "Cập nhật" : "Lưu"}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Pagination */}
            <Container className='w-25'>
                <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Ellipsis />
                    <Pagination.Item>{20}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
            </Container>
        </div>
    );
};

export default Resident;
