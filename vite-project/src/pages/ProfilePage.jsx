import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilePage() {
  const [userName, setUserName] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);

  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [lostCount, setLostCount] = useState(0);
  const [foundCount, setFoundCount] = useState(0);

  // ✅ Fetch Profile
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUserName({ name: "No token found", email: "" });
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserName(response.data);
        console.log("Fetched profile:", response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        if (error.response?.status === 401) {
          setUserName({ name: "No token provided", email: "" });
        } else if (error.response?.status === 403) {
          setUserName({
            name: "Invalid token, please login again",
            email: "",
          });
        } else {
          setUserName({ name: "Failed to fetch profile", email: "" });
        }
      }
    };

    fetchProfile();
    fetchItems(); // fetch lost + found items also
  }, []);

  // ✅ Fetch Lost & Found Items
  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/allItems");
      setLostItems(res.data.lostItems);
      setFoundItems(res.data.foundItems);
      setLostCount(res.data.lostCount);
      setFoundCount(res.data.foundCount);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  // ✅ Save Profile
  const saveProfile = async () => {
    try {
      await axios.put("http://localhost:5000/userProfile", {
        name: formData.name,
        email: formData.email,
      });
      setUserName({ name: formData.name, email: formData.email });
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  if (!userName) return <p className="text-center mt-5">Loading profile...</p>;

  return (
    <div className="container mt-5">
      {/* Profile Section */}
      <div className="card shadow-lg p-4 mb-4 mx-auto" style={{ width: "400px" }}>
        <img
          src="https://i.pravatar.cc/150?img=3"
          alt="Avatar"
          className="rounded-circle mx-auto d-block mb-3"
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />

        {isEditing ? (
          <div>
            <input
              type="text"
              name="name"
              className="form-control mb-2"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter name"
            />
            <input
              type="email"
              name="email"
              className="form-control mb-2"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email"
            />
            <button className="btn btn-success w-100" onClick={saveProfile}>
              Save
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h4>{userName.name}</h4>
            <p className="text-muted">{userName.email}</p>
            <button
              className="btn btn-primary w-100"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Lost & Found Section */}
      <div className="row">
        {/* Lost Items */}
        <div className="col-md-6">
          <div className="card shadow p-3">
            <h5 className="text-danger">Lost Items ({lostCount})</h5>
            <ul className="list-group mt-2">
              {lostItems.map((item) => (
                <li key={item.id} className="list-group-item">
                  <h5>{item.name}</h5> - {item.location} ({item.lostDate})
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Found Items */}
        <div className="col-md-6">
          <div className="card shadow p-3">
            <h5 className="text-success">Found Items ({foundCount})</h5>
            <ul className="list-group mt-2">
              {foundItems.map((item) => (
                <li key={item.id} className="list-group-item">
                  <h5>{item.name}</h5> - {item.location} ({item.foundDate})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
