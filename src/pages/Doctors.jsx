import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SectionHeading } from '../components/SectionHeading';
import { DoctorCard } from '../components/DoctorCard';
import { doctors } from '../data/doctors';

export const Doctors = () => {
  return (
    <>
      <Helmet>
        <title>Our Doctors | Dermat Clinic</title>
        <meta name="description" content="Meet our team of experienced and board-certified dermatologists." />
      </Helmet>

      <section className="py-20 bg-background min-h-[calc(100vh-200px)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Our Dermatologists" 
            subtitle="Meet The Experts"
            centered
          />
          <p className="text-text-secondary max-w-2xl mx-auto text-center text-lg mb-12">
            Our board-certified dermatologists are leaders in their fields, bringing decades of combined experience to provide you with the highest standard of care.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
