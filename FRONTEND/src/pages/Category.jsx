import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react';

const Category = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch products from backend
        axios.get('http://localhost:5000/api/products')
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading products...</div>;

    return (
        <div>
            {products.map(product => (
                <div key={product._id}>
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                    <button>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};
export default Category;