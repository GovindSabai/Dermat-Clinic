import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SectionHeading } from '../components/SectionHeading';
import { ConditionCard } from '../components/ConditionCard';
import { conditions } from '../data/conditions';

export const Conditions = () => {
  return (
    <>
      <Helmet>
        <title>Conditions We Treat | Dermat Clinic</title>
        <meta name="description" content="Explore the various skin, hair, and nail conditions we expertly manage at Dermat Clinic." />
      </Helmet>

      <section className="py-20 bg-background min-h-[calc(100vh-200px)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
             <SectionHeading 
              title="Conditions We Treat" 
              subtitle="Expert Diagnosis & Care"
              centered
            />
            <p className="text-text-secondary max-w-3xl text-lg mx-auto">
              Our specialists are experienced in diagnosing and treating a wide array of dermatological conditions. Browse below to learn more about common concerns and our general approach to care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {conditions.map(condition => (
              <ConditionCard key={condition.id} condition={condition} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
