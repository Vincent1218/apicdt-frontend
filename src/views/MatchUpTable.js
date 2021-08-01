import React from 'react'
import image from '../assets/image/matchUpTable.jpg';
import imageFan from '../assets/image/fanmatch.jpg';
import '../views/css/MatchUpTable.css'
import Footer from '../components/Footer'

const MatchUpTable = () => {
  return (
    <div>
      <div className="matchTitle">正赛</div>
      <img src={image} alt="MatchUpTable" className="matchUpTable"  width="85%" />
      <div className = "matchUpWinner">工行杯-第十届亚太大专华语辩论公开赛总冠军：华南理工大学</div>
      <div className="matchTitle">返尔赛</div>
      <img src={imageFan} alt="MatchUpTable" className="matchUpTable"  width="85%" />
      <div className = "matchUpWinner">工行杯-亚太特别企划-返尔赛总冠军：如果夺冠能不能拿常年杯</div>
      <Footer/>
    </div>
  )
}

export default MatchUpTable
