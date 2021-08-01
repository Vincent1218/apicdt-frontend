import { useState, useEffect } from 'react'
import React from 'react'
import { useLocation } from "react-router-dom";
import './css/RegisterJudge.css';
import { serverURL } from '../config.js'
import Footer from '../components/Footer'
import ReactDOM from "react-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {useHistory} from 'react-router';
import './css/ResultFan.css';


const Grading = () => {
  const [start,setStart] = useState(true);
  const [cal,setCal] = useState(true);
  const [cal1,setCal1] = useState(true);
  const [dataT, setDataT] = useState([]);
  const [dataTable, setDataTable] = useState([]);
  const [dataI, setDataI] = useState([]);
  const [dataS, setDataS] = useState([]);
  const [dataBC, setDataBC] = useState([]);
  const [dataBF, setDataBF] = useState([]);
  const [heirList, setHeirList] = useState([]);
  const [finalList, setFinalList] = useState([]);
  const [scoreTable,setScoreTable] = useState({ aff : 0, neg : 0});
  const [scoreI,setScoreI] = useState({ aff : 0, neg : 0});
  const [scoreS,setScoreSF] = useState({ aff : 0, neg : 0});
  const [scoreT,setScoreT] = useState({ aff : 0, neg : 0, winner : 0});
  const location = useLocation();

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

  const findGradingSummary = async (indexT) => {
    if(indexT === ''){
      return;
    }
    const res = await fetch('https://apicdt-server.com'+'/gradingSummary/'+indexT)
    // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+indexT)
    const data = await res.json()
    setDataS(data)
  }
  const findGradingImpression = async (indexT) => {
    if(indexT === ''){
      return;
    }
    const res = await fetch('https://apicdt-server.com'+'/gradingImpression/'+indexT)
    // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+indexT)
    const data = await res.json()
    setDataI(data)
  }
  const findGradingTable = async (indexT) => {
    if(indexT === ''){
      return;
    }
    const res = await fetch('https://apicdt-server.com'+'/gradingTable/'+indexT)
    // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+indexT)
    const data = await res.json()
    setDataTable(data)
  }
  const findGradingBestCand = async (indexT) => {
    if(indexT === ''){
      return;
    }
    const res = await fetch('https://apicdt-server.com'+'/gradingBestCand/'+indexT)
    // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+indexT)
    const data = await res.json()
    setDataBC(data)
  }
  const findGradingBestFinal = async (indexT) => {
    if(indexT === ''){
      return;
    }
    const res = await fetch('https://apicdt-server.com'+'/gradingBestFinal/'+indexT)
    // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+indexT)
    const data = await res.json()
    setDataBF(data)
  }
  

  const fetchData = () =>{
    findTZTopic(location.indexT)
    findGradingSummary(location.indexT);
    findGradingImpression(location.indexT);
    findGradingTable(location.indexT);
    findGradingBestCand(location.indexT);
    findGradingBestFinal(location.indexT);
    // console.log(dataT)
    // console.log(dataTable)
    // console.log(dataI)
    // console.log(dataS)
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

  const getHeir = () =>{
      // console.log(dataBC)
      // console.log(dataTable)
      var tempHeirList = [];
      var lengthBC = dataBC.length; 
      var lengthTable = dataTable.length; 
      var i;
      var list = { aff1: 0, aff2: 0 , aff3: 0,  aff4: 0, neg1: 0, neg2: 0 , neg3: 0, neg4: 0 }

      for ( i = 0 ; i < lengthBC; i++){
        var tempArr = dataBC[i].selected;
        for ( const ppl of tempArr){
          if(ppl === "正方一辩"){
            list.aff1 += 1;
          }
          else if(ppl === "正方二辩"){
            list.aff2 += 1;
          }
          else if(ppl === "正方三辩"){
            list.aff3 += 1;
          }
          else if(ppl === "正方四辩"){
            list.aff4 += 1;
          }
          else if(ppl === "反方一辩"){
            list.neg1 += 1;
          }
          else if(ppl === "反方二辩"){
            list.neg2 += 1;
          }
          else if(ppl === "反方三辩"){
            list.neg3 += 1;
          }
          else if(ppl === "反方四辩"){
            list.neg4 += 1;
          }
        }
      }

      var keysSorted = Object.keys(list).sort(function(a,b){return list[b]-list[a]})
      var keysSortedValue = Object.keys(list).sort(function(a,b){return list[b]-list[a]}).map(key => list[key])
      // console.log(keysSorted);  
      // console.log(keysSortedValue);  
      var count = 0;
      var min = 0;
      for ( const val of keysSortedValue){
        if(val>0){
          if(count<3){
            min = val;
            count ++;
          }
          else if(val === min){
            count ++;
          }
        }
        else{
          break;
        }
      }
      // console.log(count)
      var subHeirList = { aff1: 0, aff2: 0 , aff3: 0,  aff4: 0, neg1: 0, neg2: 0 , neg3: 0, neg4: 0, }
      for ( i = 0 ; i < lengthTable; i++){
        var y;
        for (y = 0; y < 8; y++){
          if (y===0){
            subHeirList.aff1 += (dataTable[i].rows)[y].subt
          }
          if (y===1){
            subHeirList.aff2 += (dataTable[i].rows)[y].subt
          }
          if (y===2){
            subHeirList.aff3 += (dataTable[i].rows)[y].subt
          }
          if (y===3){
            subHeirList.aff4 += (dataTable[i].rows)[y].subt
          }
          if (y===4){
            subHeirList.neg1 += (dataTable[i].rows)[y].subt
          }
          if (y===5){
            subHeirList.neg2 += (dataTable[i].rows)[y].subt
          }
          if (y===6){
            subHeirList.neg3 += (dataTable[i].rows)[y].subt
          }
          if (y===7){
            subHeirList.neg4 += (dataTable[i].rows)[y].subt
          }
        }
      }

      var arrLength = 0;
      var countSub = 0;
      var subHeirSorted;
      if(count>3){
        var x;
        var tempSubArr = []
        var tempSubHeirList = { aff1: 0, aff2: 0 , aff3: 0,  aff4: 0, neg1: 0, neg2: 0 , neg3: 0, neg4: 0, }
        for ( x = 0; x < count; x++) {
          if(keysSortedValue[x]===min){
            tempSubArr.push(x)
            arrLength++;
          }
        }
        for ( x = 0; x < arrLength; x++) {
          if (keysSorted[tempSubArr[x]] === "aff1"){
            // tempSubHeirList.push({ "aff1" : (dataTable[i].rows)[0].subt})
            tempSubHeirList.aff1 = subHeirList.aff1
          }
          else if (keysSorted[tempSubArr[x]] === "aff2"){
            // tempSubHeirList.push({ "aff2" : (dataTable[i].rows)[1].subt})
            tempSubHeirList.aff2 = subHeirList.aff2
          }
          else if (keysSorted[tempSubArr[x]] === "aff3"){
            // tempSubHeirList.push({ "aff3" : (dataTable[i].rows)[2].subt})
            tempSubHeirList.aff3 = subHeirList.aff3
          }
          else if (keysSorted[tempSubArr[x]] === "aff4"){
            // tempSubHeirList.push({ "aff4" : (dataTable[i].rows)[3].subt})
            tempSubHeirList.aff4 = subHeirList.aff4
          }
          else if (keysSorted[tempSubArr[x]] === "neg1"){
            // tempSubHeirList.push({ "neg1" : (dataTable[i].rows)[4].subt})
            tempSubHeirList.neg1 = subHeirList.neg1
          }
          else if (keysSorted[tempSubArr[x]] === "neg2"){
            // tempSubHeirList.push({ "neg2" : (dataTable[i].rows)[5].subt})
            tempSubHeirList.neg2 = subHeirList.neg2
          }
          else if (keysSorted[tempSubArr[x]] === "neg3"){
            // tempSubHeirList.push({ "neg3" : (dataTable[i].rows)[6].subt})
            tempSubHeirList.neg3 = subHeirList.neg3
          }
          else if (keysSorted[tempSubArr[x]] === "neg4"){
            // tempSubHeirList.push({ "neg4" : (dataTable[i].rows)[7].subt})
            tempSubHeirList.neg4 = subHeirList.neg4
          }
        }
        // console.log(tempSubHeirList)
        subHeirSorted = Object.keys(tempSubHeirList).sort(function(a,b){return tempSubHeirList[b]-tempSubHeirList[a]})
        var subHeirSortedValue = Object.keys(tempSubHeirList).sort(function(a,b){return tempSubHeirList[b]-tempSubHeirList[a]}).map(key => tempSubHeirList[key])

        // console.log(subHeirSorted)
        // console.log(subHeirSortedValue)
        var minSub = 0;
        var limit  = (3 - count + arrLength);
        for ( const val of subHeirSortedValue){
          if(countSub<limit){
            minSub = val;
            countSub ++;
          }
          else if(val === minSub){
            countSub ++;
          }
        }
      }
      
      for ( i = 0; i< count-arrLength; i++){
        if(keysSorted[i] === "aff1"){
          tempHeirList.push({'name':"正方一辩",'score': subHeirList.aff1})
        }
        else if(keysSorted[i] === "aff2"){
          tempHeirList.push({'name':"正方二辩",'score': subHeirList.aff2})
        }
        else if(keysSorted[i] === "aff3"){
          tempHeirList.push({'name':"正方三辩",'score': subHeirList.aff3})
        }
        else if(keysSorted[i] === "aff4"){
          tempHeirList.push({'name':"正方四辩",'score': subHeirList.aff4})
        }
        else if(keysSorted[i] === "neg1"){
          tempHeirList.push({'name':"反方一辩",'score': subHeirList.neg1})
        }
        else if(keysSorted[i] === "neg2"){
          tempHeirList.push({'name':"反方二辩",'score': subHeirList.neg2})
        }
        else if(keysSorted[i] === "neg3"){
          tempHeirList.push({'name':"反方三辩",'score': subHeirList.neg3})
        }
        else if(keysSorted[i] === "neg4"){
          tempHeirList.push({'name':"反方四辩",'score': subHeirList.neg4})
        }
      }
      for ( i = 0; i< countSub; i++){
        if(subHeirSorted[i] === "aff1"){
          tempHeirList.push({'name':"正方一辩",'score': subHeirList.aff1})
        }
        else if(subHeirSorted[i] === "aff2"){
          tempHeirList.push({'name':"正方二辩",'score': subHeirList.aff2})
        }
        else if(subHeirSorted[i] === "aff3"){
          tempHeirList.push({'name':"正方三辩",'score': subHeirList.aff3})
        }
        else if(subHeirSorted[i] === "aff4"){
          tempHeirList.push({'name':"正方四辩",'score': subHeirList.aff4})
        }
        else if(subHeirSorted[i] === "neg1"){
          tempHeirList.push({'name':"反方一辩",'score': subHeirList.neg1})
        }
        else if(subHeirSorted[i] === "neg2"){
          tempHeirList.push({'name':"反方二辩",'score': subHeirList.neg2})
        }
        else if(subHeirSorted[i] === "neg3"){
          tempHeirList.push({'name':"反方三辩",'score': subHeirList.neg3})
        }
        else if(subHeirSorted[i] === "neg4"){
          tempHeirList.push({'name':"反方四辩",'score': subHeirList.neg4})
        }
      }
      setHeirList(tempHeirList);
      // console.log(tempHeirList)
        
  }


  const calResult = () =>{
    // console.log(dataT)
    // console.log(dataTable)
    // console.log(dataI)
    // console.log(dataS)
    // console.log(dataBF)

    var lengthI = dataI.length;
    var lengthTable = dataTable.length;
    var lengthS = dataS.length; 
    var lengthBF = dataBF.length; 
    var i;
    var tempTableAff =scoreTable.aff;
    var tempTableNeg = scoreTable.neg;
    var tempIAff =scoreI.aff;
    var tempINeg = scoreI.neg;
    var tempSAff =scoreS.aff;
    var tempSNeg = scoreS.neg;

    var tempFinalList = [];
    var list = { aff1: 0, aff2: 0 , aff3: 0,  aff4: 0, neg1: 0, neg2: 0 , neg3: 0, neg4: 0 }
    for (i = 0; i < lengthBF; i++) {
      var tempArr = dataBF[i].selected;
      if(tempArr[0] === "正方一辩"){
        list.aff1 += 1;
      }
      else if(tempArr[0] === "正方二辩"){
        list.aff2 += 1;
      }
      else if(tempArr[0] === "正方三辩"){
        list.aff3 += 1;
      }
      else if(tempArr[0] === "正方四辩"){
        list.aff4 += 1;
      }
      else if(tempArr[0] === "反方一辩"){
        list.neg1 += 1;
      }
      else if(tempArr[0] === "反方二辩"){
        list.neg2 += 1;
      }
      else if(tempArr[0] === "反方三辩"){
        list.neg3 += 1;
      }
      else if(tempArr[0] === "反方四辩"){
        list.neg4 += 1;
      }
    }
    var keysSorted = Object.keys(list).sort(function(a,b){return list[b]-list[a]})
    var keysSortedValue = Object.keys(list).sort(function(a,b){return list[b]-list[a]}).map(key => list[key])
    var count = 0;
    var min = 0;
    
    for ( const val of keysSortedValue){
      if(val>0){
        if(count<1){
          min = val;
          count ++;
        }
        else if(val === min){
          count ++;
        }
      }
      else{
        break;
      }
    }
    var subFinalList = { aff1: 0, aff2: 0 , aff3: 0,  aff4: 0, neg1: 0, neg2: 0 , neg3: 0, neg4: 0, }
    for ( i = 0 ; i < lengthTable; i++){
      var y;
      for (y = 0; y < 8; y++){
        if (y===0){
          subFinalList.aff1 += (dataTable[i].rows)[y].subt
        }
        if (y===1){
          subFinalList.aff2 += (dataTable[i].rows)[y].subt
        }
        if (y===2){
          subFinalList.aff3 += (dataTable[i].rows)[y].subt
        }
        if (y===3){
          subFinalList.aff4 += (dataTable[i].rows)[y].subt
        }
        if (y===4){
          subFinalList.neg1 += (dataTable[i].rows)[y].subt
        }
        if (y===5){
          subFinalList.neg2 += (dataTable[i].rows)[y].subt
        }
        if (y===6){
          subFinalList.neg3 += (dataTable[i].rows)[y].subt
        }
        if (y===7){
          subFinalList.neg4 += (dataTable[i].rows)[y].subt
        }
      }
    }
    var arrLength = 0;
    var countSub = 0;
    var subFinalSorted;
    if(count>1){
      var x;
      var tempSubArr = []
      var tempSubFinalList = { aff1: 0, aff2: 0 , aff3: 0,  aff4: 0, neg1: 0, neg2: 0 , neg3: 0, neg4: 0, }
      for ( x = 0; x < count; x++) {
        if(keysSortedValue[x]===min){
          tempSubArr.push(x)
          arrLength++;
        }
      }
      for ( x = 0; x < arrLength; x++) {
        if (keysSorted[tempSubArr[x]] === "aff1"){
          // tempSubFinalList.push({ "aff1" : (dataTable[i].rows)[0].subt})
          tempSubFinalList.aff1 = subFinalList.aff1
        }
        else if (keysSorted[tempSubArr[x]] === "aff2"){
          // tempSubFinalList.push({ "aff2" : (dataTable[i].rows)[1].subt})
          tempSubFinalList.aff2 = subFinalList.aff2
        }
        else if (keysSorted[tempSubArr[x]] === "aff3"){
          // tempSubFinalList.push({ "aff3" : (dataTable[i].rows)[2].subt})
          tempSubFinalList.aff3 = subFinalList.aff3
        }
        else if (keysSorted[tempSubArr[x]] === "aff4"){
          // tempSubFinalList.push({ "aff4" : (dataTable[i].rows)[3].subt})
          tempSubFinalList.aff4 = subFinalList.aff4
        }
        else if (keysSorted[tempSubArr[x]] === "neg1"){
          // tempSubFinalList.push({ "neg1" : (dataTable[i].rows)[4].subt})
          tempSubFinalList.neg1 = subFinalList.neg1
        }
        else if (keysSorted[tempSubArr[x]] === "neg2"){
          // tempSubFinalList.push({ "neg2" : (dataTable[i].rows)[5].subt})
          tempSubFinalList.neg2 = subFinalList.neg2
        }
        else if (keysSorted[tempSubArr[x]] === "neg3"){
          // tempSubFinalList.push({ "neg3" : (dataTable[i].rows)[6].subt})
          tempSubFinalList.neg3 = subFinalList.neg3
        }
        else if (keysSorted[tempSubArr[x]] === "neg4"){
          // tempSubFinalList.push({ "neg4" : (dataTable[i].rows)[7].subt})
          tempSubFinalList.neg4 = subFinalList.neg4
        }
      }
      // console.log(tempSubFinalList)
      subFinalSorted = Object.keys(tempSubFinalList).sort(function(a,b){return tempSubFinalList[b]-tempSubFinalList[a]})
      var subFinalSortedValue = Object.keys(tempSubFinalList).sort(function(a,b){return tempSubFinalList[b]-tempSubFinalList[a]}).map(key => tempSubFinalList[key])

      // console.log(subFinalSorted)
      // console.log(subFinalSortedValue)
      var minSub = 0;
      var limit  = (1 - count + arrLength);
      for ( const val of subFinalSortedValue){
        if(countSub<limit){
          minSub = val;
          countSub ++;
        }
        else if(val === minSub){
          countSub ++;
        }
      }
    }
    
    for ( i = 0; i< count-arrLength; i++){
      if(keysSorted[i] === "aff1"){
        tempFinalList.push({'name':"正方一辩",'score': subFinalList.aff1})
      }
      else if(keysSorted[i] === "aff2"){
        tempFinalList.push({'name':"正方二辩",'score': subFinalList.aff2})
      }
      else if(keysSorted[i] === "aff3"){
        tempFinalList.push({'name':"正方三辩",'score': subFinalList.aff3})
      }
      else if(keysSorted[i] === "aff4"){
        tempFinalList.push({'name':"正方四辩",'score': subFinalList.aff4})
      }
      else if(keysSorted[i] === "neg1"){
        tempFinalList.push({'name':"反方一辩",'score': subFinalList.neg1})
      }
      else if(keysSorted[i] === "neg2"){
        tempFinalList.push({'name':"反方二辩",'score': subFinalList.neg2})
      }
      else if(keysSorted[i] === "neg3"){
        tempFinalList.push({'name':"反方三辩",'score': subFinalList.neg3})
      }
      else if(keysSorted[i] === "neg4"){
        tempFinalList.push({'name':"反方四辩",'score': subFinalList.neg4})
      }
    }
    for ( i = 0; i< countSub; i++){
      if(subFinalSorted[i] === "aff1"){
        tempFinalList.push({'name':"正方一辩",'score': subFinalList.aff1})
      }
      else if(subFinalSorted[i] === "aff2"){
        tempFinalList.push({'name':"正方二辩",'score': subFinalList.aff2})
      }
      else if(subFinalSorted[i] === "aff3"){
        tempFinalList.push({'name':"正方三辩",'score': subFinalList.aff3})
      }
      else if(subFinalSorted[i] === "aff4"){
        tempFinalList.push({'name':"正方四辩",'score': subFinalList.aff4})
      }
      else if(subFinalSorted[i] === "neg1"){
        tempFinalList.push({'name':"反方一辩",'score': subFinalList.neg1})
      }
      else if(subFinalSorted[i] === "neg2"){
        tempFinalList.push({'name':"反方二辩",'score': subFinalList.neg2})
      }
      else if(subFinalSorted[i] === "neg3"){
        tempFinalList.push({'name':"反方三辩",'score': subFinalList.neg3})
      }
      else if(subFinalSorted[i] === "neg4"){
        tempFinalList.push({'name':"反方四辩",'score': subFinalList.neg4})
      }
    }
    // console.log(tempFinalList);
    setFinalList(tempFinalList);

    for (i = 0; i < lengthTable; i++) {
      // console.log(i)
      if(dataTable[i].affTotal < dataTable[i].negTotal){
        tempTableNeg += 1;
      }
      else if(dataTable[i].affTotal > dataTable[i].negTotal){
        tempTableAff += 1;
      }
      else{
        var tempAff = dataTable[i].affFree + dataTable[i].affTeamwork
        var tempNeg = dataTable[i].negFree + dataTable[i].negTeamwork

        if(tempAff < tempNeg){
          tempTableNeg += 1;
        }
        else if(tempAff > tempNeg){
          tempTableAff += 1;
        }
        else{
          if(dataTable[i].affTeamwork < dataTable[i].negTeamwork){
            tempTableNeg += 1;
          }
          else if(dataTable[i].affTeamwork > dataTable[i].negTeamwork){
            tempTableAff += 1;
          }
          else{
            var x;
            for (x = 0; x < lengthS ; x++){
              if(dataS[x].token === dataTable[i].token){
                if(dataS[x].summary === 1){
                  tempTableAff += 1;
                }
                else{
                  tempTableNeg += 1;
                }
              }
            }
          }
        }
      }
    }

    for (i = 0; i < lengthS ; i++){
      if(dataS[i].summary===1){
        tempSAff += 1;
      }
      else{
        tempSNeg += 1;
      }
    }

    for (i = 0; i < lengthI ; i++){
      if(dataI[i].impression===1){
        tempIAff += 1;
      }
      else{
        tempINeg += 1;
      }
    }
    // console.log(tempFNeg)
    // console.log(tempFAff)
    // console.log(tempSFNeg)
    // console.log(tempSFAff)
    // console.log(tempINeg)
    // console.log(tempIAff)
    
    scoreTable.neg = tempTableNeg
    scoreTable.aff = tempTableAff
    // setScoreF({ ...scoreTable, neg: tempFNeg})
    // setScoreF({ ...scoreTable, aff: tempFAff})
    scoreS.neg = tempSNeg
    scoreS.aff = tempSAff
    // setScoreSF({ ...scoreSF, neg: tempSFNeg})
    // setScoreSF({ ...scoreSF, aff: tempSFAff})
    scoreI.neg = tempINeg
    scoreI.aff = tempIAff
    // setScoreI({ ...scoreI, neg: tempINeg})
    // setScoreI({ ...scoreI, aff: tempIAff})

    scoreT.neg = tempTableNeg + tempSNeg + tempINeg
    scoreT.aff = tempTableAff + tempSAff + tempIAff

    if(scoreT.aff > scoreT.neg){
      scoreT.winner = 1
    }
    else if(scoreT.aff < scoreT.neg){
      scoreT.winner = 2
    }

    // console.log(scoreT)
  }

  if(start){
    fetchData();
    setStart(false);
  }

  useEffect(() => {
    if((dataT.length!==0)&&(dataTable.length!==0)&&(dataI.length!==0)&&(dataS.length!==0)&&(dataBF.length!==0)&&(cal)){
      calResult();
      setCal(false)
    }
    if((dataBC.length!==0)&&(dataTable.length!==0)&&(cal1)){
      getHeir();
      setCal1(false)
    }
  })


  return (
    <section className="header-gradient">
      <div className="container mainBlockResult">
        <div className="fan_title">
          <span> 正赛成绩 </span>
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
                <div  style={{ fontSize: "120%" }}>{scoreI.aff}</div> 
              </TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreI.neg}</div> 
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>分数票</div></TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreTable.aff}</div> 
              </TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreTable.neg}</div> 
              </TableCell>
            </TableRow>

            <TableRow className = "shade">
              <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>总结票</div></TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreS.aff}</div> 
              </TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreS.neg}</div> 
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell align="center" colSpan={1}><div style={{ fontSize: "200%" }}>总票数</div></TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreT.aff}</div> 
              </TableCell>
              <TableCell align="left">
                <div  style={{ fontSize: "120%" }}>{scoreT.neg}</div> 
              </TableCell>
            </TableRow>
      
          </TableBody>
        </Table>
      </div>

      <div className="container subBlockResult">
        <div className="fan_title">
          <span> 最佳辩手候选人 </span>
        </div>
        <Table  aria-label="caption table">
          <colgroup>
            <col style={{ width: '40%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '30%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={1}><div><h2>辩手</h2></div></TableCell>
              <TableCell align="center" colSpan={2}><div><h2>个人总分</h2></div></TableCell>
            </TableRow>
          </TableHead>
            {heirList.map((heir,index)=> (
              <TableBody key = {index}>
                <TableRow className ="rowResult">
                  <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>{heir.name}</div></TableCell>
                  <TableCell align="center" colSpan={2}><div style={{ fontSize: "170%" }}>{heir.score}</div></TableCell>
                </TableRow>
              </TableBody>
            ))}
        </Table>
      </div>

      <div className="container subBlockResult">
        <div className="fan_title">
          <span> 最佳辩手 </span>
        </div>
        <Table  aria-label="caption table">
          <colgroup>
            <col style={{ width: '40%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '30%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}><div><h2>辩手</h2></div></TableCell>
            </TableRow>
          </TableHead>
            {finalList.map((final,index)=> (
              <TableBody key = {index}>
                <TableRow className ="rowResult">
                  <TableCell align="center" colSpan={3}><div style={{ fontSize: "170%" }}>{final.name}</div></TableCell>
                </TableRow>
              </TableBody>
            ))}
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
          {dataTable.map((data,index) => (
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
          {dataTable.map((data,index) => (
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
          {dataI.map((data,index)  => (
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
          <span> 最佳辩手候选人 </span>
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
          {dataBC.map((data,index) => (
            <TableBody key = {index}>
              <TableRow className ="rowResult">
                <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>{data.judgeChiName}</div></TableCell>
                <TableCell align="center" colSpan={2}>
                  {(data.selected).map((dataS,indexS) => (
                    <span key = {indexS} style={{ fontSize: "170%" }}>{dataS} , </span> 
                  ))} 
                </TableCell>

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
          {dataS.map((data,index)  => (
            <TableBody key = {index}>
              <TableRow className ="rowResult">
                <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>{data.judgeChiName}</div></TableCell>
                { (data.summary === 1) ? <TableCell align="center" colSpan={2}><div style={{ fontSize: "170%" }}>正方</div></TableCell> : <TableCell align="center" colSpan={2}><div style={{ fontSize: "170%" }}>反方</div></TableCell> }
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>

      <div className="container subBlockResult">
        <div className="fan_title">
          <span> 最佳辩手 </span>
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
          {dataBF.map((data,index) => (
            <TableBody key = {index}>
              <TableRow className ="rowResult">
                <TableCell align="center" colSpan={1}><div style={{ fontSize: "170%" }}>{data.judgeChiName}</div></TableCell>
                <TableCell align="center" colSpan={2}> {(data.selected)[0]} </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>

      

      <Footer />
    </section>
  );
}

export default Grading;
