import React, { useState } from 'react';
import './Form.css';
import { Form, Container, Button, Row, Col } from 'react-bootstrap';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8901/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        console.log(data); // Hiển thị phản hồi từ API
    }

    return (
        <div className="signup">
            <Container className='form-container d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
                <Row className="w-100">
                    <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
                        <div className="form-control p-4">
                            <h2 className='text-center'>Sign Up</h2>
                            <Form onSubmit={handleSignup}>
                                <Form.Group className='mb-3'>
                                    <Form.Label className='fw-bold'>Email</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='email'
                                        value={formData.email}
                                        onChange={handleChange}
                                        required />
                                </Form.Group>

                                <Form.Group className='mb-3'>
                                    <Form.Label className='fw-bold'>Name</Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='name'
                                        value={formData.name}
                                        onChange={handleChange}
                                        required />
                                </Form.Group>


                                <Form.Group className='mb-4'>
                                    <Form.Label className='fw-bold'>Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        name='password'
                                        value={formData.password}
                                        onChange={handleChange}
                                        required />
                                </Form.Group>

                                <Form.Group className='mb-3 text-center'>
                                    <Button className='w-50' type='submit'>Sign Up</Button>
                                </Form.Group>

                                <Form.Group className='mb-3 text-center'>
                                    <span className='ms-3'>Forgot password? <a href="/reset">Reset Password</a>  <a href="/signin">Sign In</a> </span>
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Signup;
