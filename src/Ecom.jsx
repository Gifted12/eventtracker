import React from 'react'
import { Link } from 'react-router-dom';

const Ecom = () => {
  return (
    <div>
          <div className="ecom-container">
      <h2>E-Commerce Page</h2>
      <p>Welcome to the e-commerce section!</p>
      <p><Link to="/admin">Go to admin panel</Link></p>
      <div className="products">

        <div className="product-card">
          <h3>Product 2</h3>
          <p>$29.99</p>
        </div>
        <div className="product-card">
          <h3>Product 3</h3>
          <p>$39.99</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Ecom
