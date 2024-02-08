import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown';
import "./Homepage.css"

import Nav from './Nav'
function Homepage() {
    const [data, setData] = useState({})
  const [location, setLocation] = useState('')
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
  const searchLocation = (event) => {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
     
  }
  const x=localStorage.getItem("email")
  const locations = [
    'Abu Dhabi',
    'Abuja',
    'Accra',
    'Addis Ababa',
    'Ahmedabad',
    'Dallas',
    'London',
    'Jaipur',
    'Kano',
    'Kanpur',
    'Karachi',
    'Praia',
    'Puebla',
    'Pune',
    'Washington',
    'Yokohama',
    'Zagreb'
  ];
  return (
    
    <div className="app">
      { x!==null?
      <div>
      <Nav/>
      <div className="search  ">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder='Enter Location'
          type="text" />
          <button  onClick={searchLocation} className='btn border-white text-white p-2 ms-2 mb-1'>Search
          </button>
          <Dropdown className="me-5">
      <Dropdown.Toggle variant="" id="dropdown-basic" className='text-white'>
        List of Locations
      </Dropdown.Toggle>

      <Dropdown.Menu>
      {locations.map((location, index) => (
          <Dropdown.Item key={index}>{location}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p >Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }



      </div>

    </div>
    :
    <p className="text-danger text-center">Unauthorized Access!! Please Login</p>
}
    </div>
  );
}

export default Homepage