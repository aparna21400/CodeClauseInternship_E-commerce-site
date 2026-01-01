import React, { useState, useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import search_icon from '../assets/search_icon.png';

const SearchBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { setSearchQuery } = useContext(ShopContext);

  return (
    <>
      <img 
        src={search_icon} 
        alt="Search" 
        className="search-icon"
        onClick={() => setShowSearch(true)}
      />
      {showSearch && (
        <div className="searchbar-overlay">
          <input 
            type="text" 
            placeholder="Search products..."
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          <img 
            src="/assets/cross_icon.png" 
            alt="Close" 
            onClick={() => setShowSearch(false)}
          />
        </div>
      )}
    </>
  );
};
export default SearchBar;
