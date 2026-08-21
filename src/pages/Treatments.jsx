import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SectionHeading } from '../components/SectionHeading';
import { TreatmentCard } from '../components/TreatmentCard';
import { treatments } from '../data/treatments';
import { Button } from '../components/Button';

export const Treatments = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  const categories = ['All', 'Medical Dermatology', 'Cosmetic Dermatology'];

  const filteredTreatments = activeTab === 'All' 
    ? treatments 
    : treatments.filter(t => t.category === activeTab);

  return (
    <>
      <Helmet>
        <title>Our Treatments | Dermat Clinic</title>
        <meta name="description" content="Explore our comprehensive range of medical and cosmetic dermatology treatments." />
      </Helmet>

      <section className="py-20 bg-background min-h-[calc(100vh-200px)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Our Treatments" 
            subtitle="Advanced Dermatology Services"
            centered
          />

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(category => (
              <Button
                key={category}
                variant={activeTab === category ? 'primary' : 'outline'}
                onClick={() => setActiveTab(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTreatments.map(treatment => (
              <TreatmentCard key={treatment.id} treatment={treatment} />
            ))}
          </div>

          {filteredTreatments.length === 0 && (
            <div className="text-center py-20 text-text-secondary">
              No treatments found for this category.
            </div>
          )}
        </div>
      </section>
    </>
  );
};
