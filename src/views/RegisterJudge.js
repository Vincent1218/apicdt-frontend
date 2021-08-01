import { useState, useEffect} from 'react'
import React from 'react'
import './css/RegisterJudge.css';
import logo from '../assets/image/yatai 10th logo700.png';

import Alert from 'react-bootstrap/Alert';


import {serverURL} from '../config.js'

import Footer from '../components/Footer'

const RegisterJudge = () => {
  const [registerJudgeData, setRegisterJudgeData] = useState ({judgeChiName : '',indexA : [] });
  const[changed_1,setChanged_1] = useState(false);
  const [start,setStart] = useState(true);

  const [showS, setShowS] = useState(false);
  const [showF, setShowF] = useState(false);
  const [showT, setShowT] = useState(false);

  const addRegisterJudgeData = async (registerJudgeData) =>{
    const res = await fetch (('https://apicdt-server.com'+'/registerJudge'),{
      method : 'POST',
      headers:{
        'Content-type':'application/json',
      },
      body: JSON.stringify(registerJudgeData),
    })
    const data = await res.json()
    if (res.status === 201){
      setShowS(true);
      setTimeout(() => setShowS(false), 1000);
      setShowF(false);
    }
    else{
      setShowF(true);
      setShowS(false);
    }
  }
  


  const onSubmit = (e) =>{
    e.preventDefault()
    // console.log(isEmail1);

    if(registerJudgeData.judgeChiName === '' ||
    registerJudgeData.indexA === []){
      setShowF(true);
      setShowS(false);
      return;
    }

    addRegisterJudgeData(registerJudgeData);

    
    setRegisterJudgeData ({judgeChiName : '',indexA : []});

    setChanged_1(false);

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
        <Alert show={showT} className= "alert" variant="danger" onClose={() => setShowT(false)} dismissible>
          <Alert.Heading className = "alertHeading"> 添加失败 ！ </Alert.Heading>
        </Alert>

        <div className="register_header">
           <span> 评审资料记录 </span>
        </div>
        <div className="regBlock row">
          <form className="col-md-8 col-12 regForm" noValidate onSubmit = {onSubmit}>

            <div className="school container">
              <div className="schoolPart formHeader">
                  <span className = "englishF"> Particulars of Judge / </span> <span> 评审资料 </span>
              </div>
              <div className="row schoolPartForm">
                <div className="mb-3 col-12">
                  <input type="text" className={`form-control englsihF  ${registerJudgeData.judgeChiName ? "is-valid" : ""} ${(!registerJudgeData.judgeChiName && changed_1) ? "is-invalid" : ""}`}  value={registerJudgeData.judgeChiName} placeholder="评审姓名" onChange={(e) => setChanged_1(true) & setRegisterJudgeData({ ...registerJudgeData, judgeChiName: e.target.value })} />
                </div>
              </div>
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

export default RegisterJudge;
