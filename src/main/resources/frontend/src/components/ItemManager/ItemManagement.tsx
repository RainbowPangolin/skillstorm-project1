
import React, { useEffect, useState } from 'react';
import ItemListStandalone from './ItemListStandalone';
import { Item } from '../../interfaces/Item';

import { Container, Row, Col, Card, CardBody, CardTitle, Table } from 'reactstrap';
interface ItemManagementProps {}

const ItemManagement: React.FC<ItemManagementProps> = () => {
  const [data, setData] = useState<Item[] | null>(null); 

  const refreshItems = () => {
    fetchData(); 
  };


  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/items');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const items: Item[] = await response.json();
      setData(items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
        <CardTitle tag="h3">Manage Items</CardTitle>
        </div>

      {data ? (
        <ItemListStandalone items={data} refreshMethod={refreshItems}/>
      ) : (
        <p>Loading...</p>
      )}
      </CardBody>
    </Table>
  );
};

export default ItemManagement;
