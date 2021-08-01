import React from 'react'
import './css/School.css'

const Winner = ({winner,index}) => {
  index+=1;
  return (
    <div className=" row schoolBlock">
      <div className = "col-2" >{index}</div>
      <div className = "col-10" >学校名称：{winner.name}</div>
    </div>
  )
}

export default Winner
