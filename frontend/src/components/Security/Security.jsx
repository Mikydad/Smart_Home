import React from 'react'
import Sidebar from '../Dashboard/Sidebar'
import CityWeather from '../Weather/CityWeather/CityWeather'
import ErrorBoundary from '../Weather/CityWeather/ErrorBoundary'
import Navbar from '../Navbar/Navbar'
import SecurityControl from './SecurityControl'
import MotionAlert from './MotionAlert'
import '../Dashboard/Dashboard.css'
const Security = () => {
  return (
    <div className="main-container">
        Hello
        <Navbar className='navbar'/>
        <div className='container' style={{ display: 'flex', height: '100vh', padding: '20px'}}>
        <div className="left-sidebar">
        <Sidebar />
        </div>
        <div className="center-content">
        <SecurityControl />
        <MotionAlert />
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

export default Security

