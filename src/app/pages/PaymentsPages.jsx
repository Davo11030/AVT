import React from 'react';
import PaymentCard from '../components/PaymentCard';

const payments = [
  { month: "Septiembre", status: "Pagado" },
  { month: "Octubre", status: "Atraso" },
  { month: "Noviembre", status: "Pendiente" },
  { month: "Diciembre", status: "Pendiente" },
];

const PaymentsPage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Pagos</h1>
    <div className="space-y-4">
      {payments.map((payment, index) => (
        <PaymentCard key={index} {...payment} />
      ))}
    </div>
  </div>
);

export default PaymentsPage;
