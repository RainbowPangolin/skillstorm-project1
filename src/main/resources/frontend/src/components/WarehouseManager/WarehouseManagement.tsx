import React, { useEffect, useState } from 'react';
import WarehouseCard from './WarehouseCard';
import { Warehouse } from '../../interfaces/Warehouse'; // Import Warehouse interface
import * as dc from '../DialogComponents';


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
    <div className="card">
      <h1>Manage Warehouses</h1>

      <div>
        <button className="button" onClick={handleAddWarehouse}>Add warehouse</button>
        {/* Render the dialog component if isDialogOpen is true */}
        {isDialogOpen && <dc.AddWarehouseDialog onClose={handleCloseDialog} />}        
      </div>

      {data ? (
        <ul className="list">
          {data.map(wh => (
            <li key={wh.name}>
              <WarehouseCard warehouse={wh} refreshMethod={refreshWarehouses}/>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WarehouseManagement;
