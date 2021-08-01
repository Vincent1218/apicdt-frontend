import React from 'react'
import { useState, useEffect } from 'react'
import './css/SchoolList.css'
import School from '../components/School.js'
import {serverURL} from '../config'
import Footer from '../components/Footer'

const SchoolList = () => {

  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const getSchools = async () => {
      const schoolsDB = await fetchSchools()
      setSchools(schoolsDB)
    }
    getSchools()
  }, [])

  const fetchSchools = async () => {
    const res = await fetch((serverURL+'register'))
    // const res = await fetch('https://apicdt-server.com' + '/register')
    const data = await res.json()
    // console.log(data)
    return data
  }



  return (
    <div>
      <div className="schoolsBlock container" >
        <div className = "listHeader">
          报名学校列表
        </div>
        {schools.map((school, index) => (
          <School key={index} school={school}/>
        ))}
     </div>
     <Footer /> 
    </div>

  )
}

export default SchoolList
