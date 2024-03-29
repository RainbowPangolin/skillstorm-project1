/*

creates a list of ItemEntry using a passed in list object

*/

import React from 'react';
import ItemEntry from './ItemEntry'; // Assuming the file path of your ItemEntry component

interface Item {
  id: number;
  name: string;
  quantity: number;
}

interface ItemListProps {
  items: Item[];
}

const ItemList: React.FC<ItemListProps> = ({ items }) => {
  const handleEdit = (id: number, newQuantity: number) => {
    // Logic to handle editing an item
    console.log(`Editing item with ID ${id}. New quantity: ${newQuantity}`);
  };

  const handleRemove = (id: number, reason: string) => {
    // Logic to handle removing an item
    console.log(`Removing item with ID ${id}. Reason: ${reason}`);
  };

  return (
    <div>
      <h1>Item Entries</h1>
      {items.map((item) => (
        <ItemEntry key={item.id} item={item} onEdit={handleEdit} onRemove={handleRemove} />
      ))}
    </div>
  );
};

export default ItemList;
