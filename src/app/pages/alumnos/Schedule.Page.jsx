import React from 'react';
import ScheduleCard from '../components/ScheduleCard';

const schedules = [
  { className: "MMA", days: "Lunes - Miércoles - Viernes", time: "8pm - 9pm", enrolled: true },
  { className: "Kick Boxing", days: "Lunes - Miércoles - Viernes", time: "6pm - 7pm", enrolled: false },
  { className: "Jiu Jitsu", days: "Martes - Jueves", time: "7pm - 8pm", enrolled: false },
];

const SchedulePage = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Horarios</h1>
    <div className="space-y-4">
      {schedules.map((schedule, index) => (
        <ScheduleCard key={index} {...schedule} />
      ))}
    </div>
  </div>
);

export default SchedulePage;
