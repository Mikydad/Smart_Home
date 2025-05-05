import React from 'react'
import Sidebar from '../Dashboard/Sidebar'
import CityWeather from '../Weather/CityWeather/CityWeather'
import ErrorBoundary from '../Weather/CityWeather/ErrorBoundary'
import Navbar from '../Navbar/Navbar'
import LightControl from './Light-Ctrl'
import Light_with_motion from './Light_with_motion';
import '../Dashboard/Dashboard.css'
const Lights = () => {
  return (
    <div className="main-container">
        <Navbar className='navbar'/>
        <div className='container' style={{ display: 'flex', height: '100vh', padding: '20px'}}>
        <div className="left-sidebar">
        <Sidebar />
        </div>
        <div className="center-content">
        <LightControl />
        <Light_with_motion />
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

export default Lights

