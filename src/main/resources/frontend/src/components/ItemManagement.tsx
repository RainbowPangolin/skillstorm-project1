
import React, { useEffect, useState } from 'react';
import ItemListStandalone from './ItemListStandalone';
import { Item } from '../interfaces/Item';


interface ItemManagementProps {}

const ItemManagement: React.FC<ItemManagementProps> = () => {
  const [data, setData] = useState<Item[] | null>(null); // Specify the type here

  const refreshItems = () => {
    fetchData(); // Redo fetch
  };


  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/items');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const items: Item[] = await response.json(); // Specify the type here
      setData(items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {

    fetchData();

    return () => {
      // Cleanup function if needed
    };
  }, []);

  return (
    <div>

    item management 

   

    {data ? (
        <div>
          <ItemListStandalone items={data} refreshMethod={refreshItems}/>
        </div>
      ) : (
        <p>Loading...</p>
      )
    }

    </div>
  );
};

export default ItemManagement;
