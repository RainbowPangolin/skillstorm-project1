import React, { useState } from 'react';
import './css/App.css';
import './css/fonts.css';
import WarehouseManagement from './components/WarehouseManager/WarehouseManagement';
import ItemManagement from './components/ItemManager/ItemManagement';
import Homepage from './components/Homepage'; 

import { Container, Navbar, NavLink } from 'reactstrap';
import DebugButtons from './components/DebugButtons';

function App() {
  const [showWarehouseManagement, setShowWarehouseManagement] = useState<boolean>(false);
  const [showItemManagement, setShowItemManagement] = useState<boolean>(false);
  const [showHomepage, setShowHomepage] = useState<boolean>(true); 

  const toggleWarehouseManagement = () => {
    setShowWarehouseManagement(true);
    setShowItemManagement(false);
    setShowHomepage(false); 
  };

  const toggleItemManagement = () => {
    setShowWarehouseManagement(false);
    setShowItemManagement(true);
    setShowHomepage(false); 
  };

  const toggleThirdComponent = () => {
    setShowWarehouseManagement(false);
    setShowItemManagement(false);
    setShowHomepage(true); 
  };

  return (
    <div className="App">
      <header className="App-header">
        <Navbar className="top-nav">
        <NavLink color="primary" onClick={toggleThirdComponent}>Home</NavLink>
          <div className="button-container horizontal-present">  
            <NavLink color="primary" onClick={toggleWarehouseManagement}>WarehouseManager</NavLink>
            <NavLink color="primary" onClick={toggleItemManagement}>ItemManager</NavLink>
          </div>
        </Navbar>
      </header>
      
      <Container className="roomy">
        {showWarehouseManagement && <WarehouseManagement />}
        {showItemManagement && <ItemManagement />}
        {showHomepage && <Homepage />} 
      </Container>

      {!showHomepage && <DebugButtons />}
    </div>
  );
}

export default App;
