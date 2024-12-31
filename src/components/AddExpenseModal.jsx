import React, { useEffect } from 'react';
import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import income from '../assets/income.png';
import cancel from '../assets/cancel.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';
import { usePushCollection } from '../firebase/usePushCollection';
import { db } from '../firebase/Firebase';
import { collection, getDocs } from 'firebase/firestore';

export const AddExpenseModal = ({ setModalOpen }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [amount, setAmount] = useState();
  const [category, setCategory] = useState();
  const [mode, setMode] = useState();
  const [modes,setModes] = useState([]);
  const [notes, setNotes] = useState('');
  const [validationError, setValidationError] = useState(null);

  let user = useSelector((state) => state.users.userData);

  const { pushData, firebaseError } = usePushCollection();

  useEffect(() => {
    const fetchModes = async () => {
      const modesCollection = collection(db, 'accounts'); 
      const modesSnapshot = await getDocs(modesCollection);
      const modesList = modesSnapshot.docs.map(
        (doc) => ({id:doc.id,mode:doc.data().Account_Type})
      );
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

    const combinedDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime.getHours(),
      selectedTime.getMinutes(),
      selectedTime.getSeconds()
    );

    const selectedAid = modes.find((mode)=>mode.mode === mode)?.id;

    //avoiding a empty data before adding to firebase
    const fbData = {
      uid: user.id,
      aid: selectedAid,
      amount: amount,
      date: combinedDateTime,
      expense_category: category,
      payment_mode: mode,
      notes: notes,
    };

    // use hook to push into firestore
    await pushData({ fbCollection: 'transactions', fbData });

    if (firebaseError) {
      setValidationError(firebaseError);
    }

    setModalOpen(false);
  };

  return (
    <Dialog
      open={true}
      onClose={() => setModalOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            style={validationError ? { height: '54vh' } : { height: '48vh' }}
            className="relative transform rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-2xl sm:max-h-screen h-5/6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="flex items-center border-b-2 border-b-gray-500">
              <img className="ml-3" src={income} />
              <span className="p-3 font-medium">ADD NEW EXPENSE</span>
            </div>
            <img
              onClick={() => setModalOpen(false)}
              src={cancel}
              className="absolute right-4 top-3 cursor-pointer"
            />

            <div className="m-5 mt-7">
              <div className="flex justify-between items-center mx-5">
                <div>
                  <label className=" block text-sm/6 font-normal text-gray-900">
                    Name :
                    <span className="ml-3 text-2xl uppercase text-red-500">
                      {user.name}
                    </span>
                  </label>
                </div>

                <div className="flex items-center ml-6">
                  <label className="block text-sm/6 mr-3 font-normal text-gray-900">
                    Amount :
                  </label>
                  <input
                    id="Amount"
                    name="amount"
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    className="block w-1/2 mr-3 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  <span>INR</span>
                </div>
              </div>

              <div className="flex gap-12 mt-3 mx-5">
                <form className=" my-3  w-2/5">
                  <select
                    id="categories"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    defaultValue="Select Expense Category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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

                <form className=" my-3 w-2/5">
                  <select
                    id="modes"
                    value={mode}
                    defaultValue="Select Payment Mode"
                    onChange={(e) => setMode(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    {(!modes.length) && <option disabled>No Accounts Found</option>}

                    <option disabled>Select Payment Mode</option>
                    {modes.map((mode,id) => (
                      <option key={id} value={mode.mode}>
                        {mode.mode}
                      </option>
                    ))}
                  </select>
                </form>
              </div>

              <div className="flex mt-3">
                <input
                  id="Note"
                  name="note"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  type="text"
                  placeholder="Notes"
                  className="block mx-5 mr-3 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <DatePicker
                  selected={selectedTime}
                  onChange={(time) => setSelectedTime(time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  className="w-4/5 p-2 ml-3 border border-gray-300 rounded"
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
                  className="flex w-full justify-center rounded-md bg-indigo-600 mt-5 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Expense
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
