import { React, useState } from 'react'
import { Nav, Container, Image } from 'react-bootstrap';
import { FaBicycle } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdApartment } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { CiMoneyBill } from "react-icons/ci";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";
import { MdErrorOutline } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { FaFileContract } from "react-icons/fa";
import { MdDesignServices } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";

import './SideBar.css'

export const SideBar = () => {
    const [menu, setMenu] = useState({
        residents: false,
        apartments: false,
        payment: false
    });

    const toggleMenu = (key) => {
        setMenu(prevMenu => ({
            ...prevMenu,
            [key]: !prevMenu[key]
        }));
    };
    return (
        <div className='sidebar'>
            <div className="logo">
                <Nav className="btn-click me-auto mb-3">
                    <Nav.Link className='w-100 d-flex align-items-center text-dark' href="/">
                        <Image width={"100%"} height={"100px"} src='https://i.pinimg.com/564x/8f/75/ee/8f75ee06aa90cbd3ffcb5da7e64047d4.jpg' roundedCircle />
                    </Nav.Link>
                </Nav>

            </div>
            <Container className="p-3 text-dark">
                {/* Trang chủ */}
                <Nav className="btn-click me-auto mb-3">
                    <Nav.Link className='form-control d-flex align-items-center text-dark' href="/">
                        <MdOutlineDashboard className='me-3' />
                        <span>Trang Chủ</span>
                    </Nav.Link>
                </Nav>

                {/* Cư dân */}
                <Nav className="btn-click me-auto flex-column mb-3">
                    {/* Nút Cư Dân */}
                    <Nav.Link className='form-control d-flex align-items-center text-dark' onClick={() => toggleMenu('residents')}>
                        <FaRegUser className='me-3' />
                        <span>Cư Dân</span>
                    </Nav.Link>

                    {/* Hiển thị submenu nếu được bật */}
                    {menu.residents && (
                        <div style={{ paddingLeft: '20px' }}>
                            <Nav.Link className='form-control d-flex align-items-center text-dark my-3' href="/resident">
                                <FaRegUser className='me-3' />
                                Cư Dân
                            </Nav.Link>
                            <Nav.Link className='form-control d-flex align-items-center text-dark my-3' href="/vehicle">
                                <FaBicycle className='me-3' />
                                Phương Tiện
                            </Nav.Link>
                            <Nav.Link className='form-control d-flex align-items-center text-dark my-3' href="/contract">
                                <FaFileContract className='me-3' />
                                Hợp Đồng
                            </Nav.Link>
                        </div>
                    )}
                </Nav>

                {/* Căn hộ */}
                <Nav className="btn-click me-auto flex-column mb-3">
                    {/* Nút Căn Hộ */}
                    <Nav.Link className='form-control d-flex align-items-center text-dark' onClick={() => toggleMenu('apartments')}>
                        <MdApartment className='me-3' />
                        <span>Căn Hộ</span>
                    </Nav.Link>

                    {/* Hiển thị submenu nếu được bật */}
                    {menu.apartments && (
                        <div style={{ paddingLeft: '20px' }}>
                            <Nav.Link className='form-control d-flex align-items-center text-dark my-3' href="/apartment">
                                <MdApartment className='me-3' />
                                Căn Hộ
                            </Nav.Link>
                            <Nav.Link className='form-control d-flex align-items-center text-dark my-3' href="/notification">
                                <IoMdNotifications className='me-3' />
                                Thông Báo
                            </Nav.Link>
                        </div>
                    )}
                </Nav>

                {/* Tài khoản */}
                <Nav className="btn-click me-auto mb-3">
                    <Nav.Link className='form-control d-flex align-items-center text-dark' href="/account">
                        <MdOutlineManageAccounts className='me-3' />
                        <span>Tài Khoản</span>
                    </Nav.Link>
                </Nav>

                {/* Chi phí */}
                <Nav className="btn-click me-auto flex-column mb-3">
                    {/* Nút Chi phí */}
                    <Nav.Link className='form-control d-flex align-items-center text-dark' onClick={() => toggleMenu('payment')}>
                        <MdOutlinePayment className='me-3' />
                        <span>Thanh Toán</span>
                    </Nav.Link>

                    {/* Hiển thị submenu nếu được bật */}
                    {menu.payment && (
                        <div style={{ paddingLeft: '20px' }}>
                            <Nav.Link className='form-control d-flex align-items-center text-dark my-3' href="/payment">
                                <CiMoneyBill  className='me-3' />
                                Chi Phí
                            </Nav.Link>
                            <Nav.Link className='form-control d-flex align-items-center text-dark my-3' href="/apartment">
                                <CiMoneyBill  className='me-3' />
                                Hoá Đơn
                            </Nav.Link>
                            <Nav.Link className='form-control d-flex align-items-center text-dark my-3' href="/services">
                                <MdDesignServices className='me-3' />
                                Dịch Vụ
                            </Nav.Link>
                        </div>
                    )}
                </Nav>

                <Nav className="btn-click me-auto mb-3">
                    <Nav.Link className='form-control d-flex align-items-center text-dark' href="/blank">
                        <RiCheckboxMultipleBlankLine className='me-3' />
                        <span>Blank Page</span>
                    </Nav.Link>
                </Nav>

                <Nav className="btn-click me-auto mb-3">
                    <Nav.Link className='form-control d-flex align-items-center text-dark' href="/error">
                        <MdErrorOutline className='me-3' />
                        <span>Error Page</span>
                    </Nav.Link>
                </Nav>
            </Container>
        </div>
    )
}
