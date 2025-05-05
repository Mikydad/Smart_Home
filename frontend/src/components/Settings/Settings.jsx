
import React from 'react'
import Sidebar from '../Dashboard/Sidebar'
import CityWeather from '../Weather/CityWeather/CityWeather'
import ErrorBoundary from '../Weather/CityWeather/ErrorBoundary'
import Navbar from '../Navbar/Navbar'
import Setting_content from './Setting_content'
import '../Dashboard/Dashboard.css'
const Settings = () => {
  return (
    <div className="main-container">
        <Navbar className='navbar'/>
        <div className='container' style={{ display: 'flex', height: '100vh', padding: '20px'}}>
        <div className="left-sidebar">
        <Sidebar />
        </div>
        <div className="center-content">
          <Setting_content />
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

export default Settings

