import React, { useEffect, useState } from 'react';
import option_right from '../assets/option_right.png';
import option_down from '../assets/option_down.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { usePushCollection } from '../firebase/usePushCollection';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Firebase';

export const AddExpense = () => {
  const [newOpen, setNewOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [amount, setAmount] = useState();
  const [category, setCategory] = useState();
  const [mode, setMode] = useState();
  const [modes, setModes] = useState([]);
  const [notes, setNotes] = useState('');
  const [validationError, setValidationError] = useState(null);

  let user = useSelector((state) => state.users.userData);

  const { pushData, firebaseError } = usePushCollection();

  useEffect(() => {
    const fetchModes = async () => {
      const modesCollection = collection(db, 'accounts');
      const modesSnapshot = await getDocs(modesCollection);
      const modesList = modesSnapshot.docs.map((doc) => ({
        id: doc.id,
        mode: doc.data().Account_Type,
      }));
      setModes(modesList);
    };
    fetchModes();
  }, []);

  const addExpenseHandler = async (e) => {
    e.preventDefault();

    if (!amount) {
      setValidationError('Amount cannot be empty');
      return;
    } else if (!category) {
      setValidationError('Category cannot be empty');
      return;
    } else if (!mode) {
      setValidationError('Mode cannot be empty');
      return;
    }
    setValidationError(null);

    const selectedAid = modes.find((m) => m.mode === mode)?.id;

    //avoiding a empty data before adding to firebase
    const fbData = {
      uid: user.id,
      aid: selectedAid,
      amount: amount,
      date: selectedDate,
      expense_category: category,
      payment_mode: mode,
      notes: notes,
    };

    // use hook to push into firestore
    await pushData({ fbCollection: 'transactions', fbData });

    if (firebaseError) {
      setValidationError(firebaseError);
    } else {
      setAmount('');
      setCategory('');
      setMode('');
      setNotes('');
      setSelectedDate(new Date());
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <img
          src={newOpen ? option_down : option_right}
          onClick={() => setNewOpen(!newOpen)}
          className="p-3"
        />
        <span>ADD NEW EXPENSE</span>
      </div>

      {newOpen && (
        <div className="m-5 rounded-md shadow-lg border-2 p-3 border-gray-400">
          <div className="flex justify-between items-center">
            <label className=" flex items-center ml-3 text-sm/6 font-normal text-gray-900">
              Name :{' '}
              <span className="text-2xl ml-1 text-red-500">{user.name}</span>
            </label>

            <div className="flex items-center justify-end">
              <label className="block text-sm/6 mr-3 font-normal text-gray-900">
                Amount :
              </label>
              <input
                id="Amount"
                name="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-1/2 mr-3 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              <span>INR</span>
            </div>
          </div>

          <div className="flex gap-5">
            <form className=" my-3">
              <select
                id="categories"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                defaultValue="Select Expense Category"
              >
                <option disabled>Select Expense Category</option>
                <option value="Groceries">Groceries</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Movies">Movies</option>
                <option value="Utilities">Utilities</option>
                <option value="Shopping">Shopping</option>
                <option value="Petrol">Petrol</option>
                <option value="Electricity">Electricity</option>
                <option value="Rent">Rent</option>
                <option value="Others">Others</option>
              </select>
            </form>

            <form className=" my-3">
              <select
                id="modes"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                defaultValue="Select Payment Mode"
              >
                {!modes.length && <option disabled>No Accounts Found</option>}

                <option disabled>Select Payment Mode</option>
                {modes.map((mode, id) => (
                  <option key={id} value={mode.mode}>
                    {mode.mode}
                  </option>
                ))}
              </select>
            </form>
          </div>

          <div className="flex">
            <input
              id="Note"
              name="note"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              type="text"
              placeholder="Notes"
              className="block w-1/2 mr-3 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {validationError && (
            <div className="text-white p-2 mx-2 mb-6 bg-red-600 mt-5 rounded-md">
              {validationError}
            </div>
          )}

          <div>
            <button
              type="submit"
              onClick={addExpenseHandler}
              className="flex w-full justify-center rounded-md bg-indigo-600 mt-8 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Expense
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
