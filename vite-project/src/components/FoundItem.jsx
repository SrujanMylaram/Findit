
import React from "react";
import { useState, useEffect } from "react";
import SearchBar from "./SearchBar.jsx";
import ChatBtn from "./ChatBtn.jsx";
import { Link } from "react-router-dom";
import { Navigate,useNavigate } from "react-router-dom";
import '../pages/HomePage.css';

function FoundItem() {

  const navigator = useNavigate();


const [displayItems, setDisplayItems] = useState([]);

useEffect( () => {
  // Fetch items from backend API
  loadData()
}, []);

const loadData = async () => {
  try {
    const response = await fetch("http://localhost:5000/foundItems");
    const data = await response.json();
    setDisplayItems(data);
    console.log("Fetched found items:", data);
  } catch (error) {
    console.error("Error fetching found items:", error);
  }
}


  const handleItemClick = (item, type) => {
  console.log("Clicked on found item:", item);
  navigator(`/ItemPage/${type}/${item.itemId}`);
};


  return (
    <div className="container mt-4 py-2">
      <SearchBar data={displayItems} onResults={setDisplayItems} />
    <div className="row">
      { displayItems.length > 0 ? (
      displayItems.map((item) => (
        <div key={item.itemId} className="col-lg-3 col-md-6 mb-4">
          <div
            className="item-card h-100"
            onClick={() => handleItemClick(item, "found")}
            style={{ cursor: "pointer" }}
          >
            <div className="item-image-container position-relative">
              <img
                 src={`http://localhost:5000/uploads/${item.imagePath}`}

                className="item-image img-fluid rounded"
                alt={item.name}
                // style={{ objectFit: "" }}
              />
              {/* <div className="item-type-badge found-badge position-absolute top-0 start-0 bg-success text-white text-center px-2 py-1 w-100">
                Found
              </div> */}
            </div>
            <div className="item-details mt-2">
              <h5 className="item-name">{item.name}</h5>
              <p className="item-location mb-1">
                <i className="fas fa-map-marker-alt me-2 text-danger" ></i>
                {item.location}
              </p>
              <p className="item-date text-muted mb-0 d-flex align-items-center gap-2">
                <i className="fas fa-calendar me-2"></i>
                {item.foundDate}
                <ChatBtn/>
              </p>
            </div>
          </div>
        </div>
      ))) : (
        <p>No items found.</p>
      )}
    </div>
    </div>
  );
}

export default FoundItem;
