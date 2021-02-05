import React from 'react'
import { useState, useEffect } from 'react'
import './css/SchoolList.css'
import School from '../components/School.js'

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
    const res = await fetch('https://apicdt.herokuapp.com/register')
    const data = await res.json()

    return data
  }



  return (
    <div className="container schoolsBlock" >
      <div className = "listHeader">
        报名学校列表
      </div>
      {schools.map((school, index) => (
        <School key={index} school={school} />
      ))}
    </div>
  )
}

export default SchoolList
