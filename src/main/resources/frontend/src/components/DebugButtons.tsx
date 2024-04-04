import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

const DebugButtons = () => {


  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '1000' }}>
      <Button color="info" onClick={()=>{console.log("asdf")}}>Help</Button>
    </div>
  );
}

export default DebugButtons;
