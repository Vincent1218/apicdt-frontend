import React from 'react'
import './css/Stopic.css';
import ListGroup from 'react-bootstrap/ListGroup';

const Stopic = ({topic}) => {
  return (
    <ListGroup.Item className = "smallbox" >
      {topic}
    </ListGroup.Item>
  )
}

export default Stopic
