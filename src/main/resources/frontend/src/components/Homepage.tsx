import React from 'react';
import logo from '../logo.jpg';

const Homepage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Warehouse Management Portal</h1>
        <h2>(Preview build)</h2>
        <img src={logo} alt="Logo" style={{ width: '200px', height: 'auto', margin: '20px' }} />
        <p>A proprietary enterprise solution brought to you by Kaiwen Tsou</p>
      
        <a href="https://www.freepik.com/free-vector/building-icon-architecture-business-symbol-flat-design-vector-illustration_18234092.htm#fromView=search&page=1&position=1&uuid=558b35f5-db24-4d98-bbf2-eec550dbf12c">Image by rawpixel.com on Freepik</a>

      </div>
    </div>
  );
};

export default Homepage;
