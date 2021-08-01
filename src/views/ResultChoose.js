import React from 'react'
import { useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useHistory } from "react-router-dom";
import './css/JudgeLogin.css'

const ResultChoose = () => {
  const [resultChooseData,setResultChooseData] = useState({indexT: '', isRoadShow:''});
  const [changed, setChanged] = useState(false);
  const[topics,setTopics] = useState([]);
  const [start,setStart] = useState(true);
  const [showS, setShowS] = useState(false);
  const [showF, setShowF] = useState(false);
  const history = useHistory();
  const onSubmit = async (e) =>{
    e.preventDefault()

    if(resultChooseData.indexT === ''){
      setShowF(true);
      setShowS(false);
      return;
    }
    if(resultChooseData.isRoadShow){ 
      setTimeout(() => history.push({
        pathname: '/resultFan',
        indexT: resultChooseData.indexT
      }), 1000);
    }
    else{
      setTimeout(() => history.push({
        pathname: '/result',
        indexT: resultChooseData.indexT
      }), 1000);
    }

    setResultChooseData ({indexT: '', isRoadShow:''});
    setChanged(false)
  }

  const fetchTopic = async () => {
    // const res = await fetch('https://apicdt-server.com/registerTopic')
    const res = await fetch('https://apicdt-server.com' + '/registerTopic')
    // const res = await fetch(serverURL+'registerTopic')
    const data = await res.json()

    setTopics(data);

  }



  const fetchTZTopic = async (indexT) => {
    if(indexT === ''){
      return;
    }
    const res = await fetch('https://apicdt-server.com'+'/registerTopic/'+indexT)
    // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+indexT)
    const data = await res.json()
    try{
      setResultChooseData({ ...resultChooseData, isRoadShow: data[0].isRoadShow });
    }
    catch(err){
      return;
    }
    
  }

  const choose = (e) => {
    resultChooseData.indexT = e;
    fetchTZTopic(e);
  }

  useEffect(() => {
    if(start){
      fetchTopic();
      setStart(false);
    }
  },[start])

    
  return (
    <div>
      <Alert show={showS} className= "jalert" variant="success" onClose={() => setShowS(false)} dismissible>
        <Alert.Heading className = "alertHeading"> 登入成功！ </Alert.Heading>
      </Alert>
      <Alert show={showF} className= "alert" variant="danger" onClose={() => setShowF(false)} dismissible>
          <Alert.Heading className = "alertHeading"> 提交失败 ！ </Alert.Heading>
      </Alert>
      <form className="SWform JudgeForm" onSubmit = {onSubmit}>
        <div className="JudgeTitle"> 
          辩题结果查看
        </div>
        

        <Form.Control  className="JudgeLoginSel" as="select" onChange={(e) =>  setChanged(true) & choose(e.target.value)  }>
            <option value = '0' >
              请选择辩题
            </option>
            {topics.map(topic => (
              <option key = {topic.indexT} value={topic.indexT} > {topic.topic}</option>
            ))}

        </Form.Control>

        <button  type="submit" className="btn btn-primary SWbutton " data-toggle="modal" value='Save Form' >
          <span className = "englishF" > Login / </span> <span> 登入 </span>
        </button>
      </form>
    </div>
  )
}

export default ResultChoose
