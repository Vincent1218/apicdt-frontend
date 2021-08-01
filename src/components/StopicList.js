import React from 'react'
import Stopic from './Stopic.js';
import ListGroup from 'react-bootstrap/ListGroup';




const StopicList = ({ stopics }) => {
  return (
    <ListGroup>
      {stopics.map((stopic) => (
        <Stopic key = {stopic.topic} topic={stopic.topic} />
      ))}
    </ListGroup>
  )
}

export default StopicList
