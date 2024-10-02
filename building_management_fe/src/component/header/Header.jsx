import React from 'react'
// import "../Header/Header.css"
import { Dropdown, Image } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

export const Header = () => {
  return (
    <Row className="header m-0 w-100 d-flex justify-content-between align-items-center border border-bottom-primary">
      <Col className="search ps-4" xs={9}>
        <input
          type="text"
          placeholder="Search..."
          className="form-control w-75"
        />
      </Col>

      <Col className="user d-flex justify-content-end align-items-center" xs={3}>
        <div className="d-flex align-items-center">
          <Dropdown>
            <Dropdown.Toggle
              variant="link"
              id="dropdown-basic"
              className="d-flex align-items-center "
            >
              <Image width={"45px"} height={"45px"} src='https://minhducpc.vn/uploads/images/hinh-cute01.png' roundedCircle />
              {/* <img
            src="https://minhducpc.vn/uploads/images/hinh-cute01.png"
            alt="User"
            className="header-img"
          /> */}
              <h6 className="mx-3">Dinh Le</h6>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="profile">Thông tin cá nhân</Dropdown.Item>
              <Dropdown.Item href="#">Thống kê công việc</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/logout">Đăng xuất</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Col>
      
    </Row>
  )
}
