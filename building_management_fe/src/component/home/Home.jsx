import {React, useEffect, useState} from 'react'
import './Home.css'
import LineCharts from '../charts/LineCharts.jsx'

const Home = () => {
    const [apartments, setApartments] = useState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getApartments = () => {
        try {
            
            fetch('http://localhost:8888/api/apartments')
                .then(res => res.json())
                .then(data => setApartments(data))
                .then(console.log(apartments))
        } catch (err) {
            console.error("Error fetching products:", err)
        }
    }

    useEffect(() => {
        getApartments();
    }, [getApartments]);

    return (
        <div className='home'>
            <div className='header p-3 w-100 bg-white d-flex justify-content-between align-items-center'>
                <h1 className='m-0'>Trang Chủ</h1>
            </div>

            <div className='p-4'>
                <div className="statistical d-flex justify-content-between align-items-center text-center">
                    <div className="count resident-count bg-light">
                        <h2>Resident</h2>
                        <span className='h4 text-warning'></span>
                    </div>
                    <div className="count apartment-count bg-light">
                        <h2>Apartment</h2>
                        <span className='h4 text-warning'>{apartments.total}</span>
                    </div>
                    <div className="count vehicle-count bg-light">
                        <h3>Vehicle</h3>
                        <span className='h4 text-warning'>3</span>
                    </div>
                    <div className="count vehicle-count bg-light">
                        <h3>Cont</h3>
                        <span className='h4 text-warning'>3</span>
                    </div>
                </div>
            </div>

            <div className="charts bg-light mx-4 pt-5">
                <LineCharts />
            </div>
        </div>
    )
}

export default Home