import React, { useState } from 'react';
import { useParams } from 'react-router-dom'
import Navbar from '../navbar/Navbar';
import Whiteboard from '../whiteboard/Whiteboard';
import './CallPage.css'
import HomePage from '../homePage/homePage'

export default function CallPage() {
  const { id: documentId } = useParams();
  const [btnText, updatebtnText] = useState("Whiteboard");

  const copyRoomId = () => {
    let data = documentId;
    //data.select();
    navigator.clipboard.writeText(data);
  }

  const handleWhiteboard = () => {
    if (btnText === "Whiteboard") {
      updatebtnText("CodeArea");
    }
    else {
      updatebtnText("Whiteboard");
    }
  }

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          {/* <img src='/docs/5.1/assets/brand/bootstrap-logo.svg' alt="" width="30" height="24" class="d-inline-block align-text-top"/> */}
          <span className="navbar-brand mb-0 h1" style={{ color: '#268daa' }}>InterviewGuide</span>

          <div className="mx-2">
            <span style={{ color: '#268daa' }}>{`Room Id: ${documentId}`}</span>
            <button className='mx-1' onClick={copyRoomId}>Copy</button>
          </div>
          <div className="d-flex">
            <button className="btn btn-outline-primary mx-2" onClick={handleWhiteboard}>{btnText}</button>
            <button className="btn btn-outline-primary mx-2" >Share Screen</button>
            <button className="btn btn-outline-primary mx-2" >Leave Room</button>
          </div>
        </div>
      </nav>

      {(btnText === 'Whiteboard') ?
        <div className='containe' >
          <div className='color-picker-container'>
            <input type="color" />
          </div>

          <div className="board-container">
            <Whiteboard id={documentId} />
          </div>

        </div>
      :  <HomePage/>
      } 
    </>
  )
}
