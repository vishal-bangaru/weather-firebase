import React from 'react'
import {Outlet} from 'react-router-dom'
import Nav from './Nav'
function RootLayout() {


  return (
    <div>
      {/* <Nav/> */}
      <div className='out'>
      <Outlet/>
      </div>
    
    </div>
  )
}

export default RootLayout