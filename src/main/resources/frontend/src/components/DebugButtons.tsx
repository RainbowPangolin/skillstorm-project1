import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Item } from '../interfaces/Item';
import { Warehouse } from '../interfaces/Warehouse';

const DebugButtons = () => {
    const [response, setResponse] = useState<Response | null>(null);
    const API_BASE_URL = 'http://localhost:8080/api';

    // Generate 5 warehouses 
    const warehouses: Warehouse[] = Array.from({ length: 5 }, (_, index) => ({
        id: index + 1,
        name: `Warehouse ${index + 1}`,
        location: `Location ${index + 1}`,
        capacity: Math.floor(Math.random() * 500) + 1, // Random capacity between 1 and 100
    }));
    
    // Generate 20 items 
    const items: Item[] = Array.from({ length: 20 }, (_, index) => ({
        itemid: index + 1,
        name: `Item ${index + 1}`,
        description: `Description for Item ${index + 1}`,
        quantity: Math.floor(Math.random() * 100) + 1, // Random quantity between 1 and 100
    }));

    async function addWarehouse(warehouse: Warehouse){
        try {
            const response = await fetch(`${API_BASE_URL}/warehouse`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(warehouse),
            });
            if (!response.ok) {
              throw new Error(`Failed to add warehouse: ${response.statusText}`);
            }
            console.log(`Warehouse added successfully: ${warehouse.name}`);
          } catch (error) {
            console.error('Error adding warehouse:', error);
          }
    }

    async function addItemToWarehouse(warehouseName: String, item: Item){
        try {
            const response = await fetch(`${API_BASE_URL}/items/${warehouseName}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(item),
            });
            if (!response.ok) {
              throw new Error(`Failed to add warehouse: ${response.statusText}`);
            }
            console.log(`Item added successfully: ${item.name}`);
          } catch (error) {
            console.error('Error adding warehouse:', error);
          }
    }
    
    function getRandomItems(items : Item[], numberOfItems : number) {
        const shuffledItems = items.sort(() => 0.5 - Math.random()); // Shuffle the items array
        return shuffledItems.slice(0, numberOfItems); // Get the first numberOfItems items
    }

    async function updateDatabase() {
        try {
            // Add warehouses
            for (const warehouse of warehouses) {
                await addWarehouse(warehouse);

                // Get a random subset of items
                const numberOfItemsToAdd = Math.floor(Math.random() * 19) + 2; // Random number between 2 and 20
                const randomItems = getRandomItems(items, numberOfItemsToAdd);

                // Add each selected item to the warehouse
                for (const item of randomItems) {
                    await addItemToWarehouse(warehouse.name, item);
                }

            }

            // Add items to warehouses randomly (not implemented in this code)
            

            console.log('Debug items added successfully');
        } catch (error) {
            console.error('Error adding debug items:', error);
        } finally {
            window.location.reload();
        }
    }

    async function cleanDatabase() {
        try {
            const response = await fetch(`${API_BASE_URL}/clean`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setResponse(response);

            if (!response.ok) {
                throw new Error(`Failed to wipe database`);
            }

            console.log('Database wiped successfully');
        } catch (error) {
            console.error('Error wiping database:', error);
        } finally {
            window.location.reload();
        }
    }

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '1000' }}>
            <Button color="info" onClick={updateDatabase}>Add Debug Items</Button>
            <Button color="danger" onClick={cleanDatabase}>Wipe Database</Button>
        </div>
    );
}

export default DebugButtons;
