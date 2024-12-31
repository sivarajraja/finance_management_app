import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import income from '../assets/income.png';
import cancel from '../assets/cancel.png';
import { useSelector } from 'react-redux';
import { usePushCollection } from '../firebase/usePushCollection';

export default function AddAccount({ setModalOpen }) {
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountType, setAccountType] = useState('');
  const [bankName, setBankName] = useState('');
  const [amount, setAmount] = useState('');
  const [validationError, setValidationError] = useState(null);

  const user = useSelector((state) => state.users.userData);

  const { pushData, firebaseError } = usePushCollection();

  const addAccountHandler = async (e) => {
    e.preventDefault();

    if (!accountName) {
      setValidationError('Account Name cannot be empty');
      return;
    } else if (!accountNumber && accountType!=='Cash' && accountType==='Assets' && accountType==='Others') {
      setValidationError('Account Number cannot be empty');
      return;
    } else if (!accountType) {
      setValidationError('Account Type cannot be empty');
      return;
    } else if (!bankName && accountType!=='Cash' && accountType!=='Assets' && accountType!=='Others') {
      setValidationError('Bank Name cannot be empty');
      return;
    } else if (!amount) {
      setValidationError('Amount cannot be empty');
      return;
    }

    setValidationError(null);

    //avoiding a empty data before adding to firebase
    const fbData = {
      uid: user.id,
      User_Name: user.name,
      ...(accountName !== '' && { Account_Name: accountName }),
      ...(accountNumber !== '' && { Account_Number: accountNumber }),
      Account_Type: accountType,
      ...(bankName !== '' && { Bank_Name: bankName }),
      Amount: amount,
    };

    // use hook to push into firestore
    await pushData({ fbCollection: 'accounts', fbData });

    if (firebaseError) {
      setValidationError(firebaseError);
    }

    //finally close the model
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
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className=" rounded-md">
              <div className="flex items-center border-b-2 border-b-gray-500">
                <img className="ml-3" src={income} />
                <span className="p-3 font-medium">ADD NEW ACCOUNT</span>
              </div>
              <img
                onClick={() => setModalOpen(false)}
                src={cancel}
                className="absolute right-4 top-3 cursor-pointer"
              />

              <div className="flex m-5 items-center">
                <div className="w-3/6 mr-7">
                  <label className="block text-sm/6 font-medium text-gray-900">
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="accountName"
                      name="accountName"
                      type="text"
                      placeholder="NAME"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      onChange={(e) => setAccountName(e.target.value)}
                      value={accountName}
                    />
                  </div>
                </div>
                <div>
                  <form>
                    <label
                      htmlFor="Group"
                      className="block text-sm/6 font-medium text-gray-900"
                    >
                      Type
                    </label>

                    <select
                      id="Group"
                      value={accountType}
                      onChange={(e) => setAccountType(e.target.value)}
                      className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      defaultValue= "Select Account Type"
                    >
                      <option disabled>Select Account Type</option>
                      <option value="Cash">Cash</option>
                      <option value="Bank Account">Bank Account</option>
                      <option value="Debit">Debit</option>
                      <option value="Credit">Credit</option>
                      <option value="Asset">Asset</option>
                      <option value="Others">Others</option>
                    </select>
                  </form>
                </div>
              </div>

              {accountType !== 'Cash' &&
                accountType !== 'Asset' &&
                accountType !== 'Others' && (
                  <div className="m-5 items-center">
                    <div className="mb-3 mr-7">
                      <label className="block text-sm/6 font-medium text-gray-900">
                        {accountType === 'Credit'
                          ? 'CARD NUMBER'
                          : 'ACCOUNT NUMBER'}
                      </label>
                      <div className="mt-2">
                        <input
                          id="accountNumber"
                          name="accountNumber"
                          type="number"
                          placeholder={
                            accountType === 'Bank Account'
                              ? 'ACCOUNT NUMBER'
                              : 'CARD NUMBER'
                          }
                          required
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          onChange={(e) => setAccountNumber(e.target.value)}
                          value={accountNumber}
                        />
                      </div>
                    </div>
                    <div className="mr-7">
                      <label className="block text-sm/6 font-medium text-gray-900">
                        Bank Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="bankName"
                          name="bankName"
                          type="text"
                          placeholder="BANK NAME"
                          required
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                          onChange={(e) => setBankName(e.target.value)}
                          value={bankName}
                        />
                      </div>
                    </div>
                  </div>
                )}

              <div className="flex justify-between m-5 items-center mb-11">
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
                      onChange={(e) => setAmount(e.target.value)}
                      value={amount}
                    />
                    <span className="ml-2 font-light">INR</span>
                  </div>
                </div>

                <div className="mt-8 mx-9 ">
                  <button
                    type="submit"
                    onClick={addAccountHandler}
                    className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    ADD ACCOUNT
                  </button>
                </div>
              </div>

              {validationError && (
                <div className="text-white p-2 mx-6 mb-6 bg-red-600 mt-3 rounded-md">
                  {validationError}
                </div>
              )}
              <span className="ml-20 text-red-400 text-sm">
                * Make sure that you entered correct,You can't Modify again
              </span>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
