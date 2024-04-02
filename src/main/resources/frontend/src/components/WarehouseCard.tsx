import React, { useState } from 'react';
import ItemList from './ItemList'; 
import { Warehouse } from '../interfaces/Warehouse'; // Import Warehouse interface
import { Item } from '../interfaces/Item'; // Import Warehouse interface

//TODO Fill in with database items
const items = [
    { id: 1, name: 'Item 1', quantity: 3 },
    { id: 2, name: 'Item 2', quantity: 5 },
    { id: 3, name: 'Item 3', quantity: 2 },
  ];

interface WarehouseProps {
  warehouse: Warehouse
  // id: number;
    // title: string;
    // description: string;
    // onEdit: () => void;
    // onRemove: () => void;
}

const WarehouseCard: React.FC<WarehouseProps> = ({warehouse}) => { //{ title, description, onEdit, onRemove }
  const [isSpoilerOpen, setIsSpoilerOpen] = useState(false);

  const handleSpoilerToggle = () => {
    setIsSpoilerOpen(!isSpoilerOpen);
  };

  return (
    <div>
      <div style={{ cursor: 'pointer' }} onClick={handleSpoilerToggle}>
        {isSpoilerOpen ? '▼' : '►'} {warehouse.name} | {warehouse.location}
      </div>
      {isSpoilerOpen && <ItemList items={items} />}
      {/* <button onClick={onEdit}>Edit Warehouse</button> */}
      {/* <button onClick={onRemove}>Delete Warehouse</button> */}
    </div>
  );
};

export default WarehouseCard;
