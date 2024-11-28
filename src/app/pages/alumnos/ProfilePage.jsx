import React from 'react';
import ScheduleCard from '../components/ScheduleCard';
import UserProfile from '../components/UserProfile';

const ProfilePage = () => (
  <div className="p-6">
    <UserProfile name="Juan Pérez" age="30" discipline="MMA" />
    <div className="mt-6 space-y-4">
      <ScheduleCard
        className="MMA"
        days="Lunes - Miércoles - Viernes"
        time="8pm - 9pm"
        enrolled
      />
      <ScheduleCard
        className="Kick Boxing"
        days="Lunes - Miércoles - Viernes"
        time="6pm - 7pm"
      />
    </div>
  </div>
);

export default ProfilePage;
