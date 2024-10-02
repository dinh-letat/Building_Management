import React from 'react'
import { Container, Button, Image, Nav } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <header className='header bg-light fixed'>
                <Container className='d-flex justify-content-between align-items-center'  style={{ maxHeight: '100vh' }}>
                    <div className="logo">
                        <Nav.Link href='/'>
                            <Image src='https://i.pinimg.com/564x/ff/48/96/ff489672a4a24094ec3b7105c3a6aed3.jpg' width={"250px"} height={"80px"} />
                        </Nav.Link>
                    </div>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/about-us">About Us</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/apartment">Apartment</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/service">Service</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className='auth-buttons'>
                        <Nav.Item>
                            <Nav.Link href="/signin">Sign In</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/signup">Sign Up</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </header>
        </>
    )
}

export default Header
