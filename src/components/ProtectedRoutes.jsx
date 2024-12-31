import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = () => {
  const user = useSelector((state) => state.users.userData);

  if (!user) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
