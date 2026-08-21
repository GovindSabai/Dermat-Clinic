import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { conditions } from '../data/conditions';
import { Button } from '../components/Button';
import { CheckCircle2, Info, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ConditionDetails = () => {
  const { slug } = useParams();
  const condition = conditions.find(c => c.slug === slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!condition) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{condition.title} | Dermat Clinic</title>
        <meta name="description" content={condition.shortDescription} />
      </Helmet>

      <div className="bg-surface border-b border-border py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/conditions" className="inline-flex items-center text-primary hover:text-primary-dark font-medium mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Conditions
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">{condition.title}</h1>
          <p className="text-xl text-text-secondary">{condition.shortDescription}</p>
        </div>
      </div>

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-text-primary mb-4">Overview</h2>
            <p className="text-text-secondary leading-relaxed mb-8">{condition.overview}</p>

            <h2 className="text-2xl font-bold text-text-primary mb-4">Common Symptoms</h2>
            <ul className="space-y-3 mb-8">
              {condition.symptoms.map((symptom, idx) => (
                <li key={idx} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary mr-3 shrink-0" />
                  <span className="text-text-secondary">{symptom}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-text-primary mb-4">Possible Causes</h2>
            <ul className="list-disc pl-6 space-y-2 text-text-secondary mb-8">
              {condition.causes.map((cause, idx) => (
                <li key={idx}>{cause}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-text-primary mb-4">Our Treatment Approach</h2>
            <p className="text-text-secondary leading-relaxed mb-12">{condition.approach}</p>
          </div>

          <div className="bg-primary/5 rounded-2xl p-6 sm:p-8 border border-primary/10 mt-12 flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-6 sm:mb-0 sm:mr-8 text-center sm:text-left">
              <h3 className="text-xl font-bold text-text-primary mb-2">Ready to seek treatment?</h3>
              <p className="text-text-secondary text-sm max-w-md">
                Schedule a consultation with our dermatologists to discuss personalized treatment options for {condition.title.toLowerCase()}.
              </p>
            </div>
            <Button to="/appointment" size="lg" className="shrink-0">
              Book an Appointment
            </Button>
          </div>

          <div className="mt-8 flex items-start bg-surface p-4 rounded-xl border border-border">
            <Info className="w-5 h-5 text-text-secondary shrink-0 mt-0.5 mr-3" />
            <p className="text-xs text-text-secondary leading-relaxed">
              <strong>Medical Disclaimer:</strong> This website is for general educational and informational purposes only. Information on this website should not be considered a substitute for professional medical advice, diagnosis, or treatment. Individual treatment suitability may vary. Please consult a qualified healthcare professional for personalized advice.
            </p>
          </div>

        </div>
      </section>
    </>
  );
};
