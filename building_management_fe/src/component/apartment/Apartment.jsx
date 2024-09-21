import React, { useEffect, useState } from 'react';
import { Form, Container, Button, Row, Col, Table } from 'react-bootstrap';

const Apartment = () => {
    const [formData, setFormData] = useState({
        apartment_name: "",
        area: "",
        number_of_room: "",
        price: "",
        status: "",
        create_at: ""
    });

    const handleChange = (e) => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${('0' + currentDate.getDate()).slice(-2)} ${('0' + currentDate.getHours()).slice(-2)}:${('0' + currentDate.getMinutes()).slice(-2)}:${('0' + currentDate.getSeconds()).slice(-2)}`;

        // Đổi thành UTC nếu cần
        const utcDate = new Date(currentDate.getTime() + currentDate.getTimezoneOffset() * 60000);
        const utcFormattedDate = `${utcDate.getFullYear()}-${('0' + (utcDate.getMonth() + 1)).slice(-2)}-${('0' + utcDate.getDate()).slice(-2)} ${('0' + utcDate.getHours()).slice(-2)}:${('0' + utcDate.getMinutes()).slice(-2)}:${('0' + utcDate.getSeconds()).slice(-2)}`;


        setFormData({
            ...formData,
            create_at: utcFormattedDate,
            [e.target.name]: e.target.value
        });
    };

    const handleApartment = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8909/api/apartments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        console.log(data); // Hiển thị phản hồi từ API
    }

    const [data, setData] = useState([])
    useEffect(() => {
        fetch("http://localhost:8909/api/apartments")
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, [])

    return (
        <>
            <div className="apartment">
                <Container className='form-container' style={{ minHeight: '100vh' }}>
                    <Row className="w-100 mb-5">
                        <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
                            <div className="form-control p-4">
                                <h2 className='text-center'>Create New Apartment</h2>
                                <Form onSubmit={handleApartment}>
                                    <Form.Group className='mb-3'>
                                        <Form.Label className='fw-bold'>Apartment Name</Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='apartment_name'
                                            value={formData.apartment_name}
                                            onChange={handleChange}
                                            required />
                                    </Form.Group>

                                    <Form.Group className='mb-3'>
                                        <Form.Label className='fw-bold'>Area</Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='area'
                                            value={formData.area}
                                            onChange={handleChange}
                                            required />
                                    </Form.Group>


                                    <Form.Group className='mb-4'>
                                        <Form.Label className='fw-bold'>Number Of Room</Form.Label>
                                        <Form.Control
                                            type='number'
                                            name='number_of_room'
                                            value={formData.number_of_room}
                                            onChange={handleChange}
                                            required />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label className='fw-bold'>Price</Form.Label>
                                        <Form.Control
                                            type='text'
                                            name='price'
                                            value={formData.price}
                                            onChange={handleChange}
                                            required />
                                    </Form.Group>

                                    <Form.Group className='mb-4'>
                                        <Form.Label className='fw-bold'>Status</Form.Label>
                                        <Form.Select aria-label="Default select example"
                                            value={formData.status || ""}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        >
                                            <option value="VACANT">VACANT</option>
                                            <option value="OCCUPIED">OCCUPIED</option>
                                            <option value="UNDER_REPAIR">UNDER_REPAIR</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className='text-center'>
                                        <Button className='w-50' type='submit'>Save</Button>
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Table table striped hover className='text-center'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Apartment Name</th>
                                        <th>Area</th>
                                        <th>Number Of Room</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Create At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((data, apartment_id) => {
                                        return <tr key={apartment_id}>
                                            <td key={data.apartment_id}>{data.apartment_id}</td>
                                            <td>{data.apartment_name}</td>
                                            <td>{data.area}</td>
                                            <td>{data.number_of_room}</td>
                                            <td>{data.price}</td>
                                            <td>{data.status}</td>
                                            <td>{data.create_at}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                </Container>
            </div>
        </>
    );
}

export default Apartment;
