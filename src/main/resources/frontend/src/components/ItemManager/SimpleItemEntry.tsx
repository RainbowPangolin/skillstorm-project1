import * as dc from '../DialogComponents';
import React, { useState } from 'react';
import { Item } from '../../interfaces/Item';
import { Button, Table } from 'reactstrap';

interface ItemComponentProps {
  item: Item;
  refreshMethod: () => void;
}

const SimpleItemEntry: React.FC<ItemComponentProps> = ({ item, refreshMethod }) => {
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
    <tr>
      <td>{item.itemid}</td>
      <td>{item.name}</td>
      <td>{item.quantity}</td>
      <td>
        <Button color="primary" className="inner-button" onClick={handleEdit}>Edit</Button>
        <Button color="danger" className="inner-button" onClick={handleRemove}>Delete</Button>
      </td>
      {isEditing && <dc.EditItemDialogNoQuantity onClose={handleCloseDialog} item={item} />}
      {isRemoving && <dc.RemoveItemDialogGlobal onClose={handleCloseDialog} item={item} />}
    </tr>
  );
};

export default SimpleItemEntry;
