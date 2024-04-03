import * as dc from '../DialogComponents';
import React, { useState } from 'react';
import { Item } from '../../interfaces/Item';
import { Warehouse } from '../../interfaces/Warehouse';
import { Button } from 'reactstrap';

interface ItemComponentProps {
  item: Item;
  warehouse: Warehouse;
  refreshMethod: () => void; 
}

const ItemEntry: React.FC<ItemComponentProps> = ({ item, warehouse, refreshMethod }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

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
    <tr>
      {/* <td>{item.itemid}</td> */}
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td>{item.quantity}</td>
      <td>
        <Button color="primary" className="inner-button" onClick={handleEdit}>Edit</Button>
        <Button color="danger" className="inner-button" onClick={handleRemove}>Delete</Button>
      </td>
      {isEditing && <dc.EditItemDialog onClose={handleCloseDialog} item={item} warehouse={warehouse}/>}  
      {isRemoving && <dc.RemoveItemDialog onClose={handleCloseDialog} item={item} warehouse={warehouse}/>}  
    </tr>
  );
};

export default ItemEntry;
