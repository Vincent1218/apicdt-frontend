import { useState, useEffect } from 'react'
import React from 'react'
import { useLocation } from "react-router-dom";
import './css/RegisterJudge.css';
import Alert from 'react-bootstrap/Alert';
import { serverURL } from '../config.js'
import Footer from '../components/Footer'
import ReactDOM from "react-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Checkbox from '@material-ui/core/Checkbox';
import {useHistory} from 'react-router';
import './css/ResultFan.css';


const ResultFan = () => {
  const [start,setStart] = useState(true);
  const [cal,setCal] = useState(true);
  const [dataTime, setDataTime] = useState([]);
  const [dataV, setDataV] = useState([]);
  const [dataT, setDataT] = useState([]);
  const [dataF, setDataF] = useState([]);
  const [dataIF, setDataIF] = useState([]);
  const [dataSF, setDataSF] = useState([]);
  const [scoreF,setScoreF] = useState({ aff : 0, neg : 0});
  const [scoreIF,setScoreIF] = useState({ aff : 0, neg : 0});
  const [scoreSF,setScoreSF] = useState({ aff : 0, neg : 0});
  const [scoreT,setScoreT] = useState({ aff : 0, neg : 0, affVote : 0, negVote : 0, judgeAff : 0, judgeNeg : 0, voteAff : 0, voteNeg : 0, finalAff : 0, finalNeg : 0, winner : 0});
  const location = useLocation();
  const history = useHistory();

  const findTZTopic = async (indexT) => {
    if(indexT === ''){
      return;
    }
    const res = await fetch('https://apicdt-server.com'+'/registerTopic/'+indexT)
    // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+indexT)
    const data = await res.json()
    setDataT(data)
    // console.log(data)
   
  }

  const findGradingSummaryFan = async (indexT) => {
    if(indexT === ''){
      return;
    }
    const res = await fetch('https://apicdt-server.com'+'/gradingSummaryFan/'+indexT)
    // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+indexT)
    const data = await res.json()
    setDataSF(data)
  }
  const findGradingImpressionFan = async (indexT) => {
    if(indexT === ''){
      return;
    }
    const res = await fetch('https://apicdt-server.com'+'/gradingImpressionFan/'+indexT)
    // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+indexT)
    const data = await res.json()
    setDataIF(data)
  }
  const findGradingFan = async (indexT) => {
    if(indexT === ''){
      return;
    }
    const res = await fetch('https://apicdt-server.com'+'/gradingFan/'+indexT)
    // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+indexT)
    const data = await res.json()
    setDataF(data)
  }
  const findVote = async (indexT) => {
    if(indexT === ''){
      return;
    }
    const res = await fetch('https://apicdt-server.com'+'/vote/'+indexT)
    // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+indexT)
    const data = await res.json()
    setDataV(data)
  }

  const findTime = async (indexT) => {
    if(indexT === ''){
      return;
    }
    const res = await fetch('https://apicdt-server.com'+'/time/'+indexT)
    // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+indexT)
    const data = await res.json()
    // console.log(data)
    setDataTime(data)
  }

  const fetchData = () =>{
    findTZTopic(location.indexT)
    findGradingSummaryFan(location.indexT);
    findGradingImpressionFan(location.indexT);
    findGradingFan(location.indexT);
    findVote(location.indexT);
    findTime(location.indexT);
    // console.log(dataT)
    // console.log(dataF)
    // console.log(dataIF)
    // console.log(dataSF)
  }
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    // Cancel the event
    e.preventDefault();
    if (e) {
      e.returnValue = ''; // Legacy method for cross browser support
    }
    return ''; // Legacy method for cross browser support
  };



  const calResult = () =>{
    // console.log(dataT)
    // console.log(dataF)
    // console.log(dataIF)
    // console.log(dataSF)
    // console.log(dataV)
    // console.log(dataTime)

    var lengthIF = dataIF.length;
    var lengthF = dataF.length;
    var lengthSF = dataSF.length; 
    var i;
    var tempFAff =scoreF.aff;
    var tempFNeg = scoreF.neg;
    var tempIFAff =scoreIF.aff;
    var tempIFNeg = scoreIF.neg;
    var tempSFAff =scoreSF.aff;
    var tempSFNeg = scoreSF.neg;

    for (i = 0; i < lengthF; i++) {
      // console.log(i)
      if(dataF[i].affTotal < dataF[i].negTotal){
        tempFNeg += 1;
      }
      else if(dataF[i].affTotal > dataF[i].negTotal){
        tempFAff += 1;
      }
      else{
        var tempAff = dataF[i].affFree + dataF[i].affTeamwork
        var tempNeg = dataF[i].negFree + dataF[i].negTeamwork

        if(tempAff < tempNeg){
          tempFNeg += 1;
        }
        else if(tempAff > tempNeg){
          tempFAff += 1;
        }
        else{
          if(dataF[i].affTeamwork < dataF[i].negTeamwork){
            tempFNeg += 1;
          }
          else if(dataF[i].affTeamwork > dataF[i].negTeamwork){
            tempFAff += 1;
          }
          else{
            var x;
            for (x = 0; x < lengthSF ; x++){
              if(dataSF[x].token === dataF[i].token){
                if(dataSF[x].summary === 1){
                  tempFAff += 1;
                }
                else{
                  tempFNeg += 1;
                }
              }
            }
          }
        }
      }
    }

    for (i = 0; i < lengthSF ; i++){
      if(dataSF[i].summary===1){
        tempSFAff += 1;
      }
      else{
        tempSFNeg += 1;
      }
    }

    for (i = 0; i < lengthIF ; i++){
      if(dataIF[i].impression===1){
        tempIFAff += 1;
      }
      else{
        tempIFNeg += 1;
      }
    }
    // console.log(tempFNeg)
    // console.log(tempFAff)
    // console.log(tempSFNeg)
    // console.log(tempSFAff)
    // console.log(tempIFNeg)
    // console.log(tempIFAff)
    
    scoreF.neg = tempFNeg
    scoreF.aff = tempFAff
    // setScoreF({ ...scoreF, neg: tempFNeg})
    // setScoreF({ ...scoreF, aff: tempFAff})
    scoreSF.neg = tempSFNeg
    scoreSF.aff = tempSFAff
    // setScoreSF({ ...scoreSF, neg: tempSFNeg})
    // setScoreSF({ ...scoreSF, aff: tempSFAff})
    scoreIF.neg = tempIFNeg
    scoreIF.aff = tempIFAff
    // setScoreIF({ ...scoreIF, neg: tempIFNeg})
    // setScoreIF({ ...scoreIF, aff: tempIFAff})

    scoreT.neg = tempFNeg + tempSFNeg + tempIFNeg
    scoreT.aff = tempFAff + tempSFAff + tempIFAff
    scoreT.negVote = dataV[0].negVote
    scoreT.affVote = dataV[0].affVote
    scoreT.negVoteAfter = dataV[0].negVoteAfter
    scoreT.affVoteAfter = dataV[0].affVoteAfter

    scoreT.judgeAff = (scoreT.aff)/(scoreT.aff+scoreT.neg)*50
    scoreT.judgeAff = scoreT.judgeAff.toFixed(2)
    scoreT.judgeNeg = (scoreT.neg)/(scoreT.aff+scoreT.neg)*50
    scoreT.judgeNeg = scoreT.judgeNeg.toFixed(2)

    console.log(scoreT);

    if(scoreT.affVoteAfter > scoreT.affVote){
      scoreT.voteAff = ((scoreT.affVoteAfter-scoreT.affVote)/scoreT.negVote)*50;
      scoreT.voteNeg = 0;
    }
    else if(scoreT.negVoteAfter > scoreT.negVote){
      scoreT.voteNeg = ((scoreT.negVoteAfter-scoreT.negVote)/scoreT.affVote)*50;
      scoreT.voteAff = 0;
    }
    else{
      scoreT.voteAff = 0;
      scoreT.voteNeg = 0;
    }
    

    //  = (scoreT.affVote)/(scoreT.affVote+scoreT.negVote)*50
    scoreT.voteAff =  scoreT.voteAff.toFixed(2)    
    // scoreT.voteNeg = (scoreT.negVote)/(scoreT.affVote+scoreT.negVote)*50
    scoreT.voteNeg = scoreT.voteNeg.toFixed(2)

    scoreT.finalAff = parseFloat(scoreT.judgeAff) + parseFloat(scoreT.voteAff)
    scoreT.finalNeg = parseFloat(scoreT.judgeNeg) + parseFloat(scoreT.voteNeg)

    scoreT.finalAff =  scoreT.finalAff.toFixed(2)   
    scoreT.finalNeg = scoreT.finalNeg.toFixed(2)

    if(scoreT.finalAff > scoreT.finalNeg){
      scoreT.winner = 1
    }
    else if(scoreT.finalAff < scoreT.finalNeg){
      scoreT.winner = 2
    }
    else{
      if(dataTime[0].affTotalSec < dataTime[0].negTotalSec){
        scoreT.winner = 1
      }
      else{
        scoreT.winner = 2
      }
    }

    // console.log(scoreT)
  }

  if(start){
    fetchData();
    setStart(false);
  }

  useEffect(() => {
    if((dataT.length!==0)&&(dataF.length!==0)&&(dataIF.length!==0)&&(dataSF.length!==0)&&(dataV.length!==0)&&(dataTime.length!==0)&&(cal)){
      calResult();
      setCal(false)
    }
  })


  return (
    <section className="header-gradient">
      <div className="container mainBlockResult">
        <div className="fan_title">
          <span> 返尔赛成绩 </span>
        </div>
        <Table  aria-label="caption table">
          <colgroup>
            <col style={{ width: '40%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '30%' }} />
          </colgroup>
          <TableHead>
            <TableRow className = "shade">
              <TableCell align="center" colSpan={1}><div><h2>题目</h2></div></TableCell>
              <TableCell align="center" colSpan={2}>{dataT[0] ? <div><h2>{dataT[0].topic}</h2></div> : <div> </div>} </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow className ="rowResult">
              <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>获胜方</div></TableCell>
              <TableCell align="center" colSpan={2}>
                {(scoreT.winner === 1) ? <div  style={{ fontSize: "170%" }}>正方</div> :<div  style={{ fontSize: "170%" }}>反方</div>}
              </TableCell>
            </TableRow>
            <TableRow className ="rowResult">
              <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>评审数量</div></TableCell>
              <TableCell align="center" colSpan={2}>
                <div  style={{ fontSize: "170%" }}>{dataT[0] ? <div>{dataT[0].judgeNo}</div> : <div> </div>}</div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="container subBlockResult">
        <Table  aria-label="caption table">
          <caption>备注：XXXXX</caption>
          <colgroup>
            <col style={{ width: '40%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '30%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={1}><div><h2>项目</h2></div></TableCell>
              <TableCell align="left" colSpan={1}><div><h2>正方</h2></div></TableCell>
              <TableCell align="left" colSpan={1}><div><h2>反方</h2></div></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            <TableRow className = "shade">
              <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>印象票</div></TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreIF.aff}</div> 
              </TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreIF.neg}</div> 
              </TableCell>
            </TableRow>


            <TableRow >
              <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>分数票</div></TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreF.aff}</div> 
              </TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreF.neg}</div> 
              </TableCell>
            </TableRow>

            <TableRow className = "shade">
              <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>总结票</div></TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreSF.aff}</div> 
              </TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreSF.neg}</div> 
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>总票数</div></TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreT.aff}</div> 
              </TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreT.neg}</div> 
              </TableCell>
            </TableRow>

            <TableRow className = "shade">
              <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>评审总分</div></TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreT.judgeAff}%</div> 
              </TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreT.judgeNeg}%</div> 
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>观众初始投票数</div></TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreT.affVote}</div> 
              </TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreT.negVote}</div> 
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>观众最终投票数</div></TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreT.affVoteAfter}</div> 
              </TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreT.negVoteAfter}</div> 
              </TableCell>
            </TableRow>

            <TableRow className = "shade">
              <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>观众投票分</div></TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreT.voteAff}%</div> 
              </TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreT.voteNeg}%</div> 
              </TableCell>
            </TableRow>

            <TableRow >
              <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>用时</div></TableCell>
              <TableCell align="left">
                {dataTime[0] ? <div  style={{ fontSize: "120%" }}>{dataTime[0].affTimeMin}分 {dataTime[0].affTimeSec}秒</div>  : <div> </div>} 
              </TableCell>
              <TableCell align="left">
                {dataTime[0] ? <div  style={{ fontSize: "120%" }}>{dataTime[0].negTimeMin}分 {dataTime[0].negTimeSec}秒</div>   : <div> </div>} 
              </TableCell>
            </TableRow>

            <TableRow className = "shade">
              <TableCell align="right" colSpan={1}><div style={{ fontSize: "200%" }}>总分</div></TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "200%" }}>{scoreT.finalAff}%</div> 
              </TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "200%" }}>{scoreT.finalNeg}%</div> 
              </TableCell>
            </TableRow>
      
          </TableBody>
        </Table>
      </div>

      <div className="container subBlockResult">
        <div className="fan_title">
          <span> 分数票总分 </span>
        </div>
        <Table  aria-label="caption table">
          <colgroup>
            <col style={{ width: '40%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '30%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={1}><div><h2>评审姓名</h2></div></TableCell>
              <TableCell align="center" colSpan={1}><div><h2>正方</h2></div></TableCell>
              <TableCell align="center" colSpan={1}><div><h2>反方</h2></div></TableCell>
            </TableRow>
          </TableHead>
          {dataF.map((data,index) => (
            <TableBody key = {index}>
              <TableRow className ="rowResult">
                <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>{data.judgeChiName}</div></TableCell>
                <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>{data.affTotal}</div> </TableCell>
                <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>{data.negTotal}</div> </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>

      <div className="container subBlockResult">
        <div className="fan_title">
          <span> 团体评分 </span>
        </div>
        <Table  aria-label="caption table">
          <colgroup>
            <col style={{ width: '40%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '30%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={1}><div><h2>评审姓名</h2></div></TableCell>
              <TableCell align="center" colSpan={1}><div><h2>正方</h2></div></TableCell>
              <TableCell align="center" colSpan={1}><div><h2>反方</h2></div></TableCell>
            </TableRow>
          </TableHead>
          {dataF.map((data,index) => (
            <TableBody key = {index}>
              <TableRow className ="rowResult">
                <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>{data.judgeChiName}</div></TableCell>
                <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}><div>团体总分：{data.affFree+data.affTeamwork}</div> <div>自由辩论：{data.affFree} </div> <div> 团体配合：{data.affTeamwork} </div> </div> </TableCell>
                <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}><div>团体总分：{data.negFree+data.negTeamwork}</div> <div>自由辩论：{data.negFree} </div> <div> 团体配合：{data.negTeamwork}</div> </div> </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>

      <div className="container subBlockResult">
        <div className="fan_title">
          <span> 印象票 </span>
        </div>
        <Table  aria-label="caption table">
          <colgroup>
            <col style={{ width: '40%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '30%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={1}><div><h2>评审姓名</h2></div></TableCell>
              <TableCell align="center" colSpan={2}><div><h2>选择</h2></div></TableCell>
            </TableRow>
          </TableHead>
          {dataIF.map((data,index)  => (
            <TableBody key = {index}>
              <TableRow className ="rowResult">
                <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>{data.judgeChiName}</div></TableCell>
                { (data.impression === 1) ? <TableCell align="center" colSpan={2}><div style={{ fontSize: "170%" }}>正方</div></TableCell> : <TableCell align="center" colSpan={2}><div style={{ fontSize: "170%" }}>反方</div></TableCell> }
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>

      <div className="container subBlockResult">
        <div className="fan_title">
          <span> 总结票 </span>
        </div>
        <Table  aria-label="caption table">
          <colgroup>
            <col style={{ width: '40%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '30%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={1}><div><h2>评审姓名</h2></div></TableCell>
              <TableCell align="center" colSpan={2}><div><h2>选择</h2></div></TableCell>
            </TableRow>
          </TableHead>
          {dataSF.map((data,index)  => (
            <TableBody key = {index}>
              <TableRow className ="rowResult">
                <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>{data.judgeChiName}</div></TableCell>
                { (data.summary === 1) ? <TableCell align="center" colSpan={2}><div style={{ fontSize: "170%" }}>正方</div></TableCell> : <TableCell align="center" colSpan={2}><div style={{ fontSize: "170%" }}>反方</div></TableCell> }
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>

      <Footer />
    </section>
  );
}

export default ResultFan;
