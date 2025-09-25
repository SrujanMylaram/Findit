import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const DedicatedItemPage = () => {
  const [isTrue, setIsTrue] = useState(true);

  const { id, type } = useParams(); // get itemId & type from URL
  const [item, setItem] = useState(null);

  useEffect(() => {
    loadSingleItem();
  }, [id]);

  const loadSingleItem = async () =>{

    axios.get(`http://localhost:5000/${type}Items/${id}`)
      .then(res => setItem(res.data))
      .catch(err => console.error(err));

  }


  if (!item) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">Item not found</div>
      </div>
    );
  }

const handleOwnerContact = () => {
    setIsTrue(false);
    alert("Contacting the owner...");
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        <div className="row g-0">
          {/* Image section */}
          <div className="col-md-5">
            <img
              src={item.imagePath ? `http://localhost:5000/uploads/${item.imagePath}` : null}
              alt={item.name}
              className="img-fluid h-100 w-100 object-fit-cover"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Content section */}
          <div className="col-md-7 d-flex align-items-center">
            <div className="card-body p-4">
              <h2 className="card-title mb-3 fw-bold">{item.name}</h2>

              <p className="card-text mb-2">
                <i className="fas fa-map-marker-alt text-danger me-2"></i>
                <strong>Location:</strong> {item.location}
              </p>

              <p className="card-text mb-2">
                <i className="fas fa-calendar text-primary me-2"></i>
                <strong>Date:</strong> {item.foundDate}
              </p>

              <p className="card-text">
                <i className="fas fa-info-circle text-success me-2"></i>
                <strong>Description:</strong> {item.description || "No description provided."}
              </p>

            {isTrue ? (
                <button
                    className="btn btn-primary mt-3 px-4"
                    onClick={handleOwnerContact}
                >
                    Contact Owner
                </button>
                ) : (
                <>
                    <p>owner@gmail.com</p>
                    <p>1234567890</p>
                </>
            )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DedicatedItemPage;
