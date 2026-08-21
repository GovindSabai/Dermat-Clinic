import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/Button';
import { SearchX } from 'lucide-react';

export const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Dermat Clinic</title>
      </Helmet>

      <section className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-background py-20">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
            <SearchX className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            404
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-text-primary mb-4">
            Page Not Found
          </h2>
          <p className="text-text-secondary mb-8 leading-relaxed">
            The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
          </p>
          <Button to="/" size="lg">
            Back to Home
          </Button>
        </div>
      </section>
    </>
  );
};
