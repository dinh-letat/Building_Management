import { React, useState } from 'react'
import { Table, Button, Modal, Form } from 'react-bootstrap'

const Payment = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    return (
        <div className='payment'
            style={{ height: '93vh' }}>
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h3 className='m-0'>Quản Lý Chi Phí</h3>
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

                    <Button onClick={handleShow}>Thêm</Button>
                </div>

                <Table hover striped bordered className='w-100 text-center'>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên Căn Hộ</th>
                            <th>Tên Cư Dân</th>
                            <th>Email</th>
                            <th>Số Điện Thoại</th>
                            <th>Số Hoá Đơn</th>
                            <th>Ngày Nhập</th>
                            <th>Ghi Chú</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </Table>

                <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Lập Hoá Đơn</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <Form.Group className="mb-3">
                                <Form.Label>Tên Căn Hộ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name='apartment_name'
                                // value={newApartment.apartment_name}
                                // onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Số Hoá Đơn</Form.Label>
                                <Form.Control
                                    type="number"
                                    name='area'
                                // value={newApartment.area}
                                // onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Tiền Điện</Form.Label>
                                <Form.Control
                                    type="number"
                                    name='number_of_room'
                                // value={newApartment.number_of_room}
                                // onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Tiền Nước</Form.Label>
                                <Form.Control
                                    type="number"
                                    name='price'
                                // value={newApartment.price}
                                // onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Phí Quản Lý</Form.Label>
                                <Form.Control
                                    type="number"
                                    name='price'
                                // value={newApartment.price}
                                // onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Tiền Gửi Xe</Form.Label>
                                <Form.Control
                                    type="number"
                                    name='price'
                                // value={newApartment.price}
                                // onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Tiền Nước</Form.Label>
                                <Form.Control
                                    type="number"
                                    name='price'
                                // value={newApartment.price}
                                // onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Ngày Nhập</Form.Label>
                                <Form.Control
                                    type="date"
                                    name='price'
                                // value={newApartment.price}
                                // onChange={handleChange}
                                />
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                        <Button variant="primary"
                            // type="submit"
                            // onClick={handleSubmit}
                        >
                            Lưu
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default Payment
