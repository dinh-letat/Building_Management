import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Modal, Container } from 'react-bootstrap';
import './Service.css'

const Service = () => {
    return (
        <div className='service'>
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h3 className='m-0'>Chi phí dịch vụ</h3>
            </div>

            <div className="table-content bg-white m-3 p-3 d-flex justify-content-between align-items-center">
                <Table bordered className='text-center'>
                    <thead>
                        <tr>
                            <th colSpan={3}>Tiền điện</th>
                            <th>Tiền Nước</th>
                            <th colSpan={2}>Tiền Phương Tiện</th>
                            <th>Phí Quản Lý</th>
                        </tr>

                    </thead>
                    <tbody>
                        <tr>
                            <th>Bậc</th>
                            <th>Giá bán lẻ điện (kWh)</th>
                            <th>Giá điện (đồng / kWh)</th>
                            <th>Giá</th>
                            <th>Xe máy</th>
                            <th>Xe ô tô</th>
                            <th>Giá tiền</th>
                        </tr>
                        <tr>
                            <th>Bậc 1</th>
                            <td>Từ 0 - 50 kWh</td>
                            <td>1.806</td>
                            <td rowSpan={7}>100000</td>
                            <td rowSpan={7}>70000</td>
                            <td rowSpan={7}>100000</td>
                            <td rowSpan={7}>300000</td>
                        </tr>
                        <tr>
                            <th>Bậc 2</th>
                            <td>Từ 51 - 100 kWh</td>
                            <td>1.866</td>
                        </tr>
                        <tr>
                            <th>Bậc 3</th>
                            <td>Từ 101 - 200 kWh</td>
                            <td>2.167</td>
                        </tr>
                        <tr>
                            <th>Bậc 4</th>
                            <td>Từ 201 - 300 kWh</td>
                            <td>2.729</td>
                        </tr>
                        <tr>
                            <th>Bậc 5</th>
                            <td>
                                Từ 301 - 400 kWh</td>
                            <td>3.050</td>
                        </tr>
                        <tr>
                            <th>Bậc 6</th>
                            <td>Từ 401 trở lên kWh</td>
                            <td>3.151</td>
                        </tr>
                        <tr>
                            <th colSpan={2}>Dùng công tơ thẻ trả trước</th>
                            <td>2.649</td>
                        </tr>

                    </tbody>
                </Table>
            </div>
            <div className='p-3 bg-white m-3'>
                <Form>
                    <Form.Group className='mb-2'>
                        <Form.Label>Nhập số điện tiêu thụ:</Form.Label>
                        <div className="d-flex justify-content-between align-items-center">
                            <Form.Control className='me-4'></Form.Control>
                            <Button>Tính</Button>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Tổng:</Form.Label>
                        <Form.Control type='span'></Form.Control>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}

export default Service
