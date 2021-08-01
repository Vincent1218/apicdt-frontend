import { useState, useEffect } from 'react'
import React from 'react'

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import inis from "../components/json/inis.json";

import { serverURL } from '../config.js'

import Footer from '../components/Footer'
import Button from '@material-ui/core/Button';
import './css/GradingImpression.css';
import Stepper from '../components/Stepper';
import GradingDialog from '../components/GradingDialog'
import { useHistory, useLocation } from 'react-router';

const GradingImpression = () => {
  const [impression, setImpression] = useState(0);
  const location = useLocation();
  const [showS, setShowS] = useState(false);
  const [showF, setShowF] = useState(false);
  const [start, setStart] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const onClickTeam = (selectedTeam) => {
    if (parseInt(selectedTeam) != impression) {
      setImpression(parseInt(selectedTeam))
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

  const addGradingImpression = async (impression) => {
    const res = await fetch(('https://apicdt-server.com/' + 'gradingImpression'), {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        // token: location.token,
        // indexT: location.indexT,
        // judgeChiName: location.judgeChiName
        token: getParameterByName('token'),
        indexT: getParameterByName('indexT'),
        judgeChiName: getParameterByName('judgeChiName'),
        impression: impression,
      }),
    })
    const data = await res.json()
    if (res.status === 201) {
      setShowS(true);
      setShowF(false);
      var queryString = "?token=" + getParameterByName('token') +"&indexT="+getParameterByName('indexT')+"&judgeChiName="+getParameterByName('judgeChiName');
      setTimeout(() => {
        window.location.href = "gradingBestCand" + queryString;
      }, 1000);
      // setTimeout(() => history.push({
      //   pathname: '/gradingBestCand',
      //   token: location.token,
      //   indexT: location.indexT,
      //   judgeChiName: location.judgeChiName
      // }), 1000);
    }
    else {
      setShowF(true);
      setShowS(false);
    }
  }

  const findGradingImpression = async (indexT,token) => {
    if(indexT === ''){
      return;
    }
    const res = await fetch('https://apicdt-server.com'+'/gradingImpression/'+indexT+'/'+token)
    // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+indexT)
    const data = await res.json()
    if(data.length>0){
      var queryString = "?token=" +token +"&indexT="+indexT+"&judgeChiName="+getParameterByName('judgeChiName');
      setTimeout(() => {
        window.location.href = "gradingBestCand" + queryString;
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
    findGradingImpression(getParameterByName('indexT'),getParameterByName('token'))
    setStart(false);
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setDialogOpen(false);
    addGradingImpression(impression);
    
    setTimeout(() => {
      setImpression(0)
    }, 900);


  
  }

  const checkSelected = () =>{
    if(!impression){
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
        content={<div><div style={{ marginBottom: "10px" }} className="d-flex justify-content-center">您选择的是</div><h3 className="d-flex justify-content-center">{impression === 1 ? "正方" : impression===2?"反方":""}</h3></div>} 
        />
      <div className=" main_block">
        <Alert show={showS} className="alert" variant="success" onClose={() => setShowS(false)} dismissible>
          <Alert.Heading className="alertHeading"> 提交成功 ！/ Submitted Successfully ！ </Alert.Heading>
        </Alert>
        <Alert show={showF} className="alert" variant="danger" onClose={() => setShowF(false)} dismissible>
          <Alert.Heading className="alertHeading"> 提交失败 ！/ Submission Failed ！ </Alert.Heading>
        </Alert>
        <div className="register_header">
          <span> 正赛 </span>
        </div>
        <Stepper step={1} />
        <div className="register_header d-flex justify-content-center">
          <span> 印象票 </span>
        </div>
        <div className="regBlock row">
          <form className="col-12 regForm">
            <div className="d-flex justify-content-center">请选择正方或反方</div>
            <div className="school container d-flex justify-content-center">
              <Button variant="contained" size="large" style={{ color: "#fff", margin: "20px" }} className={impression === 1 ? "pressedButton btn-hover" : "normalButton btn-hover"} onClick={() => onClickTeam('1')}><div style={{ width: "120%", margin: "20%", fontSize: "250%" }}>正方</div></Button>
              <Button variant="contained" size="large" style={{ color: "#fff", margin: "20px" }} className={impression === 2 ? "pressedButton btn-hover" : "normalButton btn-hover"} onClick={() => onClickTeam('2')}><div style={{ width: "120%", margin: "20%", fontSize: "250%" }}>反方</div></Button>
            </div>
            <div className="d-flex justify-content-center">{impression === 0 ? "" : <div><span>您选择的是：</span><span>{impression === 1 ? "正方" : "反方"}</span></div>}</div>

            <button type="button" className="btn sub btn btn-primary" onClick={checkSelected} data-toggle="modal" data-target="#exampleModal" value='Save Form'>
              <span className="englishF"> Submit / </span> <span> 提交 </span>
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default GradingImpression;
