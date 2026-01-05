// FRONTEND/src/pages/Category.jsx
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../components/Context/ShopContext";
import Item from "../components/Item/Item";
import './CSS/Category.css';

const Category = ({ banner, category }) => {
    const { all_product, loading, fetchProducts } = useContext(ShopContext);
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState("default");

    // Fetch products on mount
    useEffect(() => {
        if (all_product.length === 0) {
            fetchProducts();
        }
    }, [all_product.length, fetchProducts]);

    // Filter products by category
    const categoryProducts = all_product.filter((item) => 
        item.category === category?.toLowerCase()
    );

    // Sort products
    const sortedProducts = [...categoryProducts].sort((a, b) => {
        if (sortBy === "low-to-high") {
            return a.new_price - b.new_price;
        } else if (sortBy === "high-to-low") {
            return b.new_price - a.new_price;
        }
        return 0; // default order
    });

    // Handle product click
    const handleProductClick = (product) => {
        navigate(`/product/${product._id || product.id}`);
    };

    if (loading) {
        return (
            <div className="category-container">
                <div className="loading-message">Loading products...</div>
            </div>
        );
    }

    return (
        <div className="category-container">
            {/* Category Banner */}
            {banner && (
                <div className="banner-container">
                    <img src={banner} alt={`${category} banner`} className="category-banner-img" />
                </div>
            )}

            {/* Category Header and Sort */}
            <div className="category-indexSort">
                <p>
                    <span>Showing {sortedProducts.length} results</span> for {category?.toUpperCase()}
                </p>
                <select
                    className="category-sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="default">Sort by: Default</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                </select>
            </div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
                <div className="category-products">
                    {sortedProducts.map((item) => (
                        <Item
                            key={item._id || item.id}
                            id={item._id || item.id}
                            name={item.name}
                            image={item.image}
                            new_price={item.new_price}
                            old_price={item.old_price}
                            onClick={() => handleProductClick(item)}
                        />
                    ))}
                </div>
            ) : (
                <div className="category-empty">
                    <h2>No products found in this category</h2>
                    <p>Check back later for new items!</p>
                </div>
            )}
        </div>
    );
};

export default Category;