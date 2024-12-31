import { useState } from 'react';
import vector from '../../assets/vector.png';
import { useEffect } from 'react';
import { useSignup } from '../../firebase/useSignup';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

export default function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('India');

  const [match, setMatch] = useState(true);
  const [validationError, setValidationError] = useState(null);
  const [next, setNext] = useState(false);

  const { signupFirebase, firebaseError } = useSignup();

  const nextHandler = (e) => {
    e.preventDefault();

    if (!email) {
      setValidationError('Email cannot be empty');
      return;
    } else if (!password) {
      setValidationError('Password cannot be empty');
      return;
    } else if (!confirmPassword) {
      setValidationError('Confirm Password cannot be empty');
      return;
    }

    setValidationError(null);
    setNext(true);
  };

  const createAccountHandler = (e) => {
    e.preventDefault();

    if (!fullName) {
      setValidationError('Full Name cannot be empty');
      return;
    } else if (!address) {
      setValidationError('Address cannot be empty');
      return;
    } else if (!phoneNumber) {
      setValidationError('Phone Number cannot be empty');
      return;
    } else if (!country) {
      setValidationError('Country cannot be empty');
      return;
    }

    setValidationError(null);

    signupFirebase({
      fullName,
      email,
      password,
      address,
      phoneNumber,
      country,
    });
  };

  useEffect(() => {
    if (confirmPassword === '') {
      setMatch(true);
    }
    if (confirmPassword) {
      setMatch(password === confirmPassword);
    }
  }, [password, confirmPassword]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8 font-myFont">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="user img" src={vector} className="mx-auto w-36 h-auto" />
          <h2 className="mt-8 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Create New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={createAccountHandler} className="space-y-6">
            {next && (
              <>
                <div>
                  <label className="block text-sm/6 font-medium text-gray-900">
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="fullname"
                      name="fullname"
                      type="text"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      onChange={(e) => setFullName(e.target.value)}
                      value={fullName}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm/6 font-medium text-gray-900">
                    Address
                  </label>
                  <div className="mt-2">
                    <input
                      id="address"
                      name="address"
                      type="text"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm/6 font-medium text-gray-900">
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="number"
                      name="number"
                      type="number"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      value={phoneNumber}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Country
                  </label>
                  <div className="grid grid-cols-1 mt-2">
                    <select
                      id="country"
                      name="country"
                      value={country}
                      onChange={(e)=>setCountry(e.target.value)}
                      autoComplete="country-name"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option>India</option>
                      <option>Canada</option>
                      <option>Russia</option>
                      <option>China</option>
                      <option>United States</option>
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                </div>
              </>
            )}

            {!next && (
              <>
                {' '}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                    />
                  </div>
                </div>{' '}
              </>
            )}

            {!match && (
              <div className="text-red-500 text-sm mt-2">
                {' '}
                Passwords do not match{' '}
              </div>
            )}
            {validationError && (
              <div className="text-white p-2 bg-red-600 mt-3 rounded-md">
                {validationError}
              </div>
            )}
            {firebaseError && (
              <div className="text-white p-2 bg-red-600 mt-3 rounded-md">
                {firebaseError}
              </div>
            )}

            <div>
              {next ? (
                <button
                  type="submit"
                  onClick={createAccountHandler}
                  className="flex w-full justify-center rounded-md bg-indigo-600 mt-8 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create Account
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={nextHandler}
                  className="flex w-full justify-center rounded-md bg-indigo-600 mt-8 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Next
                </button>
              )}
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an Account?{' '}
            <a
              href="/"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </>
  );
}