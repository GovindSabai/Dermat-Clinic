import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { treatments } from '../data/treatments';
import { Button } from '../components/Button';
import { CheckCircle2, Info, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const TreatmentDetails = () => {
  const { slug } = useParams();
  const treatment = treatments.find(t => t.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!treatment) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{treatment.title} | Dermat Clinic</title>
        <meta name="description" content={treatment.shortDescription} />
      </Helmet>

      <section className="py-20 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link to="/treatments" className="inline-flex items-center text-primary hover:text-primary-dark font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Treatments
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left side: Image */}
            <div className="rounded-3xl overflow-hidden shadow-lg sticky top-24">
              <img 
                src={treatment.image} 
                alt={treatment.title} 
                className="w-full h-auto object-cover aspect-[4/3] lg:aspect-square"
              />
            </div>

            {/* Right side: Content */}
            <div>
              <header className="mb-10">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                  {treatment.category}
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
                  {treatment.title}
                </h1>
                <p className="text-xl font-medium text-text-primary leading-relaxed border-l-4 border-primary pl-4 mb-8">
                  {treatment.shortDescription}
                </p>
              </header>

              <div className="prose prose-lg dark:prose-invert max-w-none text-text-secondary">
                <h2 className="text-2xl font-bold text-text-primary mb-4">Overview</h2>
                <p className="text-text-secondary leading-relaxed mb-8">{treatment.overview}</p>

                <h2 className="text-2xl font-bold text-text-primary mb-4">Key Benefits</h2>
                <ul className="space-y-3 mb-8">
                  {treatment.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="w-6 h-6 text-primary mr-3 shrink-0" />
                      <span className="text-text-secondary">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="text-2xl font-bold text-text-primary mb-4">Our Approach</h2>
                <p className="text-text-secondary leading-relaxed mb-8">{treatment.approach}</p>

                <h2 className="text-2xl font-bold text-text-primary mb-4">What to Expect</h2>
                <p className="text-text-secondary leading-relaxed mb-12">{treatment.expectations}</p>
              </div>

              <div className="bg-primary/5 rounded-2xl p-6 sm:p-8 border border-primary/10 mt-12 flex flex-col sm:flex-row items-center justify-between">
                <div className="mb-6 sm:mb-0 sm:mr-8 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-text-primary mb-2">Interested in {treatment.title}?</h3>
                  <p className="text-text-secondary text-sm max-w-md">
                    Schedule a consultation to determine if this treatment is right for your unique skin needs.
                  </p>
                </div>
                <Button to="/appointment" size="lg" className="shrink-0">
                  Book a Consultation
                </Button>
              </div>

              {/* Medical Disclaimer */}
              <div className="mt-8 flex items-start bg-surface p-4 rounded-xl border border-border">
                <Info className="w-5 h-5 text-text-secondary shrink-0 mt-0.5 mr-3" />
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong>Medical Disclaimer:</strong> Treatment suitability varies by individual. Consultation with a qualified dermatologist is recommended before starting any treatment. This information is for educational purposes only.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
};
