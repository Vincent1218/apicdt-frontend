import React from 'react'
import { useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import './css/JudgeLogin.css'
import './css/Vote.css'

const Vote = () => {
  const [voteData,setVoteData] = useState({indexT: '', affVote: '', negVote: '',affVoteAfter: '', negVoteAfter: ''});
  const [time,setTime] = useState({hour:'',minute:'',day:''});
  const [changed_1, setChanged_1] = useState(false);
  const [changed_2, setChanged_2] = useState(false);
  const [changed_3, setChanged_3] = useState(false);
  const [changed_4, setChanged_4] = useState(false);
  
  const[topics,setTopics] = useState([]);
  const [start,setStart] = useState(true);

  const [showS, setShowS] = useState(false);
  const [showF, setShowF] = useState(false);


  const addVoteData = async (voteData) =>{
    const res = await fetch (('https://apicdt-server.com'+'/vote'),{
      method : 'POST',
      headers:{
        'Content-type':'application/json',
      },
      body: JSON.stringify(voteData),
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

  const getTime = async () => {
    const res = await fetch('https://apicdt-server.com/'+'starwars/time')
    const data = await res.json()
    // console.log(data);
    return data;
  }

  const onSubmit = async (e) =>{
    e.preventDefault()
    // console.log(voteData);
    if(voteData.indexT === '' ||
      voteData.affVote === '' ||
      voteData.negVote === '' ||
      voteData.affVoteAfter === '' ||
      voteData.negVoteAfter === ''){
      setShowF(true);
      setShowS(false);
      return;
    }
    addVoteData(voteData);
    setVoteData ({indexT: '', affVote: '', negVote: '', affVoteAfter: '', negVoteAfter: ''});

    setTopics([]);
    setChanged_1(false);
    setChanged_2(false);
    setChanged_3(false);
    setChanged_4(false);
  }

  const fetchTopic = async () => {
    // const res = await fetch('https://apicdt-server.com/registerTopic')
    const res = await fetch('https://apicdt-server.com' + '/registerTopic')
    // const res = await fetch(serverURL+'registerTopic')
    const data = await res.json()

    var temp = data.length;
    var i;
    for (i = 0; i < temp; i++) {
      if(!(data[i].isRoadShow)){
        delete data[i]
      }

    }
    var array = data.filter(function () { return true });

    getTime().then(result=>{
      time.hour = result.hour;
      time.minute = result.minute;
      time.day = result.day;
      var min = ((time.hour*60)+ time.minute);
      temp = array.length;
      for (i = 0; i < temp; i++) {
        var temps = ((array[i].stimeh)*60)+(array[i].stimem);
        var tempe = ((array[i].etimeh)*60)+(array[i].etimem);
        if(((temps>min)||(tempe<min))||(array[i].date!==time.day)){
          delete array[i];
        }
      }
      array = array.filter(function () { return true });
      // console.log(array)
      setTopics(array);
    });
  }

  useEffect(() => {
    if(start){
      fetchTopic();
      setStart(false);
    }
  },[start,fetchTopic])

    
  return (
    <div>
      <Alert show={showS} className= "jalert" variant="success" onClose={() => setShowS(false)} dismissible>
        <Alert.Heading className = "alertHeading"> 提交成功！ </Alert.Heading>
      </Alert>
      <Alert show={showF} className= "alert" variant="danger" onClose={() => setShowF(false)} dismissible>
          <Alert.Heading className = "alertHeading"> 提交失败 ！ </Alert.Heading>
      </Alert>
      <form className="Vform" onSubmit = {onSubmit}>
        <div className="JudgeTitle"> 
          返尔赛队伍票数提交
        </div>
        

        <Form.Control  style = {{marginBottom: 10}}  className="JudgeLoginSel" as="select" onChange={(e) =>  setVoteData({ ...voteData, indexT: e.target.value }) }>
            <option value = '0' >
              请选择辩题
            </option>
            {topics.map(topic => (
              <option key = {topic.indexT} value={topic.indexT} > {topic.topic}</option>
            ))}

        </Form.Control>
        <input type="text" style = {{marginBottom: 10}}  className={`form-control  ${voteData.affVote ? "is-valid" : ""} ${(!voteData.affVote && changed_1) ? "is-invalid" : ""}`}  value={voteData.affVote} placeholder="正放初始获得票数" onChange={(e) => setChanged_1(true) & setVoteData({ ...voteData, affVote: e.target.value })} />
        <input type="text" style = {{marginBottom: 10}}  className={`form-control  ${voteData.negVote ? "is-valid" : ""} ${(!voteData.negVote && changed_2) ? "is-invalid" : ""}`}  value={voteData.negVote} placeholder="反方初始获得票数" onChange={(e) => setChanged_2(true) & setVoteData({ ...voteData, negVote: e.target.value })} />
        <input type="text" style = {{marginBottom: 10}}  className={`form-control  ${voteData.affVoteAfter ? "is-valid" : ""} ${(!voteData.affVoteAfter && changed_3) ? "is-invalid" : ""}`}  value={voteData.affVoteAfter} placeholder="正放最终获得票数" onChange={(e) => setChanged_3(true) & setVoteData({ ...voteData, affVoteAfter: e.target.value })} />
        <input type="text" style = {{marginBottom: 10}}  className={`form-control  ${voteData.negVoteAfter ? "is-valid" : ""} ${(!voteData.negVoteAfter && changed_4) ? "is-invalid" : ""}`}  value={voteData.negVoteAfter} placeholder="反方最终获得票数" onChange={(e) => setChanged_4(true) & setVoteData({ ...voteData, negVoteAfter: e.target.value })} />


        <button  type="submit" className="btn btn-primary SWbutton " data-toggle="modal" value='Save Form' >
          <span className = "englishF" > Submit / </span> <span> 提交 </span>
        </button>
      </form>
    </div>
  )
}

export default Vote
