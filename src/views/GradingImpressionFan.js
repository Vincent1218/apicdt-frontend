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

const GradingImpressionFan = () => {
  const location = useLocation();
  const [gradingImpressionFanData, setGradingImpressionFanData] = useState ({token:location.token, indexT: location.indexT ,judgeChiName:location.judgeChiName, impression: 0 });

  const [showS, setShowS] = useState(false);
  const [showF, setShowF] = useState(false);
  const [start, setStart] = useState(true);
  const [dialogOpen,setDialogOpen]=useState(false);

  const onClickTeam = (selectedTeam) =>{
    if(parseInt(selectedTeam)!=gradingImpressionFanData.impression){
      setGradingImpressionFanData({ ...gradingImpressionFanData, impression: parseInt(selectedTeam) })
    }
  }

  const getParameterByName= (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  
  const findGradingImpressionFan = async (indexT,token) => {
    if(indexT === ''){
      return;
    }
    const res = await fetch('https://apicdt-server.com'+'/gradingImpressionFan/'+indexT+'/'+token)
    // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+indexT)
    const data = await res.json()
    if(data.length>0){
      console.log("ASD")
      var queryString = "?token=" +token +"&indexT="+indexT+"&judgeChiName="+getParameterByName('judgeChiName');
      setTimeout(() => {
        window.location.href = "gradingSummaryFan" + queryString;
      }, 1000);
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
    findGradingImpressionFan(getParameterByName('indexT'),getParameterByName('token'))
    gradingImpressionFanData.token = getParameterByName('token')
    gradingImpressionFanData.indexT = getParameterByName('indexT') 
    setGradingImpressionFanData({ ...gradingImpressionFanData, judgeChiName: getParameterByName('judgeChiName') })
    setStart(false)
  }

  const addGradingImpression = async (impression) =>{
    const res = await fetch (('https://apicdt-server.com/'+'gradingImpressionFan'),{
      method : 'POST',
      headers:{
        'Content-type':'application/json',
      },
      body: JSON.stringify(impression),
    })
    const data = await res.json()
    if (res.status === 201){
      setShowS(true);
      setShowF(false);
      var queryString = "?token=" +gradingImpressionFanData.token +"&indexT="+gradingImpressionFanData.indexT+"&judgeChiName="+gradingImpressionFanData.judgeChiName;
      setTimeout(() => {
        window.location.href = "gradingSummaryFan" + queryString;
      }, 1000);
      // setTimeout(() => history.push({
      //   pathname: '/gradingSummaryFan',
      //   token: gradingImpressionFanData.token,
      //   indexT: gradingImpressionFanData.indexT,
      //   judgeChiName:gradingImpressionFanData.judgeChiName,
      // }), 1000);
    }
    else{
      setShowF(true);
      setShowS(false);
    }
  }

  

  const onSubmit = (e) =>{
    e.preventDefault()
    setDialogOpen(false);
    addGradingImpression(gradingImpressionFanData);

    setTimeout(() => {
      setGradingImpressionFanData({ ...gradingImpressionFanData, impression: 0})
    }, 900);
  }

  const checkSelected = () =>{
    if(!gradingImpressionFanData.impression){
      setShowF(true);
      setShowS(false);
      setTimeout(() => {setShowF(false)}, 1000);
      return;
    }
    setDialogOpen(true)
  } 
  
  const history = useHistory();
  
  return (
    <section className="header-gradient"> 
      <GradingDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        submit={onSubmit}
        content={<div><div style={{ marginBottom: "10px" }} className="d-flex justify-content-center">您选择的是</div><h3 className="d-flex justify-content-center">{gradingImpressionFanData.impression === 1 ? "正方" : gradingImpressionFanData.impression===2?"反方":""}</h3></div>} 
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
        <StepperFan step={1} />
        <div className="register_header d-flex justify-content-center">
           <span> 印象票 </span>
        </div>
        <div className="regBlock row">
          <form className="col-12 regForm" noValidate>
            <div className="d-flex justify-content-center">请选择正方或反方</div>
            <div className="school  d-flex justify-content-center">
              <Button variant="contained" size="large" style={{color:"#fff", margin:"20px"}} className={gradingImpressionFanData.impression===1?"pressedButton btn-hover":"normalButton btn-hover"} onClick={()=>onClickTeam('1')}><div style={{width:"120%",margin:"20%",fontSize:"250%"}}>正方</div></Button>
              <Button variant="contained" size="large" style={{color:"#fff", margin:"20px"}} className={gradingImpressionFanData.impression===2?"pressedButton btn-hover":"normalButton btn-hover"} onClick={()=>onClickTeam('2')}><div style={{width:"120%",margin:"20%",fontSize:"250%"}}>反方</div></Button>
            </div>
            <div className="d-flex justify-content-center">{gradingImpressionFanData.impression===0?"":<div><span>您选择的是：</span><span>{gradingImpressionFanData.impression===1?"正方":"反方"}</span></div>}</div>
 
            <button type="button" onClick={checkSelected} className="btn sub btn btn-primary" data-toggle="modal" data-target="#exampleModal" value='Save Form'>
              <span className = "englishF"> Submit / </span> <span> 提交 </span>
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default GradingImpressionFan;
