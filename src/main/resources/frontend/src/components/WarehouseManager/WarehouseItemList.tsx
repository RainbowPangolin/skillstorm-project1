import React, { useState } from 'react';
import ItemEntry from './WarehouseItemEntry'; // Assuming the file path of your ItemEntry component
import { Item } from '../../interfaces/Item';
import * as dc from '../DialogComponents';
import { Warehouse } from '../../interfaces/Warehouse';
import { Button, CardTitle, Table } from 'reactstrap';

interface ItemListProps {
  items: Item[];
  warehouse: Warehouse;
  refreshMethod: () => void; 
}

const ItemList: React.FC<ItemListProps> = ({ items, warehouse, refreshMethod }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleCloseDialog = () => {
    refreshMethod();
    setIsAdding(false);
  };

  return (
    <div>
      <div className="horizontal-present">
        <CardTitle tag="h3">Item List</CardTitle>
        <Button color="secondary" onClick={handleAdd}>Add new item to warehouse</Button>
      </div>
      {isAdding && <dc.AddItemDialog onClose={handleCloseDialog} warehouse={warehouse} />}        

      <Table striped bordered>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Item Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ItemEntry key={item.itemid} item={item} warehouse={warehouse} refreshMethod={refreshMethod} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ItemList;
