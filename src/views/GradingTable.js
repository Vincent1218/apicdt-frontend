import { useState, useEffect } from 'react'
import React from 'react'
import './css/RegisterJudge.css';
import './css/GradingTable.css';
import { useLocation, useHistory } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';

import { serverURL } from '../config.js'

import Footer from '../components/Footer'
import GradingDialog from '../components/GradingDialog'
import CheckDialog from '../components/CheckDialog'

import ReactDOM from "react-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Stepper from '../components/Stepper';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  }
  ,
  table: {
    minWidth: 650,
    [theme.breakpoints.down('md')]: {
      "& .MuiTableCell-root": {
        fontSize: "2.5vw"
      }
    }
  }
}));

const createData = (name, team, mark1, mark2, mark3, mark4) => ({
  id: team ? name + "aff" : name + "neg",
  team,
  name,
  mark1: 0,
  mark2: 0,
  mark3: 0,
  mark4: 0,
  subt: 0,
  isEditMode: false
});

const title = {
  "1st": { "mark1": "立论(30分)", "mark2": "质询(20分)", "mark3": "答辩(10分)", "mark4": "语言风度(10分)", "subt": "得分" },
  "2nd": { "mark1": "驳论(30分)", "mark2": "质询(30分)", "mark3": "-", "mark4": "语言风度(10分)", "subt": "得分" },
  "3rd": { "mark1": "陈词(30分)", "mark2": "攻辩(30分)", "mark3": "-", "mark4": "语言风度(10分)", "subt": "得分" },
  "4th": { "mark1": "总结(60分)", "mark2": "-", "mark3": "-", "mark4": "语言风度(10分)", "subt": "得分" },
}

const speaker = { "1st": "一辩", "2nd": "二辩", "3rd": "三辩", "4th": "四辩" };

const CustomTableCell = ({ row, id, name, onChange, handleChange, setCheckData, setCheckDialogOpen,checkState }) => {
  const t = title[row[id]][name];
  return (
    <TableCell align="left">
      <div style={{ fontSize: "120%" }}>{t}</div>
      {(t !== "-") ?
        (name !== "subt") ?
          <div className="d-flex flex-row align-items-center">
            {(name !== "mark4") ?
              <Checkbox
                checked={checkState}
                onChange={e => (e.target.checked ? (setCheckData({e, row, name})  & setCheckDialogOpen(true)) : handleChange(e, row, name) )}
                // onChange={e => setCheckData({e, row, name}) & setCheckDialogOpen(true)}
                color="primary"
              />
              : <div></div>}
            <div>{
              checkState ?
                <div>0</div> :
                <Input
                  type="number"
                  name={name}
                  id={id}
                  value={row[name] === 0 ? '' : row[name]}
                  onChange={e => onChange(e, row)}
                  placeholder="0"
                  inputProps={{ min: 0, max: parseInt(t.slice(-4, -2)) }}
                  onWheel={(e) => e.target.blur()}
                />}</div>
            <div>{checkState}</div>
          </div>
          : <div style={{ fontSize: "150%", fontWeight: "bold" }}>{row[name]}</div>
        : <div>-</div>}
    </TableCell>
  );
};

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const GradingTable = () => {
  const location = useLocation();
  const [showS, setShowS] = useState(false);
  const [showF, setShowF] = useState(false);
  const [rows, setRows] = React.useState([
    createData("1st", 1, 0, 0, 0),
    createData("2nd", 1, 0, 0, 0),
    createData("3rd", 1, 0, 0, 0),
    createData("4th", 1, 0, 0, 0),
    createData("1st", 0, 0, 0, 0),
    createData("2nd", 0, 0, 0, 0),
    createData("3rd", 0, 0, 0, 0),
    createData("4th", 0, 0, 0, 0)
  ]);
  const [affDef, setAffDef] = useState(0);
  const [affFree, setAffFree] = useState(0);
  const [affTeamwork, setAffTeamwork] = useState(0);
  const [negDef, setNegDef] = useState(0);
  const [negFree, setNegFree] = useState(0);
  const [negTeamwork, setNegTeamwork] = useState(0);
  const [affTotal, setAffTotal] = useState(0);
  const [negTotal, setNegTotal] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [checkDialogOpen, setCheckDialogOpen] = useState(false);
  const [start, setStart] = useState(true);
  const [checkData, setCheckData] = useState();
  const [previous, setPrevious] = React.useState({});
  const [topic,setTopic] = useState("");
  const classes = useStyles();

  const [timeoutlist, setTimeoutlist] = useState([]);

 

  const handleChange = (e, row, name) => {

    if (timeoutlist.includes(row.id + name)) {
      setTimeoutlist(timeoutlist.filter(e => e !== row.id + name));
    }
    else {
      setTimeoutlist([...timeoutlist, row.id + name]);
      const { id } = row;
      const newRows = rows.map(row => {
        if (row.id === id) {
          row.subt = parseInt(row[name]) ? row.subt - parseInt(row[name]) : row.subt;
          return { ...row, [name]: parseInt(0) };
        }
        return row;
      });
      setRows(newRows);
    }
  };

  const onCheckSubmit = () =>{
    handleChange(checkData.e, checkData.row, checkData.name);
    setCheckDialogOpen(false);
  }


  function total(rows, t, opt = 0) {
    var subtotal = 0;
    const def = t ? affDef : negDef;
    const free = t ? affFree : negFree;
    const tw = t ? affTeamwork : negTeamwork;
    subtotal += parseInt(def) ? parseInt(def) : 0;
    subtotal += parseInt(free) ? parseInt(free) : 0;
    subtotal += parseInt(tw) ? parseInt(tw) : 0;
    return rows.map(row => { if (row.team === t) return row.subt; else return 0 }).reduce((sum, i) => sum + i, 0) + subtotal;
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
  


  useEffect(() => { 
      setAffTotal(total(rows, 1)); 
      setNegTotal(total(rows, 0));
  }, [total, rows])



  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    const value = (e.target.value ? e.target.value : 0);
    const name = e.target.name;

    if (value > parseInt(title[row[e.target.id]][name].slice(-4, -2)) || (value < 0)) {
      setRows(rows);
      return;
    }

    const { id } = row;
    const newRows = rows.map(row => {
      if (row.id === id) {
        row.subt = parseInt(row[name]) ? row.subt - parseInt(row[name]) : row.subt;
        row.subt = parseInt(value) ? row.subt + parseInt(value) : row.subt;
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const addGradingTableData = async (rows, affDef, affFree, affTeamwork, negDef, negFree, negTeamwork, affTotal, negTotal) => {
    const res = await fetch(('https://apicdt-server.com' + '/gradingTable'), {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        // token: location.token,
        // indexT: location.indexT,
        // judgeChiName: location.judgeChiName,
        token: getParameterByName('token'),
        indexT: getParameterByName('indexT'),
        judgeChiName: getParameterByName('judgeChiName'),
        rows: rows,
        affDef: affDef,
        affFree: affFree,
        affTeamwork: affTeamwork,
        negDef: negDef,
        negFree: negFree,
        negTeamwork: negTeamwork,
        affTotal: affTotal,
        negTotal: negTotal
      }),
    })
    const data = await res.json()
    if (res.status === 201) {
      setShowS(true);
      setTimeout(() => setShowS(false), 1000);
      setShowF(false);
      var queryString = "?token=" + getParameterByName('token') +"&indexT="+getParameterByName('indexT')+"&judgeChiName="+getParameterByName('judgeChiName');
      setTimeout(() => {
        window.location.href = "gradingImpression" + queryString;
      }, 1000);
      // setTimeout(() => history.push({
      //   pathname: '/gradingImpression',
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

  const findGradingTable = async (indexT,token) => {
    if(indexT === ''){
      return;
    } 
    // console.log(indexT,token)
    const res = await fetch('https://apicdt-server.com'+'/gradingTable/'+indexT+'/'+token)
    // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+indexT)
    const data = await res.json()
    if(data.length>0){
      var queryString = "?token=" +token +"&indexT="+indexT+"&judgeChiName="+getParameterByName('judgeChiName');
      setTimeout(() => {
        window.location.href = "gradingImpression" + queryString;
      }, 1000);
    }
    else{
      return;
    }
  }

  const fetchTZTopic = async (indexT) => {
    if(indexT === ''){
      return;
    }

    const res = await fetch('https://apicdt-server.com'+'/registerTopic/'+indexT)
    // const res = await fetch('https://apicdt-server.com'+'registerJudge/'+indexT)
    const data = await res.json()
    // console.log(data)
    try{
      setTopic(data[0].topic);
    }
    catch(err){
      
    };

  }

  if(start){

    // if((getParameterByName('indexT')===null)|| (getParameterByName('token')===null)){
    //   setTimeout(() => history.push({
    //       pathname: '/judgeLogin',
    //   }), 1000);
    // }
    fetchTZTopic(getParameterByName('indexT'));
    findGradingTable(getParameterByName('indexT'),getParameterByName('token'))
    setStart(false);
  }


  const checkFill = () =>{
    setDialogOpen(true);
  } 

  const onSubmit = (e) => {
    e.preventDefault()
    setDialogOpen(false);
    addGradingTableData(rows, affDef, affFree, affTeamwork, negDef, negFree, negTeamwork, affTotal, negTotal);
  }
  
 

  const history = useHistory();

  return (
    <section className="header-gradient">
      <CheckDialog open={checkDialogOpen} setOpen={setCheckDialogOpen} submit={onCheckSubmit}/>
      <GradingDialog open={dialogOpen} setOpen={setDialogOpen} content={<div>
        <Table aria-label="caption table">
          <TableHead>
              <TableCell  colSpan={6}><div className = "empt" >红色字体为0分项目，请确认分数。</div></TableCell>
          </TableHead>
          <colgroup>
            <col style={{ width: '12%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell colSpan={6}><div><h4>正方</h4></div></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(0, 4).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row"><div>{speaker[row.name]}</div></TableCell>
                <TableCell align="right"><div className={`${(row.mark1===0 || row.mark1==='0') ? "empt" : ""} `}><div>{title[row.name]['mark1'].slice(0, -5)}</div >{row.mark1}</div></TableCell>
                <TableCell align="right">{title[row.name]['mark2'] === '-' ? '-' : <div className={`${(row.mark2===0 || row.mark2=== '0' )? "empt" : ""} `} ><div>{title[row.name]['mark2'].slice(0, -5)}</div>{row.mark2}</div>}</TableCell>
                <TableCell align="right">{title[row.name]['mark3'] === '-' ? '-' : <div className={`${(row.mark3===0 || row.mark3=== '0' )? "empt" : ""} `}><div>{title[row.name]['mark3'].slice(0, -5)}</div>{row.mark3}</div>}</TableCell>
                <TableCell align="right"><div className={`${(row.mark4===0 || row.mark4=== '0' ) ? "empt" : ""} `}><div>{title[row.name]['mark4'].slice(0, -5)}</div>{row.mark4}</div></TableCell>
                <TableCell align="left"><div>{'总分'}</div>{row.subt}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell  align="right" colSpan={5}><div className={`${(affDef===0 || affDef==='0')? "empt" : ""} `} >答辩(10分)</div></TableCell><TableCell align="left"><div className = {`${(affDef===0 || affDef==='0')? "empt" : ""} `}> {affDef} </div></TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" colSpan={5}><div className={`${(affFree===0 || affFree==='0') ? "empt" : ""} `} >自由辩论(80分)</div></TableCell><TableCell align="left"><div className = {`${(affFree===0 || affFree==='0') ? "empt" : ""} `}> {affFree} </div></TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" colSpan={5}><div className={`${(affTeamwork===0 || affTeamwork==='0') ? "empt" : ""} `}>团体配合与合作精神(30分)</div></TableCell><TableCell align="left"><div className = {`${(affTeamwork===0 || affTeamwork==='0') ? "empt" : ""} `}> {affTeamwork } </div></TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" colSpan={5}><div style={{ fontSize: "130%" }}>总分(400分)</div></TableCell><TableCell align="left"><div style={{ fontSize: "130%", fontWeight: "bolder" }}>{affTotal}</div></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table aria-label="caption table">
          <caption></caption>
          <colgroup>
            <col style={{ width: '12%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '15%' }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell colSpan={6}><div><h4>反方</h4></div></TableCell></TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(4, 8).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row"><div>{speaker[row.name]}</div></TableCell>
                <TableCell align="right"><div className={`${(row.mark1===0 || row.mark1==='0') ? "empt" : ""} `}><div>{title[row.name]['mark1'].slice(0, -5)}</div >{row.mark1}</div></TableCell>
                <TableCell align="right">{title[row.name]['mark2'] === '-' ? '-' : <div className={`${(row.mark2===0 || row.mark2=== '0' )? "empt" : ""} `} ><div>{title[row.name]['mark2'].slice(0, -5)}</div>{row.mark2}</div>}</TableCell>
                <TableCell align="right">{title[row.name]['mark3'] === '-' ? '-' : <div className={`${(row.mark3===0 || row.mark3=== '0' )? "empt" : ""} `}><div>{title[row.name]['mark3'].slice(0, -5)}</div>{row.mark3}</div>}</TableCell>
                <TableCell align="right"><div className={`${(row.mark4===0 || row.mark4=== '0' ) ? "empt" : ""} `}><div>{title[row.name]['mark4'].slice(0, -5)}</div>{row.mark4}</div></TableCell>
                <TableCell align="left"><div>{'总分'}</div>{row.subt}</TableCell>
            </TableRow>
            ))}
            <TableRow>
              <TableCell align="right" colSpan={5}><div className={`${(negDef===0 || negDef==='0') ? "empt" : ""} `}>答辩(10分)</div></TableCell><TableCell align="left"><div className = {`${(negDef===0 || negDef==='0') ? "empt" : ""} `} >{negDef} </div></TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" colSpan={5}><div className={`${(negFree===0 || negFree==='0') ? "empt" : ""} `} >自由辩论(80分)</div></TableCell><TableCell align="left"><div className = {`${(negFree===0 || negFree==='0') ? "empt" : ""} `} >{negFree}</div></TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" colSpan={5}><div className={`${(negTeamwork===0 ||negTeamwork==='0') ? "empt" : ""} `} >团体配合与合作精神(30分)</div></TableCell><TableCell align="left"><div className = {`${(negTeamwork===0 ||negTeamwork==='0') ? "empt" : ""} `} >{negTeamwork}</div></TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" colSpan={5}><div style={{ fontSize: "130%" }}>总分(400分)</div></TableCell><TableCell align="left"><div style={{ fontSize: "130%", fontWeight: "bolder" }}>{negTotal}</div></TableCell>
            </TableRow>
          </TableBody></Table>
      </div>
      }
        submit={onSubmit}
      />
      <div className="main_block">
        <Alert show={showS} className="alert" variant="success" onClose={() => setShowS(false)} dismissible>
          <Alert.Heading className="alertHeading"> 提交成功 ！/ Registration Successful ！ </Alert.Heading>
        </Alert>
        <Alert show={showF} className="alert" variant="danger" onClose={() => setShowF(false)} dismissible>
          <Alert.Heading className="alertHeading"> 提交失败 ！/ Registration Failed ！ </Alert.Heading>
        </Alert>
        <div className="row register_header">
          <div className="col-12">
            <span> 正赛 </span>
          </div>
          <div className="col-12">
            <span> 辩题：{topic} </span>
          </div>
        </div>
        <Stepper step={0} />

        <div className="row register_header">
          <span className="col-12"> 分数票 </span>
        </div>
        <div className="regBlock row">
          <form className="col-12 regForm" noValidate>
            <div className="tablecontainer">
              <Table className={classes.table} aria-label="caption table">
                <caption></caption>
                <colgroup>
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '25%' }} />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={5}><div><h3>正方</h3><h5 style={{ fontSize: "120%", color: "grey" }}>若选手掉线超过缓冲时间，请在对应环节的分数栏打勾‘✔’，则该辩手在该环节的分数直接计为零分。</h5></div></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(0, 4).map(row => (
                    <StyledTableRow key={row.id}>
                      <TableCell align='center'>
                        <div style={{ fontSize: "150%" }}>
                          {speaker[row.name]}</div>
                      </TableCell>
                      <CustomTableCell {...{ row, id: "name", name: "mark1", onChange, handleChange, setCheckData,setCheckDialogOpen, checkState: (timeoutlist.includes(row.id + "mark1")) }} />
                      <CustomTableCell {...{ row, id: "name", name: "mark2", onChange, handleChange, setCheckData,setCheckDialogOpen, checkState: (timeoutlist.includes(row.id + "mark2")) }} />
                      <CustomTableCell {...{ row, id: "name", name: "mark3", onChange, handleChange, setCheckData,setCheckDialogOpen, checkState: (timeoutlist.includes(row.id + "mark3")) }} />
                      <CustomTableCell {...{ row, id: "name", name: "mark4", onChange, handleChange, setCheckData,setCheckDialogOpen, checkState: (timeoutlist.includes(row.id + "mark4")) }} />
                      <CustomTableCell {...{ row, id: "name", name: "subt", onChange, handleChange, setCheckData,setCheckDialogOpen, checkState: (timeoutlist.includes(row.id + "subt")) }} />
                    </StyledTableRow>
                  ))}
                  <TableRow>
                    <TableCell align="right" colSpan={5}><div style={{ fontSize: "120%" }}>答辩(10分)</div></TableCell>
                    <TableCell align="left"><Input type="number" value={affDef === 0 ? '' : affDef} onWheel={(e) => e.target.blur()} placeholder="0" inputProps={{ min: 0, max: 10 }} onChange={e => { setAffDef((e.target.value > 10 || e.target.value <0)? affDef : (e.target.value ? e.target.value : 0) )}} /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" colSpan={5}><div style={{ fontSize: "120%" }}>自由辩论(80分)</div></TableCell>
                    <TableCell align="left"><Input type="number" value={affFree === 0 ? '' : affFree} onWheel={(e) => e.target.blur()} placeholder="0" inputProps={{ min: 0, max: 80 }} onChange={e => { setAffFree((e.target.value > 80 || e.target.value <0) ? affFree : (e.target.value ? e.target.value : 0) ) }} /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" colSpan={5}><div style={{ fontSize: "120%" }}>团体配合与合作精神(30分)</div></TableCell>
                    <TableCell align="left"><Input type="number" value={affTeamwork === 0 ? '' : affTeamwork} onWheel={(e) => e.target.blur()} placeholder="0" inputProps={{ min: 0, max: 30 }} onChange={e => { setAffTeamwork((e.target.value > 30 || e.target.value <0) ? affTeamwork : (e.target.value ? e.target.value : 0)) }} /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" colSpan={5}><div style={{ fontSize: "170%" }}>总分(400分)</div></TableCell>
                    <TableCell align="left"><div style={{ fontSize: "170%", fontWeight: "bolder" }}>{affTotal}</div></TableCell>
                  </TableRow>
                </TableBody>
              </Table></div>

            <div className="tablecontainer">
              <Table className={classes.table} aria-label="caption table">
                <caption></caption>
                <colgroup>
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '25%' }} />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={5}><div><h3>反方</h3><h5 style={{ fontSize: "120%", color: "grey" }}>若选手掉线超过缓冲时间，请在对应环节的分数栏打勾‘✔’，则该辩手在该环节的分数直接计为零分。</h5></div></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(4, 8).map(row => (
                    <StyledTableRow key={row.id}>
                      <TableCell align="center">
                        <div style={{ fontSize: "150%" }}>{speaker[row.name]}</div>
                      </TableCell>
                      <CustomTableCell {...{ row, id: "name", name: "mark1", onChange, handleChange, setCheckData, setCheckDialogOpen, checkState: (timeoutlist.includes(row.id + "mark1")) }} />
                      <CustomTableCell {...{ row, id: "name", name: "mark2", onChange, handleChange, setCheckData, setCheckDialogOpen, checkState: (timeoutlist.includes(row.id + "mark2")) }} />
                      <CustomTableCell {...{ row, id: "name", name: "mark3", onChange, handleChange, setCheckData, setCheckDialogOpen, checkState: (timeoutlist.includes(row.id + "mark3")) }} />
                      <CustomTableCell {...{ row, id: "name", name: "mark4", onChange, handleChange, setCheckData, setCheckDialogOpen, checkState: (timeoutlist.includes(row.id + "mark4")) }} />
                      <CustomTableCell {...{ row, id: "name", name: "subt", onChange, handleChange, setCheckData, setCheckDialogOpen, checkState: (timeoutlist.includes(row.id + "subt")) }} />
                    </StyledTableRow>
                  ))}
                  <TableRow>
                    <TableCell align="right" colSpan={5}><div style={{ fontSize: "120%" }}>答辩(10分)</div></TableCell>
                    <TableCell align="left"><Input type="number" value={negDef === 0 ? '' : negDef} onWheel={(e) => e.target.blur()} placeholder="0" inputProps={{ min: 0, max: 10 }} onChange={e => { setNegDef((e.target.value > 10 || e.target.value <0) ? negDef : (e.target.value ? e.target.value : 0)) }} /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" colSpan={5}><div style={{ fontSize: "120%" }}>自由辩论(80分)</div></TableCell>
                    <TableCell align="left"><Input type="number" value={negFree === 0 ? '' : negFree} onWheel={(e) => e.target.blur()} placeholder="0" inputProps={{ min: 0, max: 80 }} onChange={e => { setNegFree((e.target.value > 80 || e.target.value <0) ? negFree : (e.target.value ? e.target.value : 0)) }} /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" colSpan={5}><div style={{ fontSize: "120%" }}>团体配合与合作精神(30分)</div></TableCell>
                    <TableCell align="left"><Input type="number" value={negTeamwork === 0 ? '' : negTeamwork} onWheel={(e) => e.target.blur()} placeholder="0" inputProps={{ min: 0, max: 30 }} onChange={e => { setNegTeamwork((e.target.value > 30 || e.target.value <0) ? negTeamwork : (e.target.value ? e.target.value : 0)) }} /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right" colSpan={5}><div style={{ fontSize: "170%" }}>总分(400分)</div></TableCell>
                    <TableCell align="left"><div style={{ fontSize: "170%", fontWeight: "bolder" }}>{negTotal}</div></TableCell>
                  </TableRow>
                </TableBody>
              </Table></div>

            <button type="button" onClick={checkFill} className="btn sub btn btn-primary" data-toggle="modal" data-target="#exampleModal" value='Save Form'>
              <span className="englishF"> Submit / </span> <span> 提交 </span>
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default GradingTable;
