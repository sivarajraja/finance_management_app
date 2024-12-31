import React from 'react';
import credit from '../assets/credit.png';
import debit from '../assets/debit.png';
import mobile from '../assets/mobile_banking.png';
import cash from '../assets/cash.png';

export const PaymentImage = ({ mode }) => {
  let imageSrc;
  switch (mode) {
    case 'Credit Card':
      imageSrc = credit;
      break;
    case 'Debit Card':
      imageSrc = debit;
      break;
    case 'Cash':
      imageSrc = cash;
      break;
    case 'Mobile Banking':
      imageSrc = mobile;
      break;
    default:
      imageSrc = null;
      break;
  }
  return (
    <div>
      {' '}
      {imageSrc && <img src={imageSrc} className="w-4 h-4" alt={mode} />}
    </div>
  );
};
