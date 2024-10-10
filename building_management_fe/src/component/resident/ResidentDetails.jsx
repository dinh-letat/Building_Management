import React, { useEffect, useState } from 'react';
import { Button, Table, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'; // Hook để lấy params từ URL
import { Link } from 'react-router-dom'
import fetchURL from '../../api/AxiosInstance';

const ResidentDetails = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [resident, setResident] = useState(null);

  useEffect(() => {
    fetchResidentDetails();
  }, [id]);

  const fetchResidentDetails = async () => {
    try {
      const response = await fetchURL(`/api/residents/${id}`);
      setResident(response.data);
      console.log(response.data)
    } catch (err) {
      console.error(err.message);
    }
  };

  if (!resident) {
    return <div>Loading...</div>;
  }

  return (
    <div className='resident-details'
      style={{ height: '92vh' }}>
      <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
        <h3 className='m-0'>Chi Tiết Cư Dân</h3>
        <Link className='pe-3' to={"/resident"}>
          <b>Trở về</b>
        </Link>
      </div>

      <div className='info bg-white m-3 p-5'>
        <div className=''>
          <h4 className='text-center'>Thông tin cá nhân</h4>
          <Container className='w-50'>
            <Table hover responsive className='w-75'>
              <tbody>
                <tr>
                  <th>Họ Tên: </th>
                  <td>{resident.resident_name}</td>
                </tr>
                <tr>
                  <th>Email:</th>
                  <td>{resident.email}</td>
                </tr>
                <tr>
                  <th>Số Điện Thoại:</th>
                  <td>{resident.phone_number}</td>
                </tr>
                <tr>
                  <th>
                    Ngày Sinh:</th>
                  <td>{resident.birthday}</td>
                </tr>
                <tr>
                  <th>
                    Ngày Đăng Ký Nhận Phòng:</th>
                  <td>{resident.move_in_date}</td>
                </tr>

              </tbody>

              {resident.vehicles.map((vehicle) => (
                <tbody >
                  <tr key={vehicle.vehicle_id}></tr>
                  <tr>
                    <th>Loại Phương Tiện</th>
                    <td>{vehicle.vehicle_type}</td>
                  </tr>
                  <tr>
                    <th>Tên Phương Tiện</th>
                    <td>{vehicle.vehicle_name}</td>
                  </tr>
                  <tr>
                    <th>Biển Số Xe</th>
                    <td>{vehicle.license_plate}</td>
                  </tr>
                  <tr>
                    <th>Màu Sắc</th>
                    <td>{vehicle.color}</td>
                  </tr>
                </tbody>
              ))}
            </Table>
            {/* {resident.vehicles && resident.vehicles.length > 0 ? (
              <Table hover responsive>

              </Table>
            ) : (
              <p>Không có phương tiện nào được đăng ký.</p>
            )} */}
          </Container>
        </div>


      </div>

    </div>
  );
};

export default ResidentDetails;
