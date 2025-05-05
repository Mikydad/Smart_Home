import React from 'react'
import Sidebar from './Sidebar'
import RoomTemp from '../Weather/RoomTemp'
import CityWeather from '../Weather/CityWeather/CityWeather'
import ErrorBoundary from '../Weather/CityWeather/ErrorBoundary'
import Navbar from '../Navbar/Navbar'
import AirPower from '../AirCondition/Air-Condition-Power/Air-Power'
import LightControl from '../Light/Light-Ctrl'
import SecurityControl from '../Security/SecurityControl'
import './Dashboard.css'
const Dashboard = () => {
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
        <LightControl />
        <SecurityControl />
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

export default Dashboard