/*

Title

Managing buttons* :
Add warehouse | Edit warehouse | Delete warehouse

*"Manage" button to pop up those options

WarehouseList
    fetch warehouse list
    generate warehouse card for each item in list

*/

import React, { useState, useEffect } from 'react';

function WarehouseCardManager() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>Mock Data from Spring Controller</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default WarehouseCardManager;
