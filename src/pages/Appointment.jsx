import React, { useState, useEffect } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { doctors } from '../data/doctors';
import { treatments } from '../data/treatments';
import { createAppointment } from '../services/appointmentService';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export const Appointment = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    doctorId: '',
    treatmentSlug: '',
    date: '',
    time: '',
    message: ''
  });

  // Pre-fill user data when user is loaded
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || user.displayName || '',
        email: prev.email || user.email || ''
      }));
    }
  }, [user]);

  // Auth Guard: Flow 1 & Flow 2
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: '/appointment' }} replace />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (new Date(formData.date) < new Date(new Date().setHours(0, 0, 0, 0))) {
      toast.error('Please select a future date.');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedDoctor = doctors.find(d => d.id === parseInt(formData.doctorId));
      const selectedTreatment = treatments.find(t => t.slug === formData.treatmentSlug);

      const appointmentPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        specialist: selectedDoctor ? `${selectedDoctor.name} - ${selectedDoctor.designation}` : 'Any Available Specialist',
        treatment: selectedTreatment ? selectedTreatment.title : 'General Consultation',
        date: formData.date,
        time: formData.time,
        message: formData.message
      };

      const result = await createAppointment(appointmentPayload, user.uid);

      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success('✓ Appointment booked successfully!', { duration: 2000 });

      // Navigate to success page with appointment data
      navigate('/appointment-success', {
        state: {
          appointmentId: result.id,
          appointmentData: {
            date: formData.date,
            time: formData.time
          }
        },
        replace: true
      });
    } catch (error) {
      console.error('Error creating appointment in Firestore:', error);
      toast.error("We couldn't complete your appointment request right now. Please try again.", { duration: 3000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get tomorrow's date for the min date attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <>
      <Helmet>
        <title>Book Appointment | Dermat Clinic</title>
        <meta name="description" content="Book your consultation with our expert dermatologists today." />
      </Helmet>

      <section className="py-20 bg-background min-h-[calc(100vh-200px)] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          <div className="absolute right-4 sm:right-6 lg:right-8 top-0 mt-2">
            <Link 
              to="/" 
              className="text-sm font-medium text-primary hover:text-primary-dark hover:underline flex items-center gap-1 transition-colors"
            >
              Skip If you have already book
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <SectionHeading 
            title="Book Your Consultation" 
            subtitle="Appointments"
            centered
          />

          {/* Booking Form View */}
          <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    value={formData.email} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required 
                    value={formData.phone} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Select Specialist</label>
                  <select 
                    name="doctorId" 
                    required
                    value={formData.doctorId} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  >
                    <option value="">Any Available Specialist</option>
                    {doctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} - {d.designation}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Select Treatment (Optional)</label>
                  <select 
                    name="treatmentSlug"
                    value={formData.treatmentSlug} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  >
                    <option value="">General Consultation</option>
                    {treatments.map(t => (
                      <option key={t.id} value={t.slug}>{t.title}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Date</label>
                    <input 
                      type="date" 
                      name="date" 
                      required 
                      min={minDate}
                      value={formData.date} 
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Time</label>
                    <input 
                      type="time" 
                      name="time" 
                      required 
                      min="09:00" 
                      max="18:00"
                      value={formData.time} 
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Additional Message / Concerns</label>
                <textarea 
                  name="message" 
                  rows="3"
                  value={formData.message} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors resize-none"
                  placeholder="Briefly describe your skin concern..."
                ></textarea>
              </div>

              <div className="pt-4 border-t border-border flex justify-end">
                <Button type="submit" size="lg" isLoading={isSubmitting}>
                  Request Appointment
                </Button>
              </div>
            </form>
          </div>

        </div>
      </section>
    </>
  );
};
