import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import FoundItem from "../components/FoundItem.jsx";
import "./HomePage.css";
import LostItem from "../components/LostItem.jsx";
import NavBar from "../components/NavBar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState , useEffect } from "react";
import ProfilePage from "./ProfilePage.jsx";

const HomePage = () => {
    const [user, setUser] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setUser("No token found, please login");

    try {
      const response = await axios.get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data !== "No token" && response.data!== "Invalid token") {
        setIsLoggedIn(true);
        setUser(response.data);
        console.log(response.data);
      } else {
        setIsLoggedIn(false);
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setUser("Failed to fetch profile");
    }
  };

  fetchProfile();
}, []);


  return (
    <div className="homepage">
      <NavBar user = {user}  isLoggedIn = {isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="hero-title mb-4">
                Lost Something? Found Something?
                <br />
                <span className="text-danger">We're Here to Help!</span>
              </h1>
              <p className="hero-subtitle mb-5">
                Connect with your community to reunite lost items with their
                owners. Search through thousands of reported items or report
                your own.
              </p>

              {/* Search Bar */}
              <SearchBar />

              {/* Quick Action Buttons */}
              <div className="quick-actions mt-4">
                <Link
                  to="/addLostItem"
                  className="btn btn-outline-danger me-3 quick-action-btn"
                >
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  Report Lost Item
                </Link>

                <Link
                  to="/addFoundItem"
                  className="btn btn-outline-success quick-action-btn"
                >
                  <i className="fas fa-check-circle me-2"></i>
                  Report Found Item
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Found Items */}
      <section className="items-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-header d-flex justify-content-between align-items-center mb-4">
                <h2 className="section-title">Recently Found Items</h2>
                <Link className="btn btn-outline-primary" to="/report-found">
                  View All
                </Link>
              </div>
            </div>
          </div>
          <FoundItem />
        </div>
      </section>

      {/* Recently Lost Items */}
      <section className="items-section py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-header d-flex justify-content-between align-items-center mb-4">
                <h2 className="section-title">Recently Lost Items</h2>
                <Link className="btn btn-outline-primary" to="/report-lost">
                  View All
                </Link>
              </div>
            </div>
          </div>
          <LostItem />
        </div>
      </section>
      {/* 
      Stats Section
      <section className="stats-section py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-3 mb-4">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-search"></i>
                </div>
                <h3 className="stat-number">2,543</h3>
                <p className="stat-label">Items Reported</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <h3 className="stat-number">1,892</h3>
                <p className="stat-label">Successful Reunions</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3 className="stat-number">5,234</h3>
                <p className="stat-label">Active Users</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <h3 className="stat-number">24/7</h3>
                <p className="stat-label">Support Available</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="footer bg-dark text-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="footer-brand mb-3">
                <div className="logo-icon me-2">
                  <i className="fas fa-search-location"></i>
                </div>
                <span className="brand-text">FindIt</span>
              </div>
              <p className="footer-description">
                Connecting communities to reunite lost items with their owners.
                Making the world a little more connected, one found item at a
                time.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-link">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 mb-4">
              <h5 className="footer-title">Quick Links</h5>
              <ul className="footer-links">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/search">Search Items</a>
                </li>
                <li>
                  <a href="/report-lost">Report Lost</a>
                </li>
                <li>
                  <a href="/report-found">Report Found</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-6 mb-4">
              <h5 className="footer-title">Support</h5>
              <ul className="footer-links">
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
                <li>
                  <a href="/faq">FAQ</a>
                </li>
                <li>
                  <a href="/help">Help Center</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-6 mb-4">
              <h5 className="footer-title">Legal</h5>
              <ul className="footer-links">
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms">Terms of Service</a>
                </li>
                <li>
                  <a href="/cookies">Cookie Policy</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-2 col-md-6 mb-4">
              <h5 className="footer-title">Connect</h5>
              <ul className="footer-links">
                <li>
                  <a href="/newsletter">Newsletter</a>
                </li>
                <li>
                  <a href="/community">Community</a>
                </li>
                <li>
                  <a href="/blog">Blog</a>
                </li>
              </ul>
            </div>
          </div>

          <hr className="footer-divider" />

          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="copyright mb-0">
                © 2025 FindIt. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0">
                Made with <i className="fas fa-heart text-danger"></i> for the
                community
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
