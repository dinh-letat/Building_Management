import React from 'react'
import { Container, Nav } from 'react-bootstrap'

const SideBar = () => {
    return (
        <div className='sidebar'>
            <div className="logo">
            </div>
            <Container className="p-3 text-light">
                <Nav className="me-auto mb-3">
                    <Nav.Link className='form-control d-flex align-items-center text-light' href="/">
                        <MdOutlineDashboard className='me-3' />
                        <span>Trang Chủ</span>
                    </Nav.Link>
                </Nav>

                <Nav className="me-auto mb-3">
                    <Nav.Link className='form-control d-flex align-items-center text-light' href="/employee">
                        <FaRegUser className='me-3' />
                        <span>Nhân Viên</span>
                    </Nav.Link>
                </Nav>

                <Nav className="me-auto mb-3">
                    <Nav.Link className='form-control d-flex align-items-center text-light' href="/role">
                        <PiPinwheelLight className='me-3' />
                        <span>Quyền</span>
                    </Nav.Link>
                </Nav>

                <Nav className="me-auto mb-3">
                    <Nav.Link className='form-control d-flex align-items-center text-light' href="/project">
                        <FaProjectDiagram className='me-3' />
                        <span>Dự Án</span>
                    </Nav.Link>
                </Nav>

                <Nav className="me-auto mb-3">
                    <Nav.Link className='form-control d-flex align-items-center text-light' href="/task">
                        <FaTasks className='me-3' />
                        <span>Công Việc</span>
                    </Nav.Link>
                </Nav>

                <Nav className="me-auto mb-3">
                    <Nav.Link className='form-control d-flex align-items-center text-light' href="/blank">
                        <RiCheckboxMultipleBlankLine className='me-3' />
                        <span>Blank Page</span>
                    </Nav.Link>
                </Nav>

                <Nav className="me-auto mb-3">
                    <Nav.Link className='form-control d-flex align-items-center text-light' href="/error">
                        <MdErrorOutline className='me-3' />
                        <span>Error Page</span>
                    </Nav.Link>
                </Nav>
            </Container>
        </div>
    )
}

export default SideBar
