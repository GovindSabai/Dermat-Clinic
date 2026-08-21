import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-[72px] lg:pt-[84px]">
        {/* The padding-top offsets the fixed navbar */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
