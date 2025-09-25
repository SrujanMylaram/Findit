import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ user, isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem("token");

    setIsLoggedIn(false);

    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <div className="logo-icon me-2">
            <i className="fas fa-search-location"></i>
          </div>
          <span className="brand-text">FindIt</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/report-lost">
                Lost Item
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/report-found">
                Found Item
              </Link>
            </li>
          </ul>

          <div className="navbar-nav">
            {isLoggedIn ? (
              <div className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                    className="rounded-circle me-2"
                    width="32"
                    height="32"
                    alt="Profile"
                  />
                  {user?.name || "User"}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/userProfile">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/my-items">
                      My Items
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                className="nav-link btn btn-primary text-black px-3 rounded"
                to="/login"
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
