/*

Title (WarehouseManagement)

Managing buttons* :
Add warehouse | Edit warehouse | Delete warehouse

*"Manage" button to pop up those options

List of WarehouseCard items
    
*/
import React from 'react';
import WarehouseCard from './WarehouseCard'; // Assuming the file path of your WarehouseCard component

interface WarehouseManagementProps {
  title: string;
  warehouses: {
    id: number;
    title: string;
    description: string;
  }[];
}

const WarehouseManagement: React.FC<WarehouseManagementProps> = ({ title, warehouses }) => {
  const handleAddWarehouse = () => {
    // Logic to handle adding a new warehouse
    console.log('Adding a new warehouse');
  };

  const handleEditWarehouse = (id: number) => {
    // Logic to handle editing a warehouse
    console.log(`Editing warehouse with ID ${id}`);
  };

  const handleDeleteWarehouse = (id: number) => {
    // Logic to handle deleting a warehouse
    console.log(`Deleting warehouse with ID ${id}`);
  };

  return (
    <div>
      <h1>{title}</h1>
      <div>
        <button onClick={handleAddWarehouse}>Add warehouse</button>
        <button onClick={() => console.log('Editing warehouse')}>Edit warehouse</button>
        <button onClick={() => console.log('Deleting warehouse')}>Delete warehouse</button>
      </div>
      <div>
        {warehouses.map((warehouse) => (
          <WarehouseCard
            id={warehouse.id}
            title={warehouse.title}
            description={warehouse.description}
            onEdit={() => handleEditWarehouse(warehouse.id)}
            onRemove={() => handleDeleteWarehouse(warehouse.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default WarehouseManagement;
