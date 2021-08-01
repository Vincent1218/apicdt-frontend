import React from 'react'
import './css/School.css'

const Winnerf = ({area,winnerf,index}) => {
  index+=1;
  var suc = false;
  var dif = 0;
  if(area ==="my"){
    dif = (winnerf.time-1615770000000000)/1000000;
    if(index<4){
      suc = true;
    }
  }
  if(area ==="au"){
    dif = (winnerf.time-1615791600000000)/1000000;
    if(index<2){
      suc = true;
    }
  }
  if(area ==="cm"){
    dif = (winnerf.time-1615795200000000)/1000000;
    if(index<15){
      suc = true;
    }
  }
  if(area ==="hk"){
    dif = (winnerf.time-1615777200000000)/1000000;
    if(index<3){
      suc = true;
    }
  }
  if(area ==="mc"){
    dif = (winnerf.time-1615788001000000)/1000000;
    if(index<2){
      suc = true;
    }
  }
  if(area ==="sg"){
    dif = (winnerf.time-1615773601000000)/1000000;
    if(index<2){
      suc = true;
    }
  }
  if(area ==="uk"){
    dif = (winnerf.time-1615798802000000)/1000000;
    if(index<3){
      suc = true;
    }
  }
  
  
  return (
    <div className={`row schoolBlock ${suc ? "succ" : ""}`}>
      <div className = "col-1" >{index}</div>
      <div className = "col-6" >学校名称：{winnerf.name}</div>
      <div className = "col-5" >花费总时长（秒）：{dif} </div>
    </div>
  )
}

export default Winnerf
