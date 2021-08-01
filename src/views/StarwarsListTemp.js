import React from 'react'
import { useState, useEffect} from 'react'
import './css/SchoolList.css'
import Winnerf from '../components/Winnerf.js'
import {serverURL} from '../config'
import Form from 'react-bootstrap/Form';
import areafs from "../components/json/areafs.json";


const StarwarsListTemp = () => {

  const [winnerfs, setWinnerfs] = useState([]);
  const [areaC,setAreaC] = useState("");
  const [area,setArea] = useState("");
  const [chosen,setChosen] = useState(false);
  const [empty,setEmpty] = useState(false);
  const [hideseed,setHideseed] = useState(false);
  const [none,setNone] = useState(true);


  const getSelection=(event)=>{
    console.log(serverURL);
    setChosen(true);
    fetchWinners(event.target.value);
    setArea(event.target.value);
    if(event.target.value==="seed"){
      setHideseed(false);
      setNone(false);
      setChosen(false);
      return;
    }
    else if(event.target.value==="my"){
      setAreaC("马来西亚");
    }
    else if(event.target.value==="sg"){
      setAreaC("新加坡");
    }
    else if(event.target.value==="hk"){
      setAreaC("香港");
    }
    else if(event.target.value==="mc"){
      setAreaC("澳门");
    }
    else if(event.target.value==="au"){
      setAreaC("澳大利亚");
    }
    else if(event.target.value==="cm"){
      setAreaC("中国大陆");
    }
    else if(event.target.value==="uk"){
      setAreaC("英国");
    }
    else{
      setAreaC("");
      setChosen(false);
      setNone(true);
      setHideseed(true);
      return;
    }
    setNone(false);
    setHideseed(true);
  }

  const fetchWinners = async (area1) => {
    const res = await fetch('https://apicdt-server.com/starwars'+area1)
    // const res = await fetch('https://apicdt-server.com' + '/starwars')
    if(area1 === "seed"){
      return;
    }

    // const res = await fetch(serverURL+'starwars'+area1)
   
    

    const data = await res.json()
    var temp = data.length;
    if(temp>0){
      setEmpty(false);
    }
    else{
      setEmpty(true);
    }
    var i;
    
    for (i = 0; i < temp; i++) {
      if(!(data[i].count)){
        delete data[i]
      }
    }
    
    var array = data.filter(function () { return true });

    array.sort(function (a, b) {
      return a.time - b.time;
    });

    // console.log(array)
    setWinnerfs(array);
  }

  useEffect(() => {
    document.title = "查看电子抽签成绩"
  }, []);



  return (
    <div className="schoolsBlock container" >
      <Form.Control
      as="select"
      className="areaSelection"
      id="inlineFormCustomSelect"
      onChange={(e) => getSelection(e)}
      >
      {/* <option className = "area" value="">请选择地区</option> */}
      {areafs.map(areaf => (
        <option value={areaf.value} >{areaf.area}</option>
      ))}
      </Form.Control>
      <div className = {`${!chosen ? "dis" : ""}`}>
        <div className = "listHeader" >
          {areaC}地区电子抽签报名成功队伍
        </div>
        <h3 className = {`${(!empty||none) ? "dis" : ""} `}>
          暂无报名队伍
        </h3>
        <div>
          {winnerfs.map((winnerf, index) => (
            <Winnerf area={area} key={index} index={index} winnerf={winnerf}/>
          ))}
        </div>
        <div className = "ps" > 备注：蓝色标记队伍入围第十届亚太大专华语辩论公开赛！ </div>
      </div>

      <div className = {`${hideseed ? "dis" : ""}`}> 
        <div className = "listHeader" >
          种子队伍
        </div>
          <div className = "listHeader1" >第九届亚太大专华语辩论公开赛八强</div>
          <div className=" row schoolBlock">
            <div className = "col-1"> </div>
            <div className = "col-11" >学校名称：东吴大学 </div>
          </div>
          <div className=" row schoolBlock">
            <div className = "col-1"> </div>
            <div className = "col-11" >学校名称：马来西亚理科大学 （总院校）</div>
          </div>
          <div className=" row schoolBlock">
            <div className = "col-1"> </div>
            <div className = "col-11" >学校名称：世新大学 </div>
          </div>
          <div className=" row schoolBlock">
            <div className = "col-1"> </div>
            <div className = "col-11" >学校名称：新加坡国立大学</div>
          </div>
          <div className=" row schoolBlock">
            <div className = "col-1"> </div>
            <div className = "col-11" >学校名称：多伦多大学 </div>
          </div>
          <div className=" row schoolBlock">
            <div className = "col-1"> </div>
            <div className = "col-11" >学校名称：澳大利亚国立大学</div>
          </div>
          <div className=" row schoolBlock">
            <div className = "col-1"> </div>
            <div className = "col-11" >学校名称：香港科技大学</div>
          </div>
          <div className=" row schoolBlock">
            <div className = "col-1"> </div>
            <div className = "col-11" >学校名称：中国人民大学</div>
          </div>
          <div className = "listHeader1">特邀队伍</div>
          <div className=" row schoolBlock">
            <div className = "col-1"> </div>
            <div className = "col-11" >学校名称：武汉大学 </div>
          </div>
          <div className=" row schoolBlock">
            <div className = "col-1"> </div>
            <div className = "col-11" >学校名称：清华大学  </div>
          </div>
          <div className=" row schoolBlock">
            <div className = "col-1"> </div>
            <div className = "col-11" >学校名称：马来亚大学  </div>
          </div>
          <div className=" row schoolBlock">
            <div className = "col-1"> </div>
            <div className = "col-11" >学校名称：墨尔本大学  </div>
          </div>
      </div>
      <div className = "ps invi">
            nothing here
      </div>
    </div>
  )
}

export default StarwarsListTemp
