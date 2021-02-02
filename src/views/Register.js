import { useState } from 'react'
import React from 'react'
import './css/Register.css';
import logoBase from '../assets/image/yatai 10th logo-10.png';
import logoTop1 from '../assets/image/yatai 10th logo-bian.png';

import Alert from 'react-bootstrap/Alert';


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


  const [showS, setShowS] = useState(false);
  const [showF, setShowF] = useState(false);




  const addRegisterData = async (registerData) =>{
    const res = await fetch ('https://apicdt.herokuapp.com/register',{
      method : 'POST',
      headers:{
        'Content-type':'application/json',
      },
      body: JSON.stringify(registerData),
    })
    const data = await res.json()
    console.log(data);
    console.log('res', res) ;
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

    if(registerData.engSchoolName === '' ||
    registerData.chiSchoolName === '' ||
    registerData.engTeamLeaderName === '' ||
    registerData.chiTeamLeaderName === '' ||
    registerData.teamLeaderContact === '' ||
    registerData.teamLeaderEmail === '' ||
    registerData.debateTopics_1 === '' ||
    registerData.debateTopics_2 ==='' ){
      setShowF(true);
      setShowS(false);
      return;
    }


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
        <Alert show={showS} class= "alert" variant="success" onClose={() => setShowS(false)} dismissible>
          <Alert.Heading>提交成功 ！！</Alert.Heading>
        </Alert>
        <Alert show={showF} class= "alert" variant="danger" onClose={() => setShowF(false)} dismissible>
          <Alert.Heading>提交失败 ！！</Alert.Heading>
        </Alert>
        <div className="register_header">
            <span className = "englishF"> Register / </span> <span> 注册 </span>
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
                <div class="valid-feedback">
                  Looks good!
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
              <div className="mb-3">
                <input type="text" className={`form-control   ${registerData.teamLeaderContact ? "is-valid" : ""} ${(!registerData.teamLeaderContact && changed_5) ? "is-invalid" : ""}`}  value={registerData.teamLeaderContact} placeholder="队长联络电话" onChange={(e) => setChanged_5(true) & setRegisterData({ ...registerData, teamLeaderContact: e.target.value })}/>
              </div>
              <div className="mb-3">
                <input type="email" className={`form-control   ${registerData.teamLeaderEmail ? "is-valid" : ""} ${(!registerData.teamLeaderEmail && changed_6) ? "is-invalid" : ""}`} value={registerData.teamLeaderEmail} placeholder="队长电邮地址" onChange={(e) => setChanged_6(true) & setRegisterData({ ...registerData, teamLeaderEmail: e.target.value })}/>
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
            <button  type="submit" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" value='Save Form'>
              <span className = "englishF"> Submit / </span> <span> 提交 </span>
            </button>
          </form>
          <div className="col-4 logo">
            <img src= {logoBase} alt="Asia-Pacific Intervarsity Chinese Debate Tournament" className="ten-logo" width="80%" />
            <img src={logoTop1} alt="Asia-Pacific Intervarsity Chinese Debate Tournament" className="bian-logo" width="80%" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
