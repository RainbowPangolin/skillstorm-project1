import React, { useState } from 'react';
import SimpleItemEntry from './SimpleItemEntry';
import { Item } from '../../interfaces/Item';
import * as dc from '../DialogComponents';
import { Button, Container, Table } from 'reactstrap';

interface ItemListProps {
  items: Item[];
  refreshMethod: () => void;
}

const ItemListStandalone: React.FC<ItemListProps> = ({ items, refreshMethod }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleCloseDialog = () => {
    refreshMethod();
    setIsAdding(false);
  };

  return (
    <Container>
      <h1>Item Entries</h1>
      <Button color="primary" onClick={handleAdd}>Add new item</Button>
      {isAdding && <dc.AddItemDialog onClose={handleCloseDialog} />}        

      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <SimpleItemEntry key={item.itemid} item={item} refreshMethod={refreshMethod} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ItemListStandalone;
