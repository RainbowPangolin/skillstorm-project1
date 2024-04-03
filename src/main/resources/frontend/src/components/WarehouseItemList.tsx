import React, { useState } from 'react';
import ItemEntry from './WarehouseItemEntry'; // Assuming the file path of your ItemEntry component
import { Item } from '../interfaces/Item';
import * as dc from './DialogComponents';
import { Warehouse } from '../interfaces/Warehouse';

interface ItemListProps {
  items: Item[];
  warehouse: Warehouse;
  refreshMethod: () => void; 
}

const ItemList: React.FC<ItemListProps> = ({ items, warehouse, refreshMethod}) => {
  const [isAdding, setIsAdding] = useState(false);


  const handleEdit = (id: number, newQuantity: number) => {
    // Logic to handle editing an item
    console.log(`Editing item with ID ${id}. New quantity: ${newQuantity}`);
  };

  const handleRemove = (id: number, reason: string) => {
    // Logic to handle removing an item
    console.log(`Removing item with ID ${id}. Reason: ${reason}`);
  };

  const handleAdd = () => {
    // Logic to handle removing an item
    setIsAdding(true);
  };

  const handleCloseDialog = () => {
    refreshMethod();
    setIsAdding(false);
  };

  return (
    <div className="">
      <h1>Item Entries</h1>
      <button className="button" onClick={handleAdd}>Add new item to warehouse</button>
      {isAdding && <dc.AddItemDialog onClose={handleCloseDialog} warehouse={warehouse}/>}        

      <ul className="inner-list">
        {items.map((item) => (
          <li key={item.name}>
            <ItemEntry key={item.itemid} item={item} warehouse={warehouse} refreshMethod={refreshMethod} />
          </li>
        ))} 
      </ul>
      
    </div>
  );
};

export default ItemList;
