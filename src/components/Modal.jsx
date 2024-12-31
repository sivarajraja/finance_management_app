import { useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import income from '../assets/income.png';
import cancel from '../assets/cancel.png';

export default function Modal() {
  const [open, setOpen] = useState(true);
  const [incomeName, setIncomeName] = useState('');

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className=" rounded-md">
              <div className="flex items-center border-b-2 border-b-gray-500">
                <img className="ml-3" src={income} />
                <span className="p-3 font-medium">ADD NEW INCOME</span>
              </div>
              <img
                onClick={() => setOpen(false)}
                src={cancel}
                className="absolute right-4 top-3 cursor-pointer"
              />

              <div className="flex m-5 items-center">
                <div className="w-3/6 mr-7">
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="incomeName"
                      name="incomeName"
                      type="text"
                      placeholder="INCOME NAME"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      onChange={(e) => setIncomeName(e.target.value)}
                      value={incomeName}
                    />
                  </div>
                </div>
                <div>
                  <form>
                    <label
                      htmlFor="Group"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Group
                    </label>

                    <select
                      id="Group"
                      className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      defaultValue="Select Expense Group"
                    >
                      <option disabled>Select Expense Group</option>
                      <option value="CA">Cash</option>
                      <option value="BA">Bank Account</option>
                      <option value="DP">Deposit</option>
                      <option value="CR">Credit</option>
                      <option value="AS">Asset</option>
                      <option value="OT">Others</option>
                    </select>
                  </form>
                </div>
              </div>

              <div className="flex justify-between m-5 items-center mb-9">
                <div className="w-1/2">
                  <label
                    htmlFor="Amount"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Amount
                  </label>
                  <div className="mt-2 flex items-center">
                    <input
                      id="incomeAmount"
                      name="incomeAmount"
                      type="number"
                      placeholder="BALANCE"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      onChange={(e) => setIncomeName(e.target.value)}
                      value={incomeName}
                    />
                    <span className="ml-2 font-light">INR</span>
                  </div>
                </div>

                <div className="mt-8 mx-14 ">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    ADD INCOME
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
