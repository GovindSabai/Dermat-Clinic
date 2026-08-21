import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { CheckCircle2 } from 'lucide-react';

export const About = () => {
  const features = [
    "Experienced Dermatologists",
    "Personalized Treatment Plans",
    "Modern Clinical Approach",
    "Patient-Centered Care"
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Dermat Clinic</title>
        <meta name="description" content="Learn more about Dermat Clinic's patient-centered approach to dermatology." />
      </Helmet>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16 text-center">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">
              About Our Clinic
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <SectionHeading 
                title="Expert Care. Personal Attention." 
              />
              <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                Our clinic combines modern dermatological knowledge with personalized patient care to help individuals better understand and manage their skin, hair, and nail concerns. 
              </p>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                We believe that healthy skin is the foundation of overall wellness. Our team of specialized dermatologists, trichologists, and clinical staff work together to provide evidence-based treatments tailored to your unique needs.
              </p>
              
              <ul className="space-y-4 mb-8">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-text-primary font-medium">
                    <CheckCircle2 className="w-6 h-6 text-primary mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button to="/our-team" variant="primary">
                Meet Our Team
              </Button>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800&h=800" 
                alt="Modern dermatology clinic interior"
                className="w-full h-full object-cover" 
              />
            </div>

          </div>
        </div>
      </section>
    </>
  );
};
