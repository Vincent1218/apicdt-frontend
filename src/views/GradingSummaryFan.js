import { useState, useEffect} from 'react'
import React from 'react'
import Alert from 'react-bootstrap/Alert';
import { useLocation } from "react-router-dom";
import {serverURL} from '../config.js'
import Footer from '../components/Footer'
import Button from '@material-ui/core/Button';
import './css/GradingImpression.css';
import StepperFan from '../components/StepperFan';
import GradingDialog from '../components/GradingDialog'
import {useHistory} from 'react-router';

const GradingSummaryFan = () => {
  const location = useLocation();
  const [gradingSummaryFanData, setGradingSummaryFanData] = useState ({token:location.token, indexT: location.indexT ,judgeChiName:location.judgeChiName ,summary: 0 });

  const [showS, setShowS] = useState(false);
  const [showF, setShowF] = useState(false);
  const [start, setStart] = useState(true);
  const [dialogOpen,setDialogOpen]=useState(false);

  const onClickTeam = (selectedTeam) =>{
    if(parseInt(selectedTeam)!=gradingSummaryFanData.summary){
      setGradingSummaryFanData({ ...gradingSummaryFanData, summary: parseInt(selectedTeam) })
    }
  }

  const history = useHistory();

  const getParameterByName= (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  const findGradingSummaryFan = async (indexT,token) => {
    if(indexT === ''){
      return;
    }
    const res = await fetch('https://apicdt-server.com'+'/gradingSummaryFan/'+indexT+'/'+token)
    // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+indexT)
    const data = await res.json()
    if(data.length>0){
      setTimeout(() => history.push({
        pathname: '/',
      }), 1000);  
    }
    else{
      return;
    }
  } 

  if(start){
    if((getParameterByName('indexT')===null)|| (getParameterByName('token')===null)){
      setTimeout(() => history.push({
          pathname: '/judgeLogin',
      }), 1000);
    }
    gradingSummaryFanData.token = getParameterByName('token')
    gradingSummaryFanData.indexT = getParameterByName('indexT') 
    setGradingSummaryFanData({ ...gradingSummaryFanData, judgeChiName: getParameterByName('judgeChiName') })
    findGradingSummaryFan(getParameterByName('indexT'),getParameterByName('token'))
    setStart(false)
  }

  const addGradingSummary = async (summary) =>{
    const res = await fetch (('https://apicdt-server.com/'+'gradingSummaryFan'),{
      method : 'POST',
      headers:{
        'Content-type':'application/json',
      },
      body: JSON.stringify(summary),
    })
    const data = await res.json()
    if (res.status === 201){
      setShowS(true);
      setShowF(false);
      setTimeout(() => history.push({
        pathname: '/',
      }), 1000);
    }
    else{
      setShowF(true);
      setShowS(false);
    }
  }

  

  const onSubmit = (e) =>{
    e.preventDefault()
    setDialogOpen(false);
    if(!gradingSummaryFanData.summary){
      setShowF(true);
      setShowS(false);
      return;
    }
    // console.log(gradingSummaryFanData)
    addGradingSummary(gradingSummaryFanData);
    setTimeout(() => {
      setGradingSummaryFanData({ ...gradingSummaryFanData, summary: 0})
    }, 950);
  }

  const checkSelected = () =>{
    if(!gradingSummaryFanData.summary){
      setShowF(true);
      setShowS(false);
      setTimeout(() => {setShowF(false)}, 1000);
      return;
    }
    setDialogOpen(true)
  } 
  
  
  
  return (
    <section className="header-gradient"> 
      <GradingDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        submit={onSubmit}
        content={<div><div style={{marginBottom:"10px"}} className="d-flex justify-content-center">您选择的是</div><h3 className="d-flex justify-content-center">{gradingSummaryFanData.summary === 1 ? "正方" : gradingSummaryFanData.summary===2?"反方":""}</h3></div>} 
        />
      <div className=" main_block">
        <Alert show={showS} className= "alert" variant="success" onClose={() => setShowS(false)} dismissible>
          <Alert.Heading className = "alertHeading"> 提交成功 ！/ Submitted Successfully ！ </Alert.Heading>
        </Alert>
        <Alert show={showF} className= "alert" variant="danger" onClose={() => setShowF(false)} dismissible>
          <Alert.Heading className = "alertHeading"> 提交失败 ！/ Submission Failed ！ </Alert.Heading>
        </Alert>
        <div className="fan_title">
          <span> 返尔赛 </span>
        </div>
        <StepperFan step={2} />
        <div className="register_header d-flex justify-content-center">
           <span> 总结票 </span>
        </div>
        <div className="regBlock row">
          <form className="col-12 regForm" noValidate onSubmit={()=>setDialogOpen(true)}>
            <div className="d-flex justify-content-center">请选择正方或反方</div>
            <div className="school d-flex justify-content-center">
              <Button variant="contained" size="large" style={{color:"#fff", margin:"20px"}} className={gradingSummaryFanData.summary===1?"pressedButton btn-hover":"normalButton btn-hover"} onClick={()=>onClickTeam('1')}><div style={{width:"120%",margin:"20%",fontSize:"250%"}}>正方</div></Button>
              <Button variant="contained" size="large" style={{color:"#fff", margin:"20px"}} className={gradingSummaryFanData.summary===2?"pressedButton btn-hover":"normalButton btn-hover"} onClick={()=>onClickTeam('2')}><div style={{width:"120%",margin:"20%",fontSize:"250%"}}>反方</div></Button>
            </div>
            <div className="d-flex justify-content-center">{gradingSummaryFanData.summary===0?"":<div><span>您选择的是：</span><span>{gradingSummaryFanData.summary===1?"正方":"反方"}</span></div>}</div>
 
            <button  type="button" onClick={checkSelected} className="btn sub btn btn-primary" data-toggle="modal" data-target="#exampleModal" value='Save Form'>
              <span className = "englishF"> Submit / </span> <span> 提交 </span>
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default GradingSummaryFan;
