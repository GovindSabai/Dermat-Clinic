import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/Button';
import { CheckCircle2, Calendar, Clock, FileText } from 'lucide-react';

export const AppointmentSuccess = () => {
  const location = useLocation();
  const appointmentData = location.state?.appointmentData;
  const appointmentId = location.state?.appointmentId;

  // If someone navigates here directly without booking, redirect to book page
  if (!appointmentData || !appointmentId) {
    return <Navigate to="/appointment" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Appointment Confirmed | Dermat Clinic</title>
      </Helmet>

      <section className="min-h-[calc(100vh-100px)] py-20 bg-background flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-surface rounded-3xl shadow-sm border border-border p-8 md:p-12 text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h1 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
              Booking Confirmed!
            </h1>
            
            <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto">
              Your appointment request has been successfully submitted. We look forward to seeing you.
            </p>

            <div className="bg-background rounded-2xl p-6 mb-10 border border-border text-left">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-secondary mb-4 pb-4 border-b border-border">
                Booking Reference
              </h3>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-text-secondary">Appointment ID</p>
                  <p className="text-xl font-mono font-bold text-primary">{appointmentId}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <p className="text-xs text-text-secondary">Date</p>
                    <p className="font-medium text-text-primary">{appointmentData.date}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <p className="text-xs text-text-secondary">Time</p>
                    <p className="font-medium text-text-primary">{appointmentData.time}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
              <Button to="/" variant="outline" size="lg" className="w-full sm:w-auto">
                Back to Home
              </Button>
              <Button to="/manage-appointment" size="lg" className="w-full sm:w-auto">
                Manage Appointment
              </Button>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
};
