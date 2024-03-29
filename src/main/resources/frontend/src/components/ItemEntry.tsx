/*

item id | item name | quantity | edit button* | remove all ** | information box ***

* allows changing of item quantity 
** confirmation pop up includes a 'reason for deleting'

*/
import React, { useState } from 'react';

interface Item {
  id: number;
  name: string;
  quantity: number;
}

interface ItemComponentProps {
  item: Item;
  onEdit: (id: number, newQuantity: number) => void;
  onRemove: (id: number, reason: string) => void;
}

const ItemEntry: React.FC<ItemComponentProps> = ({ item, onEdit, onRemove }) => {
  const [deleteReason, setDeleteReason] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const handleEdit = () => {
    const newQuantity = prompt(`Enter new quantity for ${item.name}:`, item.quantity.toString());
    if (newQuantity !== null && !isNaN(parseInt(newQuantity))) {
      onEdit(item.id, parseInt(newQuantity));
    }
  };

  const handleRemove = () => {
    setShowConfirmation(true);
  };

  const confirmRemove = () => {
    if (deleteReason.trim() !== '') {
      onRemove(item.id, deleteReason);
      setDeleteReason('');
      setShowConfirmation(false);
    } else {
      alert('Please provide a reason for deleting.');
    }
  };

  return (
    <div className="item">
      <div>ID: {item.id}</div>
      <div>Name: {item.name}</div>
      <div>Quantity: {item.quantity}</div>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleRemove}>Remove All</button>
      {showConfirmation && (
        <div className="confirmation">
          <p>Please provide a reason for deleting:</p>
          <input
            type="text"
            value={deleteReason}
            onChange={(e) => setDeleteReason(e.target.value)}
          />
          <button onClick={confirmRemove}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default ItemEntry;
