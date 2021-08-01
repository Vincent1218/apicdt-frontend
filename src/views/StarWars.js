import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import './css/StarWars.css'
import { useHistory } from "react-router-dom";

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import {serverURL} from '../config'
import areas from "../components/json/areas.json";

import Footer from '../components/Footer'

// import axios from "axios";


const StarWars = () => {
  const [starwarsData,setStarwarsData] = useState({token : '',name :'',day:0,hour:0,minute:0,second:0});
  const [dataf,setDataf] = useState([]);
  const [datac,setDatac] = useState([]);

  const [areaC,setAreaC] = useState("");
  const [area,setArea] = useState("");

  const [startDate,setStartDate] = useState(0);
  const [startHour,setStartHour] = useState(0);
  const [endHour,setEndHour] =useState(0);
  const [startMinute,setStartMinute] =useState(0);
  const [endMinute,setEndMinute] =useState(0);

  const [showU, setShowU] = useState(false);
  const [showS, setShowS] = useState(false);
  const [showI, setShowI] = useState(false);
  const [showA, setShowA] = useState(false);
  const [changed, setChanged] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [chosen,setChosen] = useState(false);
  const [st,setSt] = useState(true);




  const fetchTZ = async (token) => {
    if(token === ''){
      return;
    }
    const res = await fetch(serverURL+'register/'+token)
    // const res = await fetch('https://apicdt-server.com/registerTest/'+token)
    const data = await res.json()
    setDataf (data);
  }

  const getTime = async () => {
    const res = await fetch(serverURL+'starwars/time')
    const data = await res.json()
    // console.log(data);
    return data;
  }



  const checkUsed = useCallback( async (token) => {
    if(token === ''){
      return;
    }
    const res = await fetch(serverURL+'starwars'+area+'/'+token)
    // const res = await fetch('https://apicdt-server.com/starwars/'+token)
    const data = await res.json()
    setDatac (data)
  },[area])

  const updateToken= async (token) => {
    if(token === ''){
      return;
    }
    const res = await fetch((serverURL+'starwars'+area+'/'+token),{
      method: 'PUT',
    })
    // const res = await fetch('https://apicdt-server.com/starwars/'+token)
    const data = await res.json()
  }

  const addStarwarsData = async (starwarsData) =>{
    const res = await fetch ((serverURL+'starwars'+area),{
      method : 'POST',
      headers:{
        'Content-type':'application/json',
      },
      body: JSON.stringify(starwarsData),
    })
    // const data = await res.json()
    if(res.status === 201){
      // console.log("added successfully!");
      setTimeout(() => history.push('/starwarslist'+area), 1000);
    }
  }

  const history = useHistory();

  const onSubmit = async (e) =>{
    e.preventDefault();
    setChanged(true);
 
    if((starwarsData.hour !== startHour)||(starwarsData.minute <startMinute)||(starwarsData.minute >= endMinute)){
      setShowI(false);
      setShowU(false);
      setShowS(false);
      setShowA(true);
      // setTimeout(() => setShowA(false), 3000);
      return;
    }

    try{
      if(datac[0].token){
        setShowU(true);
        setShowS(false);
        setShowI(false);
        setShowA(false);
        setTimeout(() => setShowU(false), 3000);
        updateToken(datac[0].token);
        starwarsData.name = datac[0].name;
        setSubmitted(true);
        addStarwarsData(starwarsData);
        return;
      }
    } catch(error){
        // nothing here
    }
    try{
      if (dataf[0].token){
        starwarsData.name = dataf[0].chiSchoolName;
        setSubmitted(true);
        addStarwarsData(starwarsData);
        setShowS(true);
        setShowU(false);
        setShowI(false);
        setShowA(false);
        setTimeout(() => setShowS(false), 3000);
      }
      else{
        // console.log("token invalid");
        setShowI(true);
        setShowU(false);
        setShowS(false);
        setShowA(false);
        setTimeout(() => setShowI(false), 3000);
      }
    } catch (error) {
      // console.log(error)
      // console.log("token invalid!!!");
      setShowI(true);
      setShowU(false);
      setShowS(false);
      setShowA(false);
      setTimeout(() => setShowI(false), 3000);
    }
  }

  const getSelection=(event)=>{
    setChosen(true);
    setArea(event.target.value);
    if(event.target.value==="my"){
      setAreaC("马来西亚");
      setStartDate (15);
      setStartHour (9);
      setEndHour (9);
      setStartMinute (0);
      setEndMinute (30);
    }
    else if(event.target.value==="sg"){
      setAreaC("新加坡");
      setStartDate (15);
      setStartHour (10);
      setEndHour (10);
      setStartMinute (0);
      setEndMinute (30);
    }
    else if(event.target.value==="hk"){
      setAreaC("香港");
      setStartDate (15);
      setStartHour (11);
      setEndHour (11);
      setStartMinute (0);
      setEndMinute (30);
    }
    else if(event.target.value==="mc"){
      setAreaC("澳门");
      setStartDate (15);
      setStartHour (14);
      setEndHour (14);
      setStartMinute (0);
      setEndMinute (30);
    }
    else if(event.target.value==="au"){
      setAreaC("澳大利亚");
      setStartDate (15);
      setStartHour (15);
      setEndHour (15);
      setStartMinute (0);
      setEndMinute (30);
    }
    else if(event.target.value==="cm"){
      setAreaC("中国大陆");
      setStartDate (15);
      setStartHour (16);
      setEndHour (16);
      setStartMinute (0);
      setEndMinute (30);
    }
    else if(event.target.value==="uk"){
      setAreaC("英国");
      setStartDate (15);
      setStartHour (17);
      setEndHour (17);
      setStartMinute (0);
      setEndMinute (30);
    }
    else{
      setChosen(false);
      setAreaC("");
      setStartDate (0);
      setStartHour (0);
      setEndHour (0);
      setStartMinute (0);
      setEndMinute (0);
    }
  }
  
  const startTime = useCallback(() => {
    try{
      getTime().then(result=>{
        // console.log(result);
        var h = result.hour;
        var m = result.minute;
        var s = result.second;
        starwarsData.second = result.second;
        starwarsData.minute = result.minute;
        starwarsData.hour = result.hour;
        m = checkTime(m);
        s = checkTime(s);
        try {
          document.getElementById('current-time').innerHTML =
          h + ":" + m + ":" + s;
        } catch(error){
          // console.log(error);
          return;
        }
      });
    }
    catch(error){
      return;
    }

    // var n = Intl.DateTimeFormat().resolvedOptions().timeZone
    var t = setTimeout(startTime, 500);
  },[])

  function checkTime(i) {
    if (i < 10) {i = '0' + i};  // add zero in front of numbers < 10
    return i;
  }

  useEffect(() => {

    if(st){
      startTime();
      setSt(false);
    }
    
    if(changed){
      fetchTZ(starwarsData.token); 
      try{
        getTime().then(result=>{
          starwarsData.second = result.second;
          starwarsData.minute = result.minute;
          starwarsData.hour = result.hour;
        })
      }
      catch(error){
        // console.log(1);
        return;
      }
      // setTimeout(() => checkUsed(starwarsData.token), 0);
      checkUsed(starwarsData.token);
      setChanged(false);
    }
  },[st, changed, startTime, starwarsData, checkUsed])


  return (
      <div className = "starwarscont">

        {/* <iframe id = "times" src="https://freesecure.timeanddate.com/clock/i7plm3sb/n236/fn7/fs20/tct/pct/ftb/th1" frameBorder="0" width="93" height="30" allowtransparency="true"></iframe> */}

        <Alert show={showS} className= "swalert" variant="success" onClose={() => setShowS(false)} dismissible>
          <Alert.Heading className = "alertHeading"> 提交成功！ </Alert.Heading>
        </Alert>
        <Alert show={showU} className= "swalert" variant="danger" onClose={() => setShowU(false)} dismissible>
          <Alert.Heading className = "alertHeading"> 代码已被使用！成绩将按照此次提交时间为准！ </Alert.Heading>
        </Alert>
        <Alert show={showI} className= "swalert" variant="danger" onClose={() => setShowI(false)} dismissible>
          <Alert.Heading className = "alertHeading"> 代码不存在！ </Alert.Heading>
        </Alert>
        <Alert show={showA} className= "swalert" variant="danger" onClose={() => setShowA(false)} dismissible>
          <Alert.Heading className = "alertHeading"> 地区与时间不相符 ！ </Alert.Heading>
        </Alert>
        <header className="SWtitle">电子抽签</header>
        <div className="time">
          <div className = "sgtime">
            新加坡时间
          </div>
          <div id="time-box"><em id="current-time" /></div>
        </div>

        <div className={`counttime ${!chosen ? "invi" : ""}`}>
          <div className = "area">
            <span>{areaC}</span>
            <span>地区抽签时段</span>
          </div>
          <div className="start">
            <span>开始时间 </span>
            <span>{startHour}:{startMinute}:00</span>
          </div>
          <div className="end">
            <span>结束时间 </span>
            <span>{endHour}:{endMinute}:00</span>
          </div>
        </div>
        <section className="SWsection">
          <Form.Control
            as="select"
            className="areaSelection"
            id="inlineFormCustomSelect"
            onChange={(e) => getSelection(e)}
          >
            <option className = "area" value="">请选择地区</option>
            {areas.map(area => (
              <option key={area.value} value={area.value} >{area.area}</option>
            ))}
          </Form.Control>
          <form className="SWform" onSubmit = {onSubmit}>
            <input type="text" className={`form-control englsihF`}  value={starwarsData.token} placeholder="请输入代码" onChange={(e) => setChanged(true) & setStarwarsData({ ...starwarsData, token: e.target.value }) } autoFocus disabled={!chosen}/> 
            <button  type="submit" className="btn btn-primary SWbutton " data-toggle="modal" value='Save Form' disabled={submitted||!chosen}>
              <span className = "englishF" > Submit / </span> <span> 提交 </span>
            </button>
            {/* <a href="#" target="_blank">忘记代码？</a> */}
          </form>
        </section>
        <Footer />
      </div>
  )
}

export default StarWars
