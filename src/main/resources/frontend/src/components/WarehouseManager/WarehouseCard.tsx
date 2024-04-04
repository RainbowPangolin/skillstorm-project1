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
  const [utilization, setUtilization] = useState(0);
 
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

  const fetchUtilization = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/warehouseutilization/${warehouse.name}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const utilization: number = await response.json(); 
      setUtilization(utilization);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {  
    fetchData();
    fetchUtilization();
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
    fetchUtilization();
  };

  return (
    <div >
      <div className="item-list-container">
        <div className="flex-grow-item" >
          <div className="warehouse-title" style={{ cursor: 'pointer' }} onClick={handleSpoilerToggle}>
            <p>{isSpoilerOpen ? '▼' : '►'}</p> 
            <p>{warehouse.name}</p>
            <p>{warehouse.location}</p>
            <p>{utilization} out of {warehouse.capacity}</p>
          </div>
        </div>

        <div className="button-container">
          <Button color="primary" className="inner-button" onClick={handleEdit}>Edit</Button>
          <Button color="danger" className="inner-button" onClick={handleRemove}>Delete</Button>
        </div>
        
        {isEditing && <dc.EditWarehouseDialog onClose={handleCloseDialog} warehouse={warehouse} />}
        {isRemoving && <dc.RemoveWarehouseDialog onClose={handleCloseDialog} warehouse={warehouse} />}
      </div>
      
      <Collapse isOpen={isSpoilerOpen} >
        {itemList && (
          <div>
            <CardBody >
              <ItemList items={itemList} warehouse={warehouse} refreshMethod={refreshItemList} />
            </CardBody>
          </div>
        )}
      </Collapse>
    </div>
  );
};

export default WarehouseCard;
