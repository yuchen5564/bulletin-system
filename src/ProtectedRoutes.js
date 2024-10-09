import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseAuth/firebase"; // Ensure your firebase config and auth are set up correctly

const ProtectedRoutes = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

    if (loading) {
      return <p></p>; // or a spinner/loader component
    }

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
