import * as dc from './DialogComponents';
import React, { useState } from 'react';
import { Item } from '../interfaces/Item';
import { Warehouse } from '../interfaces/Warehouse';

interface ItemComponentProps {
  item: Item;
  warehouse: Warehouse;
  refreshMethod: () => void; 
}

const ItemEntry: React.FC<ItemComponentProps> = ({ item, warehouse, refreshMethod }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
 

  const [deleteReason, setDeleteReason] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);


  const handleCloseDialog = () => {
    refreshMethod();
    setIsEditing(false);
    setIsRemoving(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleRemove = () => {
    setIsRemoving(true);
  };


  return (
    <div className="item">
      <div>ID: {item.itemid}</div>
      <div>Name: {item.name}</div>
      <div>Quantity: {item.quantity}</div>
      <button onClick={handleEdit}>Edit</button>
      {isEditing && <dc.EditItemDialog onClose={handleCloseDialog} item={item} warehouse={warehouse}/>}  
      <button onClick={handleRemove}>Delete Item</button>
      {isRemoving && <dc.RemoveItemDialog onClose={handleCloseDialog} item={item} warehouse={warehouse}/>}  
    </div>
  );
};

export default ItemEntry;
