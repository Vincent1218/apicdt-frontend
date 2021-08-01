import { useState, useEffect} from 'react'
import React from 'react'
import './css/RegisterJudge.css';
import logo from '../assets/image/yatai 10th logo700.png';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import inis from "../components/json/inis.json";


import {serverURL} from '../config.js'

import Footer from '../components/Footer'
import StopicList from '../components/StopicList.js';

const RegisterJudge = () => {
  const [updateJudgeData, setUpdateJudgeData] = useState ({token : '',indexA : [] });
  const[changed_1,setChanged_1] = useState(false);
  const[changed_2,setChanged_2] = useState(false);
  const[prefix,setPrefix] = useState('');
  const[topics,setTopics] = useState([]);
  const[stopics,setStopics] = useState([]);
  const [start,setStart] = useState(true);
  const [dataf,setDataf] = useState([]);


  var temptopic = '';


  const [showS, setShowS] = useState(false);
  const [showF, setShowF] = useState(false);
  const [showT, setShowT] = useState(false);
  const [showA, setShowA] = useState(false);



  useEffect(() => {
    if(start){
      fetchTopic();
      setStart(false);
    }
    if(changed_1){
      fetchTZJudge(updateJudgeData.token); 
      setChanged_1(false);
    }
  });

  const UpdateJudgeData = async (updateJudgeData) =>{
    const res = await fetch (('https://apicdt-server.com'+'/registerJudge/'+updateJudgeData.token),{
      method : 'PUT',
      headers:{
        'Content-type':'application/json',
      },
      body: JSON.stringify(updateJudgeData),
    })
    const data = await res.json()
    if (res.status === 200){
      setShowS(true);
      setTimeout(() => setShowS(false), 1000);
      setShowF(false);
      setShowA(false);
    }
    else{
      setShowF(true);
      setShowS(false);
      setShowA(false);
    }
  }


  const fetchTopic = async () => {
    // const res = await fetch('https://apicdt-server.com/registerTopic')
    const res = await fetch('https://apicdt-server.com' + '/registerTopic')
    // const res = await fetch(serverURL+'registerTopic')
    const data = await res.json()
    setTopics(data);
  }

  const getSelection=(event)=>{
    temptopic=(event.target.value);
    // console.log(temptopic);
  }

  const fetchTZJudge = async (token) => {
    if(token === ''){
      return;
    }
    
    const res = await fetch('https://apicdt-server.com'+'/registerJudge/'+token)
    // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+token)
    const data = await res.json()

    setDataf (data);
  }

  const addSelection=(event)=>{
    event.preventDefault()
    // console.log(temptopic);
    if((temptopic === 0) || (temptopic === '')){
      setShowT(true);
      setTimeout(() => setShowT(false), 1000);
      return;
    }
    // stopics.push({text : temptopic});
    setStopics([
      ...stopics,
      {topic: temptopic}
    ]);
    // console.log(stopics);

  }

  const reset = () => {
    document.getElementById("my_select").selectedIndex = 0; 
  }

  const onSubmit = (e) =>{
    e.preventDefault()
    // console.log(isEmail1);
    updateJudgeData.indexA = stopics;
    reset();

    if(updateJudgeData.token === '' ||
    updateJudgeData.indexA === [ ] ||
    stopics === [ ]){
      setShowF(true);
      setShowS(false);
      setShowA(false);
      return;
    }


    try{
      if(dataf[0].token){
         UpdateJudgeData(updateJudgeData);
      }
    } catch (error){
      setShowF(false);
      setShowS(false);
      setShowA(true);
      return;

    }

    
    setUpdateJudgeData ({token : '',indexA : []});
    setStopics([]);

    setChanged_1(false);
    setChanged_2(false);


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
        <Alert show={showA} className= "alert" variant="danger" onClose={() => setShowA(false)} dismissible>
          <Alert.Heading className = "alertHeading"> 代码不存在 ！ </Alert.Heading>
        </Alert>

        <div className="register_header">
           <span> 评审资料更新 </span>
        </div>
        <div className="regBlock row">
          <form className="col-md-8 col-12 regForm" noValidate onSubmit = {onSubmit}>

            <div className="school container">
              <div className="schoolPart formHeader">
                  <span className = "englishF"> Update Particulars of Judge / </span> <span> 评审资料更新 </span>
              </div>
              <div className="row schoolPartForm">
                <div className="mb-3 col-12">
                  <input type="text" className={`form-control englsihF  ${updateJudgeData.token ? "is-valid" : ""} ${(!updateJudgeData.token && changed_1) ? "is-invalid" : ""}`}  value={updateJudgeData.token} placeholder="评审代码" onChange={(e) => setChanged_1(true) & setUpdateJudgeData({ ...updateJudgeData, token: e.target.value })} />
                </div>
              </div>
              <div className = "row">
                <Form.Control  id = "my_select" className=" TopicSel col-9" as="select" onChange={(e) => getSelection(e)} autoComplete="off">
                    <option value = '0' autocomplete="off">
                      请选择辩题
                    </option>
                    {topics.map(topic => (
                      <option key = {topic.indexT} value={topic.indexT} >{topic.indexT} {topic.topic}</option>
                    ))}
      
                </Form.Control>
                <button  onClick={(e) => addSelection(e)} type="submit" className="JudgeBtn  col-2" >
                    <span> Add </span>
                </button>
              </div>

              <StopicList stopics={stopics}  />
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
