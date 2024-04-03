import React, { useEffect, useState } from 'react';
import ItemList from './WarehouseItemList'; 
import { Warehouse } from '../../interfaces/Warehouse'; 
import { Item } from '../../interfaces/Item'; 
import * as dc from '../DialogComponents';

import { Button, Collapse, Card, CardBody, CardTitle } from 'reactstrap';

interface WarehouseProps {
  warehouse: Warehouse
  refreshMethod: () => void; 
}

const WarehouseCard: React.FC<WarehouseProps> = ({warehouse, refreshMethod}) => {
  const [itemList, setItemList] = useState<Item[] | null>(null); 
  const [isEditing, setIsEditing] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
 
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/items/${warehouse.name}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const items: Item[] = await response.json(); 
      setItemList(items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {  
    fetchData();
  
    return () => {
    };
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleRemove = () => {
    setIsRemoving(true);
  };

  const [isSpoilerOpen, setIsSpoilerOpen] = useState(false);

  const handleSpoilerToggle = () => {
    setIsSpoilerOpen(!isSpoilerOpen);
  };

  const handleCloseDialog = () => {
    refreshMethod();
    setIsEditing(false);
    setIsRemoving(false);
  };

  const refreshItemList = () => {
    fetchData();
  };

  return (
    <div>
      <div className="item-list-container">
        <div className="primary-button flex-grow-item" >
          <div style={{ cursor: 'pointer' }} onClick={handleSpoilerToggle}>
            {isSpoilerOpen ? '▼' : '►'} {warehouse.name} | {warehouse.location} | {warehouse.capacity}
          </div>
        </div>

        <div className="button-container">
          <Button className="inner-button" onClick={handleEdit}>Edit Warehouse</Button>
          <Button className="inner-button" onClick={handleRemove}>Delete Warehouse</Button>
        </div>
        
        {isEditing && <dc.EditWarehouseDialog onClose={handleCloseDialog} warehouse={warehouse} />}
        {isRemoving && <dc.RemoveWarehouseDialog onClose={handleCloseDialog} warehouse={warehouse} />}
      </div>
      
      <Collapse isOpen={isSpoilerOpen}>
        {itemList && (
          <Card>
            <CardBody>
              <CardTitle tag="h5">Item List</CardTitle>
              <ItemList items={itemList} warehouse={warehouse} refreshMethod={refreshItemList} />
            </CardBody>
          </Card>
        )}
      </Collapse>
    </div>
  );
};

export default WarehouseCard;
