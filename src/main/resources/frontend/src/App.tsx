import React, { useState } from 'react';
import './App.css';
import WarehouseManagement from './components/WarehouseManager/WarehouseManagement';
import ItemManagement from './components/ItemManager/ItemManagement';

import { Container, Button, Navbar, Nav } from 'reactstrap';

function App() {
  const [showWarehouseManagement, setShowWarehouseManagement] = useState<boolean>(true);
  const [showItemManagement, setShowItemManagement] = useState<boolean>(false);

  const toggleWarehouseManagement = () => {
    setShowWarehouseManagement(true);
    setShowItemManagement(false);
  };

  const toggleItemManagement = () => {
    setShowWarehouseManagement(false);
    setShowItemManagement(true);
  };


  return (
    <div className="App">
      <Navbar>

      </Navbar>
      <header className="App-header">
        <Container className="vertical-present">
          <Navbar className="button-container horizontal-present">
            <Button color="primary" onClick={toggleWarehouseManagement}>WarehouseManager</Button>
            <Button color="primary" onClick={toggleItemManagement}>ItemManager</Button>
          </Navbar>
        </Container>

        {showWarehouseManagement && <WarehouseManagement />}
        {showItemManagement && <ItemManagement />}

      </header>
    </div>
  );
}

export default App;
