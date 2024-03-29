/* 
spoiler/revealer title > title | description of warehouse

--- > on opening spoiler 

ItemList

*/

import React, { useState } from 'react';
import ItemList from './ItemList'; 

//TODO Fill in with database items
const items = [
    { id: 1, name: 'Item 1', quantity: 3 },
    { id: 2, name: 'Item 2', quantity: 5 },
    { id: 3, name: 'Item 3', quantity: 2 },
  ];

interface Item {
    id: number;
    name: string;
    quantity: number;
}

interface WarehouseProps {
    id: number;
    title: string;
    description: string;
    onEdit: () => void;
    onRemove: () => void;
}

const WarehouseCard: React.FC<WarehouseProps> = ({ title, description, onEdit, onRemove }) => {
  const [isSpoilerOpen, setIsSpoilerOpen] = useState(false);

  const handleSpoilerToggle = () => {
    setIsSpoilerOpen(!isSpoilerOpen);
  };

  return (
    <div>
      <div style={{ cursor: 'pointer' }} onClick={handleSpoilerToggle}>
        {isSpoilerOpen ? '▼' : '►'} {title} | {description}
      </div>
      {isSpoilerOpen && <ItemList items={items} />}
      <button onClick={onEdit}>Edit Warehouse</button>
      <button onClick={onRemove}>Delete Warehouse</button>
    </div>
  );
};

export default WarehouseCard;
