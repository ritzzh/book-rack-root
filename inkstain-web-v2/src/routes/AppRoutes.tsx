import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/auth/Login';
import { SignUp } from '../pages/auth/SignUp';
import PrivateRoute from './PrivateRoute';
import { DashBoard } from '../pages/dashboard/DashBoard';
import { Home } from '../pages/home/Home';

const AppRoutes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
            <DashBoard />
        </PrivateRoute>
        } />
    </Routes>
  </Suspense>
);
export default AppRoutes;