import React, { useEffect, useState } from 'react';
import WarehouseCard from './WarehouseCard';
import { Warehouse } from '../../interfaces/Warehouse'; // Import Warehouse interface
import * as dc from '../DialogComponents';
import { Button, Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';

interface WarehouseManagementProps {}

const WarehouseManagement: React.FC<WarehouseManagementProps> = () => {
  const [data, setData] = useState<Warehouse[] | null>(null); // Specify the type here

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
      const warehouses: Warehouse[] = await response.json(); // Specify the type here
      setData(warehouses);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const refreshWarehouses = () => {
    fetchData(); // Redo fetch
  };

  useEffect(() => {

    fetchData();

    return () => {
      // Cleanup function if needed
    };
  }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Manage Warehouses</CardTitle>

        <div>
          <Button color="primary" onClick={handleAddWarehouse}>Add warehouse</Button>
          {/* Render the dialog component if isDialogOpen is true */}
          {isDialogOpen && <dc.AddWarehouseDialog onClose={handleCloseDialog} />}        
        </div>

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
    </Card>
  );
};

export default WarehouseManagement;
