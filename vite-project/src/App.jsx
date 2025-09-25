// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReportLost from "./components/LostItem";
import ReportFound from "./components/FoundItem";
import AddFoundItemPage from "./pages/AddFoundItemPage";
import AddLostItemPage from "./pages/AddLostItemPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import ChatBtn from "./components/ChatBtn";
import ProfilePage from "./pages/ProfilePage";
import DedicatedItemPage from "./pages/DedicatedItemPage";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ import ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/report-lost" element={<ReportLost />} />
        <Route path="/report-found" element={<ReportFound />} />
        <Route path="/chatPage" element={<ChatPage />} />
        <Route path="/chatBtn" element={<ChatBtn />} />
        <Route path="/userProfile" element={<ProfilePage />} />
        <Route path="/ItemPage/:type/:id" element={<DedicatedItemPage />} />

        {/* Protected Routes (requires login) */}
        <Route
          path="/addFoundItem"
          element={
            <ProtectedRoute>
              <AddFoundItemPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addLostItem"
          element={
            <ProtectedRoute>
              <AddLostItemPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
