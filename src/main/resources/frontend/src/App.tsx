import React, { useState } from 'react';
import './App.css';
import WarehouseManagement from './components/WarehouseManagement';
import ItemManagement from './components/ItemManagement';

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
        <div className="button-container">
          <button className="button" onClick={toggleWarehouseManagement}>WarehouseManager</button>
          <button className="button" onClick={toggleItemManagement}>ItemManager</button>
        </div>
        {showWarehouseManagement && <WarehouseManagement/>}
        {showItemManagement && <ItemManagement />}
      </header>
    </div>
  );
}

export default App;
