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

  return (
      <Table striped bordered className="padded">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <SimpleItemEntry key={item.itemid} item={item} refreshMethod={refreshMethod} />
          ))}
        </tbody>
      </Table>
  );
};

export default ItemListStandalone;
