import React, { useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import {ParentComponent} from './ParentComponent'
import { Dashboard } from './Dashboard';
import { Transactions } from './Transactions';
import { Accounts } from './Accounts';
import { Reports } from './Reports';
import { Alerts } from './Alerts';
import { Settings } from './Settings';
import { Profile } from './Profile';
import Login from './users/Login';
import Signup from './users/Signup';
import { ProtectedRoutes } from './ProtectedRoutes';
import { UserInformation } from './UserInformation';

export const Navigator = () => {
  const user = useSelector((state) => state.users.userData);

  return (
    <div>
      <BrowserRouter>
        <div className="flex">
          {!user ? (
            <>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </>
          ) : (
            <>
              <Routes>
                <Route element={<ProtectedRoutes />}>
                  <Route path="/dashboard" element={<ParentComponent children={<Dashboard />}/>} />
                  <Route path="/user/information" element={<ParentComponent children={<UserInformation/>}/>} />
                  <Route path="/transactions" element={<ParentComponent children={<Transactions />}/>} />
                  <Route path="/accounts" element={<ParentComponent children={<Accounts name={'ACCOUNT DETAILS'} />}/>}/>
                  <Route path="/reports" element={<ParentComponent children={<Reports />}/>} />
                  <Route path="/alerts" element={<ParentComponent children={<Alerts />}/>} />
                  <Route path="/settings" element={<ParentComponent children={<Settings />}/>} />
                  <Route path="/profile" element={<ParentComponent children={<Profile/>}/>} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Route>
              </Routes>
            </>
          )}
        </div>
      </BrowserRouter>
    </div>
  );
};
