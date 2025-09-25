import React , {useState, useEffect} from "react";
import SearchBar from "./SearchBar.jsx";
import ChatBtn from "./ChatBtn.jsx";
import { Link, useNavigate } from "react-router-dom";


function LostItem() {
  const navigator = useNavigate();
  const [displayItems, setDisplayItems] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch('http://localhost:5000/lostItems');
      const data = await response.json();
      setDisplayItems(data);
      console.log("Fetched lost items:", data);
    } catch (error) {
      console.error("Error fetching lost items:", error);
    }
  }

  useEffect( () => {
    loadData()
  }, []);

  const handleItemClick = (item,type) => {
    console.log("Clicked on lost item:", item);
    navigator(`/ItemPage/${type}/${item.ItemId}`);
  };

  return (
    <>
    <div className="container mt-4 py-2">
    <SearchBar data={displayItems} onResults={setDisplayItems} />
    <div className="row">
      {displayItems.length > 0 ? (
        displayItems.map((item) => (
        <div key={item.ItemId} className="col-lg-3 col-md-6 mb-4">
          <div
            className="item-card h-100"
            onClick={() => handleItemClick(item, "lost")}
            style={{ cursor: "pointer" }}
          >
            <div className="item-image-container position-relative">
              <img
                 src={`http://localhost:5000/uploads/${item.imagePath}`}
                className="item-image img-fluid rounded"
                alt={item.name}
                // style={{ objectFit: "cover" }}
              />
              {/* <div className="item-type-badge found-badge position-absolute top-0 start-0 bg-success text-white text-center px-2 py-1 w-100">
                Lost
              </div> */}
            </div>
            <div className="item-details mt-2">
              <h5 className="item-name">{item.name}</h5>
              <p className="item-location mb-1">
                <i className="fas fa-map-marker-alt me-2 text-danger"></i>
                {item.location}
              </p>
              <p className="item-date text-muted mb-0 d-flex align-items-center gap-2">
                <i className="fas fa-calendar me-2"></i>
                {item.lostDate}
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
    </>
  );
}

export default LostItem;
