import React, { useState } from 'react';
import ItemEntry from './WarehouseItemEntry'; 
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
      <div className="horizontal-present title-line warehouse-header ">
        <CardTitle tag="h3">Item List</CardTitle>
        <Button className="inner-button" style={{ backgroundColor: '#aaffff', color: 'black', margin: '2%' }}  onClick={handleAdd}>Add new item to warehouse</Button>
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
