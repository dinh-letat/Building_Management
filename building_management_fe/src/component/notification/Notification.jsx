import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import 'react-notifications-component/dist/theme.css'

const Notification = () => {
  return (
    <div className='notifications'
      style={{ height: '92vh' }}>
      <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
        <h3 className='m-0'>Thông Báo</h3>
        {/* <Button onClick={handleShow}>Thêm mới</Button> */}
      </div>

      <div className="form p-3 bg-white m-3">
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label className='h4'>Nội Dung Thông Báo</Form.Label>
            <Form.Control as="textarea" placeholder="Nhập thông báo ở đây" />
          </Form.Group>
          <Form.Group>
            <Form.Control type='submit' className='bg-primary text-white' />
          </Form.Group>
        </Form>
      </div>

      <div className="table-content bg-white m-3 p-3">
        <div className="func-table d-flex justify-content-between align-items-center py-3">
          <div className="select-group">
            Hiển thị
            <select name="" id="" className='mx-2'>
              <option value="">10</option>
              <option value="">20</option>
              <option value="">30</option>
              <option value="">50</option>
            </select>
            mục
          </div>
        </div>

        <Table hover striped bordered className='w-100 text-center'>
          <thead>
            <tr>
              <th>Chọn</th>
              <th>Tên Thông Báo</th>
              <th>Ngày Gửi</th>
              <th>Người Gửi</th>
              <th>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Form.Check // prettier-ignore
                // type={type}
                // id={`default-${type}`}
                // label={`default ${type}`}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Notification
