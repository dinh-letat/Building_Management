import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Modal, Container } from 'react-bootstrap';
import AxiosInstance from '../../api/AxiosInstance';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";


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
        status: "TRỐNG",
        create_at: new Date().toISOString().slice(0, 19).replace('T', ' '), // Tạo giá trị cho create_at,
        update_at: null
    });

    const fetchApartments = async () => {
        try {
            const response = await AxiosInstance.get('/api/apartments'); // Thay thế 'API_ENDPOINT' bằng URL API thực tế
            setApartments(response.data.apartments); // Đặt danh sách căn hộ
            console.log(response.data.apartments)
        } catch (error) {
            console.error("Error fetching the apartments", error);
        }
    };
    useEffect(() => {
        fetchApartments();
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
                fetchApartments();
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
        setNewApartment(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        createResident(newApartment); // Pass the new resident data to the API
    };

    // update apartment by id
    const updateApartmentById = async (id) => {

    }

    // delete apartment by id
    const deleteApartmentById = async (id) => {
        try {
            const response = await fetch(`http://localhost:8909/api/apartments/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log('Apartment deleted successfully');
                fetchApartments(); // Cập nhật lại danh sách căn hộ sau khi xóa
            } else {
                const errorData = await response.json();
                console.error('Failed to delete apartment:', errorData.message);
            }
        } catch (error) {
            console.error('Error deleting apartment:', error);
        }
    };

    // handle get api by id and response resident object data
    // const fetchApartmentBId = async (apartment_id) => {
    //     try {
    //         const response = await fetch(`http://localhost:8908/api/apartments/${apartment_id}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    
    //         if (response.ok) {
    //             // Parse the response as JSON
    //             const data = await response.json();
    //             console.log('Resident ID:', apartment_id);
    //             console.log('Response Data:', data);
                
    //             // Handle or use the resident data (e.g., set it in state if needed)
    //             handleResidentDetails(apartment_id);  // Assuming you're setting a single resident
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
    const handleResidentDetails = (apartment_id) => {
        // Navigate to the resident details page with the ID in the URL
        navigate(`/apartment/${apartment_id}`);
    };


    const [itemsPerPage, setItemsPerPage] = useState(10);
    const handleItemsPerPageChange = (e) => {
        const value = e.target.value;
        setItemsPerPage(value);
        // Gọi lại API để lấy căn hộ với số lượng hiển thị tương ứng, nếu cần
        fetchApartments(); // Thay đổi hàm này nếu có truyền tham số vào API
    };

    return (
        <div className='apartment'
            style={{ height: '93vh' }}>
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

                <Table hover striped className='w-100 m-0 text-center'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên Căn Hộ</th>
                            <th>Diện Tích (m2)</th>
                            <th>Số Phòng</th>
                            <th>Giá</th>
                            <th>Trạng Thái</th>
                            <th>Ngày Tạo</th>
                            <th>Ngày Cập Nhật</th>
                            <th>Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apartments.length > 0 ? (
                            apartments.map((apartment, id) => (
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
                                        <Button variant="secondary">
                                            <FaEye className='pb-1' onClick={() => handleResidentDetails(apartment.apartment_id)} />
                                        </Button>
                                        <Button variant="warning" onClick={() => updateApartmentById(apartment.apartment_id)}>
                                            <CiEdit className='pb-1' />
                                        </Button>
                                        <Button variant="danger" onClick={() => deleteApartmentById(apartment.apartment_id)}>
                                            <CiTrash className='pb-1' />
                                        </Button>
                                        <Button variant='primary'>Thanh Toán</Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9">No apartments found</td>
                            </tr>
                        )}
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
                                <option value="TRỐNG">TRỐNG</option>
                                <option value="ĐANG_SỬ_DỤNG">ĐANG SỬ DỤNG</option>
                                <option value="ĐANG_SỬA_CHỮA">ĐANG SỬA CHỮA</option>
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


            {/* Panigation */}
            {/* <>
                <Pagination className='container'>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Ellipsis />
                    <Pagination.Item>{20}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
                <Container className='w-25 mt-5'>
                </Container>
            </> */}
        </div>
    )
}

export default Apartments
