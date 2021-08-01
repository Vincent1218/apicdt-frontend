import React from 'react'
import { useLocation } from "react-router-dom";

const Test = () => {
  const location = useLocation();

  console.log(location.judge);
  console.log(location.topic);
  return (
    <div>
      
    </div>
  )
}

export default Test
