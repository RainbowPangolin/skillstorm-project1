import React, { useState } from 'react';
import './App.css';
import WarehouseManagement from './components/WarehouseManager/WarehouseManagement';
import ItemManagement from './components/ItemManager/ItemManagement';

import { Container, Button } from 'reactstrap';

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
      <header className="App-header">
        <Container>
          <div className="button-container">
            <Button color="primary" onClick={toggleWarehouseManagement}>WarehouseManager</Button>
            <Button color="primary" onClick={toggleItemManagement}>ItemManager</Button>
          </div>
          {showWarehouseManagement && <WarehouseManagement />}
          {showItemManagement && <ItemManagement />}
        </Container>
      </header>
    </div>
  );
}

export default App;
