import React, { useEffect, useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import 'react-notifications-component/dist/theme.css';
import AxiosInstance from '../../api/AxiosInstance';

const Notification = () => {

  // get api mail apartment
  const [apartments, setApartments] = useState([])

  useEffect(() => {
    getApartments()
  }, [])

  const getApartments = async () => {
    try {
        const response = await AxiosInstance.get('/api/apartments'); // Thay thế 'API_ENDPOINT' bằng URL API thực tế
        setApartments(response.data.apartments); // Đặt danh sách căn hộ
        console.log(response.data.apartments)
    } catch (error) {
        console.error("Error fetching the apartments", error);
    }
};


  const [mail, setMail] = useState([]);
  const [newMail, setNewMail] = useState({
    to: "",
    subject: "",
    text: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMail((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail(newMail);
  };

  const sendEmail = async (emailData) => {
    try {
      // Chuyển đổi đối tượng emailData thành chuỗi x-www-form-urlencoded
      const urlEncodedData = new URLSearchParams();
      urlEncodedData.append('to', emailData.to);
      urlEncodedData.append('subject', emailData.subject);
      urlEncodedData.append('text', emailData.text);

      const response = await fetch('http://localhost:8902/api/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedData.toString(),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Email sent successfully', data);
        setMail([...mail, data]); // Add the new email to the list
        setNewMail({
          to: "",
          subject: "",
          text: ""
        });
      } else {
        console.error('Failed to send email:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='notifications' style={{ height: '92vh' }}>
      <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
        <h3 className='m-0'>Thông Báo</h3>
      </div>

      <div className="form p-3 bg-white m-3">
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label className='h4'>Người nhận (Email)</Form.Label>
            <Form.Control
              type='email'
              name="to"
              value={newMail.to}
              onChange={handleChange}
              placeholder="Nhập email người nhận"
              required
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label className='h4'>Tiêu Đề</Form.Label>
            <Form.Control
              type='text'
              name="subject"
              value={newMail.subject}
              onChange={handleChange}
              placeholder="Nhập tiêu đề ở đây"
              required
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label className='h4'>Nội Dung Thông Báo</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="text"
              value={newMail.text}
              onChange={handleChange}
              placeholder="Nhập thông báo ở đây"
              required
            />
          </Form.Group>

          <Form.Group>
            <Button type="submit" className='bg-primary text-white'>
              Gửi
            </Button>
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

        <Table striped hover bordered className='m-0 w-100'>
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
            {mail.length > 0 ? (
              mail.map((item, index) => (
                <tr key={index}>
                  <td>
                    <Form.Check />
                  </td>
                  <td>{item.subject}</td>
                  <td>{new Date(item.sentAt).toLocaleDateString()}</td>
                  <td>{item.to}</td>
                  <td>Đã gửi</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">Chưa có thông báo nào</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Notification;
