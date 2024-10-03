import { React, useState } from 'react'
import { Nav, Container } from 'react-bootstrap';
import { FaBicycle } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";
import { MdErrorOutline } from "react-icons/md";
import './SideBar.css'

export const SideBar = () => {
    const [showSubMenu, setShowSubMenu] = useState(false); // Trạng thái cho việc hiển thị submenu

    const handleResidentsClick = () => {
        setShowSubMenu(!showSubMenu); // Đảo ngược trạng thái khi nhấn vào Cư Dân
    };
    return (
        <div className='sidebar'>
            <div className="logo">
            </div>
            <Container className="p-3 text-dark">
                <Nav className="me-auto mb-3">
                    <Nav.Link className='form-control d-flex align-items-center text-dark' href="/">
                        <MdOutlineDashboard className='me-3' />
                        <span>Trang Chủ</span>
                    </Nav.Link>
                </Nav>

                <Nav className="me-auto flex-column mb-3">
                    {/* Nút Cư Dân */}
                    <Nav.Link
                        className='form-control d-flex align-items-center text-dark'
                        onClick={handleResidentsClick} // Thêm sự kiện nhấn vào đây
                    >
                        <FaRegUser className='me-3' />
                        <span>Cư Dân</span>
                    </Nav.Link>

                    {/* Các nút con chỉ xuất hiện khi bấm Cư Dân */}
                    {showSubMenu && (
                        <div style={{ paddingLeft: '20px' }}>
                            <Nav.Link
                                className='form-control d-flex align-items-center text-dark my-3'
                                href="/resident" // Chỉ dẫn đến trang cư dân
                            >
                                <FaRegUser className='me-3' />
                                Cư Dân
                            </Nav.Link>
                            <Nav.Link
                                className='form-control d-flex align-items-center text-dark'
                                href="/vehicle" // Chỉ dẫn đến trang phương tiện
                            >
                                <FaBicycle className='me-3'/>
                                Phương Tiện
                            </Nav.Link>
                        </div>
                    )}
                </Nav>

                <Nav className="me-auto mb-3">
                    <Nav.Link className='form-control d-flex align-items-center text-dark' href="/apartment">
                        <MdApartment className='me-3'/>
                        <span>Căn Hộ</span>
                    </Nav.Link>
                </Nav>

                <Nav className="me-auto mb-3">
                    <Nav.Link className='form-control d-flex align-items-center text-dark' href="/account">
                        <MdOutlineManageAccounts className='me-3' />
                        <span>Tài Khoản</span>
                    </Nav.Link>
                </Nav>

                <Nav className="me-auto mb-3">
                    <Nav.Link className='form-control d-flex align-items-center text-dark' href="/vehicle">
                        <FaTasks className='me-3' />
                        <span>Phương Tiện</span>
                    </Nav.Link>
                </Nav>

                <Nav className="me-auto mb-3">
                    <Nav.Link className='form-control d-flex align-items-center text-dark' href="/blank">
                        <RiCheckboxMultipleBlankLine className='me-3' />
                        <span>Blank Page</span>
                    </Nav.Link>
                </Nav>

                <Nav className="me-auto mb-3">
                    <Nav.Link className='form-control d-flex align-items-center text-dark' href="/error">
                        <MdErrorOutline className='me-3' />
                        <span>Error Page</span>
                    </Nav.Link>
                </Nav>
            </Container>
        </div>
    )
}
