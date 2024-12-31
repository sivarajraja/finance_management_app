import React, { useState } from 'react';
import arrowleft from '../assets/arrow_left.png';
import arrowright from '../assets/arrow_right.png';
import dashboard from '../assets/dashboard.png';
import account from '../assets/account.png';
import transaction from '../assets/transaction.png';
import report from '../assets/report.png';
import settings from '../assets/settings.png';
import alert from '../assets/alert.png';
import profile from '../assets/profile.png';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      {/* arrow icon */}
      <div
        className={`${open ? 'w-72' : 'w-24'} relative duration-300 h-screen p-5 pt-8 bg-blue-gray-600 `}
      >
        <img
          src={open ? arrowleft : arrowright}
          className="absolute cursor-pointer -right-5 z-10 top-6 w-10"
          onClick={() => setOpen(!open)}
        />

        {/* logo icon */}
        <h1
          className={`text-white origin-left ml-2 font-bold text-2xl duration-300 ${!open && 'scale-0'}`}
        >
          FINANCE APP
        </h1>

        <ul className="pt-3">
          <Link to="/dashboard">
            <li className="text-white text-sm flex items-center gap-x-4 cursor-pointer p-3 mt-7 hover:bg-blue-gray-300 rounded-lg">
              <img src={dashboard} className="w-9 h-auto" />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>
                Dashboard
              </span>
            </li>
          </Link>

          <Link to="/transactions">
            <li className="text-white text-sm flex items-center gap-x-4 cursor-pointer p-3 mt-4 hover:bg-blue-gray-300 rounded-lg">
              <img src={transaction} className="w-9 h-auto" />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>
                Transactions
              </span>
            </li>
          </Link>

          <Link to="/accounts">
            <li className="text-white text-sm flex items-center gap-x-4 cursor-pointer p-3 mt-4 hover:bg-blue-gray-300 rounded-lg">
              <img src={account} className="w-9 h-auto" />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>
                Accounts
              </span>
            </li>
          </Link>

          <Link to="/reports">
            <li className="text-white text-sm flex items-center gap-x-4 cursor-pointer p-3 mt-4 hover:bg-blue-gray-300 rounded-lg">
              <img src={report} className="w-9 h-auto" />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>
                Reports
              </span>
            </li>
          </Link>

          <Link to="/alerts">
            <li className="text-white text-sm flex items-center gap-x-4 cursor-pointer p-3 mt-4 hover:bg-blue-gray-300 rounded-lg">
              <img src={alert} className="w-9 h-auto" />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>
                Alerts
              </span>
            </li>
          </Link>

          <Link to="/settings">
            <li className="text-white text-sm flex items-center gap-x-4 cursor-pointer p-3 mt-4 hover:bg-blue-gray-300 rounded-lg">
              <img src={settings} className="w-9 h-auto" />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>
                Settings
              </span>
            </li>
          </Link>

          <Link to="/profile">
            <li className="text-white text-sm flex items-center gap-x-4 cursor-pointer p-3 mt-4 hover:bg-blue-gray-300 rounded-lg">
              <img src={profile} className="w-9 h-auto" />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>
                Profile
              </span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
