import React, { useState } from 'react';
import SimpleItemEntry from './SimpleItemEntry'; // Assuming the file path of your ItemEntry component
import { Item } from '../interfaces/Item';
import * as dc from './DialogComponents';
import { Warehouse } from '../interfaces/Warehouse';

interface ItemListProps {
  items: Item[];
  refreshMethod: () => void; 
}

const ItemListStandalone: React.FC<ItemListProps> = ({ items, refreshMethod}) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    // Logic to handle removing an item
    setIsAdding(true);
  };

  const handleCloseDialog = () => {
    refreshMethod();
    setIsAdding(false);
  };

  


  return (
    <div>
      <h1>Item Entries</h1>
      {items.map((item) => (
        <SimpleItemEntry key={item.itemid} item={item} refreshMethod={refreshMethod} />
      ))}
    </div>
  );
};

export default ItemListStandalone;
