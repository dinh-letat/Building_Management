import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Hook để lấy params từ URL
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
    } catch (err) {
      console.error(err.message);
    }
  };

  if (!resident) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Chi Tiết Cư Dân</h3>
      <p>Họ Tên: {resident.resident_name}</p>
      <p>Email: {resident.email}</p>
      <p>Số Điện Thoại: {resident.phone_number}</p>
      <p>Ngày Sinh: {resident.birthday}</p>
      <p>Ngày Đăng Ký Nhận Phòng: {resident.move_in_date}</p>
    </div>
  );
};

export default ResidentDetails;
