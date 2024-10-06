import './Admin.css'
import { React } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { SideBar } from '../../component/sidebar/SideBar'
import { Header } from '../../component/header/Header'
import Resident from '../../component/resident/Resident'
import Signin from '../Form/Signin.jsx'
import Vehicle from '../../component/vehicle/Vehicle.jsx'
import Accounts from '../../component/accounts/Accounts.jsx'
import Apartments from '../../component/apartments/Apartments.jsx'
import Home from '../../component/home/Home.jsx'
import Profile from '../../component/accounts/Profile.jsx'
import Service from '../../component/service/Service.jsx'
import Notification from '../../component/notification/Notification.jsx'
import Signup from '../Form/Signup.jsx'
import ApartmentDetails from '../../component/apartments/ApartmentDetails.jsx'

const Admin = () => {
    return (
        <div className='admin'>
            <Row className='w-100 no-gutters'>
                {/* Cột sidebar */}
                <Col xs={12} lg={2} className='p-0 sidebar-col'>
                    <SideBar />
                </Col>

                {/* Cột chứa Header và nội dung */}
                <Col xs={12} lg={10} className='p-0'>
                    <Header />
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/signin' element={<Signin />} />
                            <Route path='/signup' element={<Signup />} />

                            <Route path='/resident' element={<Resident />} />
                                <Route path='/resident/:id' element={<ApartmentDetails />} />
                            <Route path='/apartment' element={<Apartments />} />
                            <Route path='/apartment/resident' element={<Apartments />} />
                            <Route path='/account' element={<Accounts />} />
                            <Route path='/vehicle' element={<Vehicle />} />
                            <Route path='/services' element={<Service />} />

                            <Route path='/notification' element={<Notification />} />
                            <Route path='/profile' element={<Profile />} />
                        </Routes>
                    </BrowserRouter>
                </Col>
            </Row>
        </div>
    )
}

export default Admin
