import React from 'react'
import handbookcover from '../assets/image/handbookcover.jpg';
import handbook from '../assets/file/yataihandbook.pdf';

import './css/Handbook.css';

const Handbook = () => {
  return (
    <div className="mainBlockBracket">
      <div className = "HBTitle">
        点击下载手册
      </div>
      <a href={handbook} alt="HB"> <img src={handbookcover} alt="Cover" className="handbook"/> </a>
    </div>
  )
}

export default Handbook
