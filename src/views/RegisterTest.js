import { useState } from 'react'
import React from 'react'
import './css/Register.css';
import logo from '../assets/image/yatai 10th logo700.png';
import Alert from 'react-bootstrap/Alert';
import {serverURL} from '../config.js'
import Footer from '../components/Footer'

const RegisterTest= () => {
  const [registerTestData, setRegisterTestData] = useState ({chiTeamLeaderName : ''});
  const [changed_4,setChanged_4] = useState(false);
  const [showS, setShowS] = useState(false);
  const [showF, setShowF] = useState(false);


  const addRegisterTestData = async (registerTestData) =>{
    const res = await fetch ((serverURL+'registerTest'),{
      method : 'POST',
      headers:{
        'Content-type':'application/json',
      },
      body: JSON.stringify(registerTestData),
    })
    const data = await res.json()
    if (res.status === 201){
      setShowS(true);
      setShowF(false);
    }
    else{
      setShowF(true);
      setShowS(false);
    }
  }

  const onSubmit = (e) =>{
    e.preventDefault()
    if(registerTestData.chiTeamLeaderName === ''){
      setShowF(true);
      setShowS(false);
      return;
    }

    addRegisterTestData(registerTestData);
    setRegisterTestData ({chiTeamLeaderName : ''});
    setChanged_4(false);
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
        <div className="register_header">
            <span className = "englishF"> Register / </span> <span> 报名 </span>
        </div>
        <div className="regBlock row">
          <form className="col-md-8 col-12 regForm" noValidate onSubmit = {onSubmit}>
            <div className="leader container">
              <div className="leaderPart formHeader">
                  <span className = "englishF"> Particulars of Team Leader / </span> <span> 队长资料 </span>
              </div>
              <div className="row leaderPartForm">
                <div className="mb-3 col-12">
                  <input type="text" className={`form-control   ${registerTestData.chiTeamLeaderName ? "is-valid" : ""} ${(!registerTestData.chiTeamLeaderName && changed_4) ? "is-invalid" : ""}`} value={registerTestData.chiTeamLeaderName} placeholder="队长姓名" onChange={(e) => setChanged_4(true) & setRegisterTestData({ ...registerTestData, chiTeamLeaderName: e.target.value })}/>
                </div>
              </div>
            </div>
            <button  type="submit" className="btn sub btn btn-primary" data-toggle="modal" data-target="#exampleModal" value='Save Form'>
              <span className = "englishF"> Submit / </span> <span> 提交 </span>
            </button>
          </form>
          <div className="col-4">
            <img src= {logo} alt="Asia-Pacific Intervarsity Chinese Debate Tournament" className="registerTest-page-logo" width="80%" />
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default RegisterTest;
