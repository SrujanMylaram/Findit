import React from "react";
import { Navigate } from "react-router-dom";
// import * as jwt_decode from "jwt-decode";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" replace />;

//   try {
//     const decoded = jwt_decode.default(token); // ✅ use .default
//     const currentTime = Date.now() / 1000;

//     if (decoded.exp < currentTime) {
//       localStorage.removeItem("token"); // remove expired token
//       return <Navigate to="/login" replace />;
//     }
//   } catch (err) {
//     localStorage.removeItem("token");
//     return <Navigate to="/login" replace />;
//   }

  return children;
}
