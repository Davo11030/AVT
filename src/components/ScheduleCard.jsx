import React from 'react';

const ScheduleCard = ({ className, days, time, enrolled }) => (
  <div className="p-4 bg-white rounded-lg shadow-md">
    <h3 className="font-semibold text-lg">{className}</h3>
    <p className="text-gray-600">{days}</p>
    <p className="text-gray-600">{time}</p>
    <button
      className={`mt-4 py-2 px-4 rounded ${
        enrolled ? "bg-green-500 text-white" : "bg-blue-500 text-white"
      }`}
    >
      {enrolled ? "Inscrito" : "Inscribirse"}
    </button>
  </div>
);

export default ScheduleCard;
