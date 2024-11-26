import React from 'react';

const PaymentCard = ({ month, status }) => {
  const statusColor = {
    Pagado: "text-green-500",
    Atraso: "text-red-500",
    Pendiente: "text-yellow-500",
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md">
      <span>{month}</span>
      <span className={`${statusColor[status]} font-semibold`}>{status}</span>
    </div>
  );
};

export default PaymentCard;
