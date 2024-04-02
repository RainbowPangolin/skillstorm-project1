import React, { useEffect, useState } from 'react';
import WarehouseCard from './WarehouseCard';
import { Warehouse } from '../interfaces/Warehouse'; // Import Warehouse interface


interface WarehouseManagementProps {}

const WarehouseManagement: React.FC<WarehouseManagementProps> = () => {
  const [data, setData] = useState<Warehouse[] | null>(null); // Specify the type here

  useEffect(() => {
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

    fetchData();

    return () => {
      // Cleanup function if needed
    };
  }, []);

  const handleAddWarehouse = () => {
    console.log('Adding a new warehouse');
  };

  const handleEditWarehouse = (id: number) => {
    console.log(`Editing warehouse with ID ${id}`);
  };

  const handleDeleteWarehouse = (id: number) => {
    console.log(`Deleting warehouse with ID ${id}`);
  };

  return (
    <div>
      <h1>{}</h1>
      <div>
        <button onClick={handleAddWarehouse}>Add warehouse</button>
        <button onClick={() => console.log('Editing warehouse')}>Edit warehouse</button>
        <button onClick={() => console.log('Deleting warehouse')}>Delete warehouse</button>
      </div>
  
      <h1>My Component</h1>
      {data ? (
        <ul>
          {data.map(item => (
            <li key={item.name}>
              <WarehouseCard warehouse={item} />
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
