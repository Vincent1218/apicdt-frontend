import { useState } from 'react'
import React from 'react'

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';


import { serverURL } from '../config.js'

import Footer from '../components/Footer'
import './css/GradingBestCand.css'
import Stepper from '../components/Stepper';
import GradingDialog from '../components/GradingDialog'
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom'

const GradingBestCand = () => {
    const location = useLocation();
    const [speakers, setSpeakers] = useState([{ 'name': "正方一辩" }, { 'name': "正方二辩" }, { 'name': "正方三辩" }, { 'name': "正方四辩" }, { 'name': "反方一辩" }, { 'name': "反方二辩" }, { 'name': "反方三辩" }, { 'name': "反方四辩" }]);
    const [selected, setSelected] = useState(['', '', ''])
    const [start, setStart] = useState(true);
    const [showS, setShowS] = useState(false);
    const [showF, setShowF] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);

    const getSelection = (e, i) => {
        const temp = (e.target.value);
        const newS = selected.map((x) => x);
        newS[i] = temp;

        setSelected(newS);
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

    const addGradingBestCand = async (selected) => {
        const res = await fetch(('https://apicdt-server.com/' + 'gradingBestCand'), {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                selected: selected,
                // token: location.token,
                // indexT: location.indexT,
                // judgeChiName: location.judgeChiName
                token: getParameterByName('token'),
                indexT: getParameterByName('indexT'),
                judgeChiName: getParameterByName('judgeChiName'),
            }),
        })
        const data = await res.json()
        if (res.status === 201) {
            setShowS(true);
            setShowF(false);
            var queryString = "?token=" + getParameterByName('token') +"&indexT="+getParameterByName('indexT')+"&judgeChiName="+getParameterByName('judgeChiName');
            setTimeout(() => {
              window.location.href = "gradingSummary" + queryString;
            }, 1000);
            // setTimeout(() => history.push({
            //     pathname: '/gradingSummary',
            //     token: location.token,
            //     indexT: location.indexT,
            //     judgeChiName: location.judgeChiName
            // }), 1000);
        }
        else {
            setShowF(true);
            setShowS(false);
        }
    }

    const findGradingBestCand = async (indexT,token) => {
        if(indexT === ''){
          return;
        }
        const res = await fetch('https://apicdt-server.com'+'/gradingBestCand/'+indexT+'/'+token)
        // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+indexT)
        const data = await res.json()
        if(data.length>0){
          var queryString = "?token=" +token +"&indexT="+indexT+"&judgeChiName="+getParameterByName('judgeChiName');
          setTimeout(() => {
            window.location.href = "gradingSummary" + queryString;
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
        findGradingBestCand(getParameterByName('indexT'),getParameterByName('token'))
        setStart(false);
    }

    const onSubmit = (e) => {
        e.preventDefault()
        setDialogOpen(false);

        addGradingBestCand(selected);
        setSelected(['', '', '']);


    }

    const checkSelected = () =>{
        if (selected.includes('') || new Set(selected).size !== selected.length) {
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
             <div className="main_block">

                <Alert show={showS} className="alert" variant="success" onClose={() => setShowS(false)} dismissible>
                    <Alert.Heading className="alertHeading"> 提交成功 ！/ Submitted Successfully ！ </Alert.Heading>
                </Alert>
                <Alert show={showF} className="alert" variant="danger" onClose={() => setShowF(false)} dismissible>
                    <Alert.Heading className="alertHeading"> 提交失败 ！/ Submission Failed ！ </Alert.Heading>
                </Alert>
                <GradingDialog
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                    submit={onSubmit}
                    content={<div><div style={{marginBottom:"10px"}} className="d-flex justify-content-center">您选择的是</div><div>{selected.map((cand)=>(<h4 className="d-flex justify-content-center">{cand}</h4>))}</div></div>} 
                    />
                <div className="register_header">
                    <span> 正赛 </span>
                </div>
                <Stepper step={2} />
                <div className="register_header d-flex justify-content-center">
                    <span> 最佳辩手候选 </span>
                </div>
                <div className="regBlock row">
                    <form className="col-12 regForm" noValidate>
                        <div className="d-flex justify-content-center">请选择三位最佳辩手候选人(请勿复选)</div>
                        <div className="school col d-flex justify-content-center selection">
                            <Form.Control className="selectspeaker col-12 col-md-4" as="select" onChange={(e) => getSelection(e, 0)} style={{ width: "50vw", margin: "10px" }}>
                                <option value='' >
                                    第一位候选人
                                </option>
                                {speakers.map(speaker => (
                                    <option key={speaker.name} value={speaker.name} >{speaker.name}</option>
                                ))}

                            </Form.Control>

                            <Form.Control className="selectspeaker col-12 col-md-4" as="select" onChange={(e) => getSelection(e, 1)} style={{ width: "50vw", margin: "10px" }}>
                                <option value='' >
                                    第二位候选人
                                </option>
                                {speakers.map(speaker => (
                                    <option key={speaker.name} value={speaker.name} >{speaker.name}</option>
                                ))}

                            </Form.Control>

                            <Form.Control className="selectspeaker col-12 col-md-4" as="select" onChange={(e) => getSelection(e, 2)} style={{ width: "50vw", margin: "10px" }}>
                                <option value='' >
                                    第三位候选人
                                </option>
                                {speakers.map(speaker => (
                                    <option key={speaker.name} value={speaker.name} >{speaker.name}</option>
                                ))}

                            </Form.Control>
                        </div>

                        <button type="button" onClick={checkSelected} className="btn sub btn btn-primary" data-toggle="modal" data-target="#exampleModal" value='Save Form'>
                            <span className="englishF"> Submit / </span> <span> 提交 </span>
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </section>
    );
}

export default GradingBestCand;