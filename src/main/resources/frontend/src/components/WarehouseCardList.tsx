import React, { useState, useEffect } from 'react';

interface WarehouseCardListProps {
  warehouse: Object;
}



const WarehouseCardList: React.FC<WarehouseCardListProps> = (warehouse) => {

  return (
    <div>
      <h1>Mock Data from Spring Controller</h1>
      <ul>
        {/* {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))} */}
      </ul>
    </div>
  );
}

export default WarehouseCardList;
