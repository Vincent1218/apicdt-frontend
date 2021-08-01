import { useState ,useEffect } from 'react'
import React from 'react'
import './css/Register.css';
import logo from '../assets/image/yatai 10th logo700.png';

import Alert from 'react-bootstrap/Alert';

import {serverURL} from '../config.js'

import Footer from '../components/Footer'

const RegisterTopic = () => {
  const [registerTopicData, setRegisterTopicData] = useState ({topic : '', indexT: '' ,judgeNo:'' , stimeh : '', stimem : '', etimeh : '', etimem : '', date: '',isRoadShow: ''});
  const[changed_1,setChanged_1] = useState(false);
  const[changed_2,setChanged_2] = useState(false);
  const[changed_3,setChanged_3] = useState(false);
  const[changed_4,setChanged_4] = useState(false);
  const[changed_5,setChanged_5] = useState(false);
  const[changed_6,setChanged_6] = useState(false);
  const[changed_7,setChanged_7] = useState(false);
  
  const [start,setStart] = useState(true);

  const [showS, setShowS] = useState(false);
  const [showF, setShowF] = useState(false);



  useEffect(() => {
    if(start){
      // registerTopicData.indexT = fetchTopic();
      
      fetchTopic().then(result=>{
        setRegisterTopicData({ ...registerTopicData, indexT: result })
      });
      // registerTopicData.indexT = 10;
      setStart(false);
    }
  });

  const addRegisterTopicData = async (registerTopicData) =>{
    const res = await fetch ('https://apicdt-server.com/registerTopic',{
    // const res = await fetch ((serverURL+'registerTopic'),{
      method : 'POST',
      headers:{
        'Content-type':'application/json',
      },
      body: JSON.stringify(registerTopicData),
    })
    const data = await res.json()
    if (res.status === 201){
      setShowS(true);
      setShowF(false);
      setStart(true);
    }
    else{
      setShowF(true);
      setShowS(false);
    }
  }

  const fetchTopic = async () => {
    // const res = await fetch('https://apicdt-server.com/registerTopic')
    const res = await fetch('https://apicdt-server.com' + '/registerTopic')
    // const res = await fetch(serverURL+'registerTopic')
    const data = await res.json()
    var temp = data.length;

    return (temp+1);

  }
  
  const original = () =>{
    registerTopicData.isRoadShow = false;
  }

  const roadshow = () =>{
    registerTopicData.isRoadShow = true;
  }

  

  const onSubmit = (e) =>{
    e.preventDefault()
    console.log(registerTopicData);
    if(registerTopicData.topic === '' ||
    registerTopicData.stimeh === '' ||
    registerTopicData.stimem === '' ||
    registerTopicData.etimeh === '' ||
    registerTopicData.etimem === '' ||
    registerTopicData.date === ''  ||
    registerTopicData.isRoadShow === '' ||
    registerTopicData.judgeNo === '' ){
      setShowF(true);
      setShowS(false);
      return;
    }
  
    addRegisterTopicData(registerTopicData);
    setRegisterTopicData ({topic : '', indexT: 0, judgeNo: '' , stimeh : '', stimem : '', etimeh : '', etimem : '', date :'', isRoadShow: ''});
    setChanged_1(false);
    setChanged_2(false);
    setChanged_3(false);
    setChanged_4(false);
    setChanged_5(false);
    setChanged_6(false);
    setChanged_7(false);
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
          <span> 辩题记录 </span>
        </div>
        <div className="regBlock row">
          <form className="col-md-8 col-12 regForm" noValidate onSubmit = {onSubmit}>

            <div className="school container">
              <div className="schoolPart formHeader">
                 <span> 辩题 </span> <span> {registerTopicData.indexT} </span>
              </div>
              <div className="row schoolPartForm">
                <div className="mb-3 col-12">
                  <input type="text" className={`form-control englsihF  ${registerTopicData.topic ? "is-valid" : ""} ${(!registerTopicData.topic && changed_1) ? "is-invalid" : ""}`}  value={registerTopicData.topic} placeholder="辩题" onChange={(e) => setChanged_1(true) & setRegisterTopicData({ ...registerTopicData, topic: e.target.value })} />
                </div>
              </div>
              <div className="schoolPart formHeader">
                 <span> 评审数量 </span>
              </div>
              <div className="row schoolPartForm">
                <div className="mb-6 col-12">
                  <input type="text" className={`form-control englsihF  ${registerTopicData.judgeNo ? "is-valid" : ""} `}  value={registerTopicData.judgeNo} placeholder="评审数量" onChange={(e) => setChanged_7(true) & setRegisterTopicData({ ...registerTopicData, judgeNo: e.target.value })} />
                </div>
              </div>
              <div className="schoolPart formHeader">
                 <span> 时间 </span>
              </div>
              <div className="row schoolPartForm">
                <div className="mb-3 col-6">
                  <input type="text" className={`form-control englsihF  ${registerTopicData.stimeh ? "is-valid" : ""} ${(!registerTopicData.stimeh && changed_2) ? "is-invalid" : ""}`}  value={registerTopicData.stimeh} placeholder="开始时间（小时）" onChange={(e) => setChanged_2(true) & setRegisterTopicData({ ...registerTopicData, stimeh: e.target.value })} />
                </div>
                <div className="mb-3 col-6">
                  <input type="text" className= {`form-control ${registerTopicData.stimem ? "is-valid" : ""} ${(!registerTopicData.stimem && changed_3) ? "is-invalid" : ""}`}  value={registerTopicData.stimem} placeholder="开始时间（分钟）" onChange={(e) => setChanged_3(true) & setRegisterTopicData({ ...registerTopicData, stimem: e.target.value })} />
                </div>
              </div>
              <div className="row schoolPartForm">
                <div className="mb-3 col-6">
                  <input type="text" className={`form-control englsihF  ${registerTopicData.etimeh ? "is-valid" : ""} ${(!registerTopicData.etimeh && changed_4) ? "is-invalid" : ""}`}  value={registerTopicData.etimeh} placeholder="结束时间（小时）" onChange={(e) => setChanged_4(true) & setRegisterTopicData({ ...registerTopicData, etimeh: e.target.value })} />
                </div>
                <div className="mb-3 col-6">
                  <input type="text" className= {`form-control ${registerTopicData.etimem ? "is-valid" : ""} ${(!registerTopicData.etimem && changed_5) ? "is-invalid" : ""}`}  value={registerTopicData.etimem} placeholder="结束时间（分钟）" onChange={(e) => setChanged_5(true) & setRegisterTopicData({ ...registerTopicData, etimem: e.target.value })} />
                </div>
              </div>
              <input type="text" className= {`form-control ${registerTopicData.date ? "is-valid" : ""} ${(!registerTopicData.date && changed_6) ? "is-invalid" : ""}`}  value={registerTopicData.date} placeholder="日期（几号）" onChange={(e) => setChanged_6(true) & setRegisterTopicData({ ...registerTopicData, date: e.target.value })} />
              <div className="row TopicType">
                <div  onClick={original} className="col-5 btn topicbtn btn-primary" >
                   <span> 正赛 </span>
                </div>
                <div onClick={roadshow} className="col-5 btn topicbtn btn-primary" >
                   <span> 返尔赛 </span>
                </div>
              </div>
            </div>
            <div className="form-text remarks">备注：请以24小时制来填写时间 </div>
 
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

export default RegisterTopic;
