import React from 'react'
import Sidebar from '../Dashboard/Sidebar'
import RoomTemp from '../Weather/RoomTemp'
import CityWeather from '../Weather/CityWeather/CityWeather'
import ErrorBoundary from '../Weather/CityWeather/ErrorBoundary'
import Navbar from '../Navbar/Navbar'
import AirPower from '../AirCondition/Air-Condition-Power/Air-Power'

import '../Dashboard/Dashboard.css'
export const Weather = () => {
  return (
    <div className="main-container">
        <Navbar className='navbar'/>
        <div className='container' style={{ display: 'flex', height: '100vh', padding: '20px'}}>
        <div className="left-sidebar">
        <Sidebar />
        </div>
        <div className="center-content">
        <RoomTemp />
        <AirPower />
        </div>
        <div className="right-sidebar">
        <ErrorBoundary>
        <CityWeather />
        </ErrorBoundary>
        </div>
    </div>
    </div>
    
  )
}

export default Weather