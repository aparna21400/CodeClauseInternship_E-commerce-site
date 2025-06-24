import React, { useContext } from "react";
import './CSS/Category.css';
import { ShopContext } from "../components/Context/ShopContext";
import dropdown_icon from '../components/assests/dropdown_icon.png';
import Item from '../components/Item/Item';

const Categories = (props) => {
    const { all_product } = useContext(ShopContext);

    // Filter products for current category
    const categoryProducts = all_product.filter(item => props.category === item.category);

    return (

        <div className="shop-category container">
            <div className="category-banner">
                <img className="category-banner-img" src={props.banner} alt="Category Banner" />
            </div>

            <div className="category-indexSort">
                <p>
                    <span>Showing 1-12</span> out of {categoryProducts.length} products
                </p>

                <div className="category-sort">
                    Sort by <img src={dropdown_icon} alt="dropdown" />
                </div>
            </div>

            <div className="category-products" >
                {categoryProducts.map((item) => (
                    <Item
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                    />
                ))}
            </div>
            <div className="category-loadmore">
                Explore More
            </div>
        </div>)
}

export default Categories;