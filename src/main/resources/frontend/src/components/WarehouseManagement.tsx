/*

Title (WarehouseManagement)

Managing buttons* :
Add warehouse | Edit warehouse | Delete warehouse

*"Manage" button to pop up those options

List of WarehouseCard items
    
*/
import React from 'react';
import WarehouseCard from './WarehouseCard'; // Assuming the file path of your WarehouseCard component
import { useEffect } from 'react';

interface WarehouseManagementProps {
  title: string;
  // warehouses: {
  //   id: number;
  //   title: string;
  //   description: string; 
  // }[]; fds 
}



const WarehouseManagement: React.FC<WarehouseManagementProps> = ({ title }) => {

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        console.log("Asdf")
        // Fetch data from the API
        const response = await fetch('http://localhost:8080/api/warehouses');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        // Parse the JSON response
        const jsonData = await response.json();
        // Update the state with the fetched dataasds
        console.log(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();

    // Cleanup function
    return () => {
      // Perform cleanup if needed (e.g., abort fetch)
    };
  }, []); // Empty dependency array to run effect only once


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
        {/* {warehouses.map((warehouse) => (
          <WarehouseCard
            id={warehouse.id}
            title={warehouse.title}
            description={warehouse.description}
            onEdit={() => handleEditWarehouse(warehouse.id)}
            onRemove={() => handleDeleteWarehouse(warehouse.id)}
          />
        ))} */}
      </div>
    </div>
  );
};

export default WarehouseManagement;
