import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import { StatCard } from '../components/StatCard';
import { DoctorCard } from '../components/DoctorCard';
import { TreatmentCard } from '../components/TreatmentCard';
import { ConditionCard } from '../components/ConditionCard';
import { ReviewCard } from '../components/ReviewCard';

// Import data
import { doctors } from '../data/doctors';
import { treatments } from '../data/treatments';
import { conditions } from '../data/conditions';
import { team } from '../data/team';
import { reviews } from '../data/reviews';

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Dermat Clinic - Advanced Dermatology</title>
        <meta name="description" content="Healthy Skin Starts With Expert Care. Personalised dermatology care for skin, hair, and nails." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-16 pb-24 lg:pt-32 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-text-primary leading-tight mb-6">
                Healthy Skin Starts With <span className="text-primary">Expert Care</span>
              </h1>
              <p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0">
                Personalized dermatology care for your skin, hair, and nails with a patient-first approach and modern treatment solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button to="/appointment" size="lg">
                  Book Appointment
                </Button>
                <Button to="/treatments" variant="outline" size="lg">
                  Explore Treatments
                </Button>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] sm:aspect-video lg:aspect-[4/5]">
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800&h=1000" 
                  alt="Dermatology consultation" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Cards (Desktop only for cleaner layout) */}
              <div className="hidden lg:block absolute -left-12 top-1/4 bg-surface p-4 rounded-xl shadow-lg border border-border">
                <p className="font-semibold text-text-primary flex items-center">
                  <span className="text-warning mr-2">★★★★★</span> Trusted Care
                </p>
              </div>
              <div className="hidden lg:block absolute -right-8 bottom-1/4 bg-surface p-4 rounded-xl shadow-lg border border-border">
                <p className="font-semibold text-text-primary">10+ Years Experience</p>
                <p className="text-xs text-text-secondary">Personalized Plans</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Trust Statistics */}
      <section className="bg-surface py-16 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard title="Years Experience" value="10" />
            <StatCard title="Patients Served" value="5,000" />
            <StatCard title="Treatment Options" value="20" />
            <StatCard title="Patient Rating" value="4.9" suffix="/5" />
          </div>
        </div>
      </section>

      {/* Conditions Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Conditions We Treat" 
            subtitle="Expert Diagnosis" 
            centered 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {conditions.slice(0, 4).map(condition => (
              <ConditionCard key={condition.id} condition={condition} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button to="/conditions" variant="ghost">View All Conditions →</Button>
          </div>
        </div>
      </section>

      {/* Treatments Preview */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Advanced Treatments" 
            subtitle="Modern Solutions" 
            centered 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {treatments.slice(0, 4).map(treatment => (
              <TreatmentCard key={treatment.id} treatment={treatment} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button to="/treatments" variant="ghost">Explore All Treatments →</Button>
          </div>
        </div>
      </section>

      {/* Doctor Preview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Meet Our Specialists" 
            subtitle="Expert Team" 
            centered 
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.slice(0, 3).map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button to="/doctors" variant="outline">View Full Team Profiles</Button>
          </div>
        </div>
      </section>

      {/* Reviews Preview */}
      <section className="py-20 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Patient Experiences" 
            subtitle="Testimonials" 
            centered 
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

    </>
  );
};
