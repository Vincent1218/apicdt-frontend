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
      <div className="matchTitle">返尔赛</div>
      <img src={imageFan} alt="MatchUpTable" className="matchUpTable"  width="85%" />
      <Footer/>
    </div>
  )
}

export default MatchUpTable
