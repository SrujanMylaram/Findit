import React, { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";

function AddFoundItemPage() {
    const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    image: null,
    date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const formDataToSend = new FormData();
  formDataToSend.append("name", formData.name);
  formDataToSend.append("location", formData.location);
  formDataToSend.append("date", formData.date);
  formDataToSend.append("image", formData.image); // file object

  try {
    const response = await axios.post("http://localhost:5000/addFoundItem", formDataToSend, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.status === 200) {
      Navigate("/");
    }
  } catch (err) {
    console.error("Error adding item:", err);
  }
};

  return (
    <div className="container mt-4 w-50">
      <h2 className="mb-3">Add Found Item</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <div className="mb-3">
          <label className="form-label fw-semibold">Item Name</label>
          <input
            className="form-control rounded-pill"
            type="text"
            name="name"
            placeholder="Enter item name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Location</label>
          <input
            className="form-control rounded-pill"
            type="text"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Upload Image</label>
          <input
            className="form-control rounded-pill"
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
            required
          />
          {formData.image && (
            <div className="mt-3 text-center">
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                className="img-thumbnail"
                style={{ maxWidth: "150px", borderRadius: "8px" }}
              />
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Date</label>
          <input
            className="form-control rounded-pill"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-success w-100 rounded-pill" type="submit">
          Submit Found Item
        </button>
      </form>
    </div>
  );
}

export default AddFoundItemPage;
