import React from 'react';
import LoginForm from '../components/LoginForm';
import Footer from '@/components/Footer';

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex justify-center items-center">
        <LoginForm />
      </main>
      <Footer/>
    </div>
  );
};

export default LoginPage;

