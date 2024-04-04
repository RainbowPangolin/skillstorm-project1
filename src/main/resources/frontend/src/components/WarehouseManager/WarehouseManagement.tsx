import React, { useEffect, useState } from 'react';
import WarehouseCard from './WarehouseCard';
import { Warehouse } from '../../interfaces/Warehouse'; // Import Warehouse interface
import * as dc from '../DialogComponents';
import { Button, Card, CardBody, CardTitle, ListGroup, ListGroupItem, Table } from 'reactstrap';

interface WarehouseManagementProps {}

const WarehouseManagement: React.FC<WarehouseManagementProps> = () => {
  const [data, setData] = useState<Warehouse[] | null>(null); 

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddWarehouse = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    refreshWarehouses();
    setIsDialogOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/warehouses');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const warehouses: Warehouse[] = await response.json(); 
      setData(warehouses);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const refreshWarehouses = () => {
    fetchData();
  };

  useEffect(() => {

    fetchData();

    return () => {
    };
  }, []);

  return (
    <Table className="management-card">
      <CardBody>

        <div className="horizontal-present title-line">
          <CardTitle tag="h3">Manage Warehouses</CardTitle>
          <Button color="secondary" onClick={handleAddWarehouse}>Add warehouse</Button>
        </div>

        {isDialogOpen && <dc.AddWarehouseDialog onClose={handleCloseDialog} />}        

        {data ? (
          <ListGroup className="mt-3">
            {data.map(wh => (
              <ListGroupItem key={wh.name}>
                <WarehouseCard warehouse={wh} refreshMethod={refreshWarehouses}/>
              </ListGroupItem>
            ))}
          </ListGroup>
        ) : (
          <p>Loading...</p>
        )}
      </CardBody>
    </Table>
  );
};

export default WarehouseManagement;
