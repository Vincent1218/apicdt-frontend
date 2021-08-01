import React from 'react'
import { useState, useEffect } from 'react'
import './css/SchoolList.css'
import Winner from '../components/Winner.js'
import {serverURL} from '../config'

const StarwarsList = () => {

  const [winners, setWinners] = useState([]);

  useEffect(() => {
    const getWinners = async () => {
      const winnersDB = await fetchWinners()
      setWinners(winnersDB)
    }

    getWinners()
  }, [])

  const fetchWinners = async () => {
    // const res = await fetch('https://apicdt-server.com/starwars')
    // const res = await fetch('https://apicdt-server.com' + '/starwars')
    const res = await fetch(serverURL + 'starwarsuk')

    const data = await res.json()
    var temp = data.length;
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
    return array
  }



  return (
    <div className="schoolsBlock container" >
      <div className = "listHeader">
        电子抽签报名成功队伍
      </div>
      {winners.map((winner, index) => (
        <Winner key={index} winner={winner}/>
      ))}
    </div>
  )
}

export default StarwarsList
