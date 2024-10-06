import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Modal, Container } from 'react-bootstrap';
import './Service.css'

const Service = () => {
    return (
        <div className='service'>
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h3 className='m-0'>Chi phí dịch vụ</h3>
            </div>

            <div className="table-content bg-white m-3 p-3">

                <Table bordered className='w-100 text-center'>
                    <tbody>
                        <tr cl>
                            <th rowSpan={2}>Tiền Điện (VND)</th>
                            <th rowSpan={2}>Nước (VND)</th>
                            <th colSpan={2}>Phương Tiện</th>
                        </tr>
                        <tr>
                            <td>Xe Máy</td>
                            <td>Xe Oto</td>
                        </tr>
                        <tr>
                            <td>3500</td>
                            <td>100000</td>
                            <td>50000</td>
                            <td>100000</td>
                        </tr>

                    </tbody>
                    {/* <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Xe máy</td>
                            <td>Xe oto</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>3500</td>
                            <td>100000</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody> */}
                </Table>
                <p><b>*) Note:</b></p>
                <p>- Tiền điện: 3,500k / 1kw</p>
                <p>- Tiền nước: 100.000</p>
            </div>
        </div>
    )
}

export default Service
