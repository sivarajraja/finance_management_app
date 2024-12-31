import React, { useState } from 'react';
import userProfile from '../assets/user_profile.png';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../slices/userSlice';
import { UserInformation } from './UserInformation';
import LogoutModal from './users/LogoutModal';
import { ArrowLeftOnRectangleIcon, PencilSquareIcon } from '@heroicons/react/24/solid';

export const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [editScreen, setEditScreen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.userData);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleEditClick = () => {
    setEditScreen(true);
  };

  const handleUserClick = () => {
    setEditScreen(false);
  };

  const handleConfirmLogout = () => {
    dispatch(removeUser(null));
    setShowModal(false);
  };

  const handleCancelLogout = () => {
    setShowModal(false);
  };

  return (
    <>
      {editScreen ? (
        <UserInformation cancel={handleUserClick} />
      ) : (
        <>
          <div className=" m-auto w-4/5 my-12">
            <div className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-7">
                    <img src={userProfile} className="w-12 h-auto" alt="User Profile" />
                    <h3 className="text-2xl leading-6 font-light text-gray-900">
                      Profile
                    </h3>
                  </div>

                  <div className="flex gap-4">
                    <div
                      onClick={handleEditClick}
                      className="flex items-center rounded-md px-1.5 cursor-pointer hover:bg-green-400 p-1"
                    >
                      <button type="submit">Edit</button>
                      <PencilSquareIcon className="w-6 h-6 ml-1 text-green-500" />
                    </div>
                    <div
                      onClick={handleLogoutClick}
                      className="flex items-center rounded-md px-1.5 cursor-pointer hover:bg-red-300 p-1"
                    >
                      <span className="ml-2">Logout</span>
                      <ArrowLeftOnRectangleIcon className="w-6 h-6 ml-1 rotate-180 text-red-500" />
                    </div>
                  </div>
                </div>

                {showModal && (
                  <LogoutModal
                    onConfirm={handleConfirmLogout}
                    onCancel={handleCancelLogout}
                  />
                )}
              </div>

              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.name}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.email}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.phone}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.address}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Country</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.country}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
