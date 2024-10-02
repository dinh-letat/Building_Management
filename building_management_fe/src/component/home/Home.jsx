import React from 'react'
import { Container } from 'react-bootstrap'
import './Home.css'
import LineChart from './LineChart'

const Home = () => {
    return (
        <div className='home'>
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h3 className='m-0'>Trang Chủ</h3>
            </div>

            <div className='p-4'>
                <div className="statistical d-flex justify-content-between align-items-center text-center">
                    <div className="count resident-count bg-light">
                        <h3>Resident</h3>
                    </div>
                    <div className="count apartment-count  bg-light">
                        <h3>Apartment</h3>
                    </div>
                    <div className="count vehicle-count  bg-light">
                        <h3>Vehicle</h3>
                    </div>
                    <div className="count vehicle-count  bg-light">
                        <h3>Cont</h3>
                    </div>
                </div>
            </div>

            <div className="charts">
                <LineChart/>
            </div>
        </div>
    )
}

export default Home