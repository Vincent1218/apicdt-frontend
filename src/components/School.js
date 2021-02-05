import React from 'react'
import './css/School.css'

const School = ({school}) => {
  return (
    <div className=" row schoolBlock">
      <div className = "col" >学校名称：{school.chiSchoolName}</div>
      <div className = "col" >队长姓名：{school.chiTeamLeaderName}</div>
    </div>
  )
}

export default School
