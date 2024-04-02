import React from 'react';
import './App.css';
import WarehouseManagement from './components/WarehouseManagement';



const warehouses = [
  {
    id: 1,
    title: "Warehouse 1",
    description: "Description of Warehouse 1"
  },
  {
    id: 2,
    title: "Warehouse 2",
    description: "Description of Warehouse 2"
  },
  {
    id: 3,
    title: "Warehouse 3",
    description: "Description of Warehouse 3"
  }
];


function App() {
  return (
    <div className="App">
      <header className="App-header">
      {/* <ItemEntry item={item} onEdit={() => {}} onRemove={() => {}} /> */}
      <WarehouseManagement title={'asdf'}/>
      </header>
    </div>
  );
}

export default App;
