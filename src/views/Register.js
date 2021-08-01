import { useState } from 'react'
import React from 'react'
import './css/Register.css';
import logo from '../assets/image/yatai 10th logo700.png';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import inis from "../components/json/inis.json";

import {serverURL} from '../config.js'

import Footer from '../components/Footer'

const Register = () => {
  const [registerData, setRegisterData] = useState ({engSchoolName : '',chiSchoolName : '',engTeamLeaderName : '',chiTeamLeaderName : '',teamLeaderContact : '',teamLeaderEmail : '',debateTopics_1 : '',debateTopics_2 : ''});
  const[changed_1,setChanged_1] = useState(false);
  const[changed_2,setChanged_2] = useState(false);
  const[changed_3,setChanged_3] = useState(false);
  const[changed_4,setChanged_4] = useState(false);
  const[changed_5,setChanged_5] = useState(false);
  const[changed_6,setChanged_6] = useState(false);
  const[changed_7,setChanged_7] = useState(false);
  const[changed_8,setChanged_8] = useState(false);

  const[prefix,setPrefix] = useState('');

  const[isEmail1,setIsEmail1] = useState(false);


  const [showS, setShowS] = useState(false);
  const [showF, setShowF] = useState(false);
  const [showA, setShowA] = useState(false);




  const addRegisterData = async (registerData) =>{
    const res = await fetch ((serverURL+'register'),{
      method : 'POST',
      headers:{
        'Content-type':'application/json',
      },
      body: JSON.stringify(registerData),
    })
    const data = await res.json()
    if (res.status === 201){
      setShowS(true);
      setShowF(false);
      setShowA(false);
    }
    else if (res.status === 401){
      setShowS(false);
      setShowF(false);
      setShowA(true);
    }
    else{
      setShowF(true);
      setShowS(false);
      setShowA(false);
    }
  }
  
  const isEmail=(val)=>{
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // let regEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if(regEmail.test(val)){
      setIsEmail1(true);
    }
    else{
      setIsEmail1(false);
    }
    // console.log(isEmail1);
  }

  const getSelection=(event)=>{
    setPrefix(event.target.value);
  }

  const onSubmit = (e) =>{
    e.preventDefault()
    isEmail(registerData.teamLeaderEmail);
    // console.log(isEmail1);
    if(registerData.engSchoolName === '' ||
    registerData.chiSchoolName === '' ||
    registerData.engTeamLeaderName === '' ||
    registerData.chiTeamLeaderName === '' ||
    registerData.teamLeaderContact === '' ||
    registerData.teamLeaderEmail === '' ||
    registerData.debateTopics_1 === '' ||
    registerData.debateTopics_2 ==='' ||
    prefix ==='' ||
    isEmail1 === false){
      setShowF(true);
      setShowS(false);
      setShowA(false);
      return;
    }
    
    registerData.teamLeaderContact = prefix+registerData.teamLeaderContact

    addRegisterData(registerData);
    setRegisterData ({engSchoolName : '',chiSchoolName : '',engTeamLeaderName : '',chiTeamLeaderName : '',teamLeaderContact : '',teamLeaderEmail : '',debateTopics_1 : '',debateTopics_2 : ''});
    setChanged_1(false);
    setChanged_2(false);
    setChanged_3(false);
    setChanged_4(false);
    setChanged_5(false);
    setChanged_6(false);
    setChanged_7(false);
    setChanged_8(false);

  }
  
  return (
    <section className="header-gradient"> 
      <div className="container main_block">
        <Alert show={showS} className= "alert" variant="success" onClose={() => setShowS(false)} dismissible>
          <Alert.Heading className = "alertHeading"> 提交成功 ！/ Registration Successful ！ </Alert.Heading>
        </Alert>
        <Alert show={showF} className= "alert" variant="danger" onClose={() => setShowF(false)} dismissible>
          <Alert.Heading className = "alertHeading"> 提交失败 ！/ Registration Failed ！ </Alert.Heading>
        </Alert>
        <Alert show={showA} className= "alert" variant="danger" onClose={() => setShowA(false)} dismissible>
          <Alert.Heading className = "alertHeading"> 电子邮件重复 ！/ Email Duplicated ！ </Alert.Heading>
        </Alert>
        <div className="register_header">
            <span className = "englishF"> Register / </span> <span> 报名 </span>
        </div>
        <div className="regBlock row">
          <form className="col-md-8 col-12 regForm" noValidate onSubmit = {onSubmit}>
            <div className="school container">
              <div className="schoolPart formHeader">
                  <span className = "englishF"> Particulars of School / </span> <span> 学校资料 </span>
              </div>
              <div className="row schoolPartForm">
                <div className="mb-3 col-6">
                  <input type="text" className={`form-control englsihF  ${registerData.engSchoolName ? "is-valid" : ""} ${(!registerData.engSchoolName && changed_1) ? "is-invalid" : ""}`}  value={registerData.engSchoolName} placeholder="Name of School" onChange={(e) => setChanged_1(true) & setRegisterData({ ...registerData, engSchoolName: e.target.value })} />
                </div>
                <div className="mb-3 col-6">
                  <input type="text" className= {`form-control ${registerData.chiSchoolName ? "is-valid" : ""} ${(!registerData.chiSchoolName && changed_2) ? "is-invalid" : ""}`}  value={registerData.chiSchoolName} placeholder="学校名称" onChange={(e) => setChanged_2(true) & setRegisterData({ ...registerData, chiSchoolName: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="leader container">
              <div className="leaderPart formHeader">
                  <span className = "englishF"> Particulars of Team Leader / </span> <span> 队长资料 </span>
              </div>
              <div className="row leaderPartForm">
                <div className="mb-3 col-6">
                  <input type="text" className={`form-control englsihF  ${registerData.engTeamLeaderName ? "is-valid" : ""} ${(!registerData.engTeamLeaderName && changed_3) ? "is-invalid" : ""}`} value={registerData.engTeamLeaderName} placeholder="Name of Team Leader" onChange={(e) => setChanged_3(true) & setRegisterData({ ...registerData, engTeamLeaderName: e.target.value })} />
                </div>
                <div className="mb-3 col-6">
                  <input type="text" className={`form-control   ${registerData.chiTeamLeaderName ? "is-valid" : ""} ${(!registerData.chiTeamLeaderName && changed_4) ? "is-invalid" : ""}`} value={registerData.chiTeamLeaderName} placeholder="队长姓名" onChange={(e) => setChanged_4(true) & setRegisterData({ ...registerData, chiTeamLeaderName: e.target.value })}/>
                </div>
              </div>
              <div className="row mb-3">
                <Form.Control
                  as="select"
                  className="col-3 mr-sm-2 selec"
                  id="inlineFormCustomSelect"
                  onChange={(e) => getSelection(e)}
                >
                  <option className = "prefix" value="">国际电话区号</option>
                  {inis.map(ini => (
                    <option value={ini.no} >{ini.no}</option>
                  ))}
                </Form.Control>
                <input type="text" className={`col contact form-control   ${registerData.teamLeaderContact ? "is-valid" : ""} ${(!registerData.teamLeaderContact && changed_5) ? "is-invalid" : ""}`}  value={registerData.teamLeaderContact} placeholder="队长联络电话" onChange={(e) => setChanged_5(true) & setRegisterData({ ...registerData, teamLeaderContact: e.target.value })}/>
              </div>
              <div className="mb-3">
                <input type="email" className={`form-control   ${(registerData.teamLeaderEmail && isEmail1) ? "is-valid" : ""} ${(!registerData.teamLeaderEmail && changed_6) ? "is-invalid" : ""}`} value={registerData.teamLeaderEmail} placeholder="队长电邮地址" onChange={(e) =>   setChanged_6(true) & setRegisterData({ ...registerData, teamLeaderEmail: e.target.value }) & isEmail(registerData.teamLeaderEmail)}/>
              </div>
            </div>
            <div className="topics container">
              <div className="ldebateTopics formHeader">
                  <span className = "englishF"> Debate Topics / </span> <span> 辩题 </span>
              </div>
              <div className="row debateTopicsForm">
                <div className="col-6">
                  <input type="text" className={`form-control  ${registerData.debateTopics_1 ? "is-valid" : ""} ${(!registerData.debateTopics_1 && changed_7) ? "is-invalid" : ""}`} value={registerData.debateTopics_1} placeholder="辩题一" onChange={(e) => setChanged_7(true) & setRegisterData({ ...registerData, debateTopics_1: e.target.value })}/>
                </div>
                <div className="col-6">
                  <input type="text" className={`form-control  ${registerData.debateTopics_2 ? "is-valid" : ""} ${(!registerData.debateTopics_2 && changed_8) ? "is-invalid" : ""}`} value={registerData.debateTopics_2} placeholder="辩题二" onChange={(e) => setChanged_8(true) & setRegisterData({ ...registerData, debateTopics_2: e.target.value })}/>
                </div>
              </div>
              <div className="form-text remarks englishF">Remarks: The topics submitted will be used for this tournament. </div>
              <div className="form-text remarks">备注：所提交之辩题将会作为本赛事之用 </div>
            </div>
            <button  type="submit" className="btn sub btn btn-primary" data-toggle="modal" data-target="#exampleModal" value='Save Form'>
              <span className = "englishF"> Submit / </span> <span> 提交 </span>
            </button>
          </form>
          <div className="col-4">
            <img src= {logo} alt="Asia-Pacific Intervarsity Chinese Debate Tournament" className="register-page-logo" width="80%" />
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Register;
