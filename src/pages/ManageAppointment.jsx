import React, { useState, useEffect } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { doctors } from '../data/doctors';
import { treatments } from '../data/treatments';
import { 
  verifyAppointment, 
  updateAppointment, 
  cancelAppointment
} from '../services/appointmentService';
import toast from 'react-hot-toast';
import { 
  Calendar, 
  Clock, 
  User as UserIcon, 
  Mail, 
  Phone, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  AlertTriangle,
  Loader2,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ManageAppointment = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      navigate('/', { replace: true });
      await logout();
      toast.success('Successfully logged out.');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out.');
    }
  };

  // Verification Form State
  const [verifyForm, setVerifyForm] = useState({
    fullName: '',
    email: '',
    phone: ''
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  // Verified Appointments State
  const [appointmentsList, setAppointmentsList] = useState([]);
  const [isVerified, setIsVerified] = useState(false);

  // Edit Mode State
  const [editingAppointmentId, setEditingAppointmentId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editFormData, setEditFormData] = useState({
    specialist: '',
    treatment: '',
    date: '',
    time: '',
    message: ''
  });

  // Cancel Modal State
  const [cancellingAppointment, setCancellingAppointment] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [justCancelledIds, setJustCancelledIds] = useState([]);

  // Pre-fill email and name from auth if available
  useEffect(() => {
    if (user) {
      setVerifyForm(prev => ({
        ...prev,
        fullName: prev.fullName || user.displayName || '',
        email: prev.email || user.email || ''
      }));
    }
  }, [user]);

  // Auth Guard: Flow 6
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: '/manage-appointment' }} replace />;
  }

  // Handle Verification (Flow 7)
  const handleVerifySubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!verifyForm.fullName || !verifyForm.email || !verifyForm.phone) {
      setVerificationError('Please enter correct details.');
      return;
    }

    setIsVerifying(true);
    setVerificationError('');
    
    // Add a tiny delay to show the "Starting..." refresh state smoothly
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const matches = await verifyAppointment(user.uid, verifyForm);

      if (matches && matches.length > 0) {
        setAppointmentsList(matches);
        setIsVerified(true);
        setJustCancelledIds([]); // Reset session cancelled tracking
        setEditingAppointmentId(null);
        toast.success(`Found ${matches.length} appointment${matches.length > 1 ? 's' : ''}.`);
      } else {
        setVerificationError("Please enter correct details.");
        // Clear form fields as requested for a "refresh" feel on failure
        setVerifyForm(prev => ({ ...prev, fullName: '', email: '', phone: '' }));
      }
    } catch (error) {
      console.error('Error during appointment verification:', error);
      setVerificationError("Please enter correct details.");
      setVerifyForm(prev => ({ ...prev, fullName: '', email: '', phone: '' }));
    } finally {
      setIsVerifying(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const startEditing = (appointment) => {
    setEditingAppointmentId(appointment.id);
    setEditFormData({
      specialist: appointment.specialist || '',
      treatment: appointment.treatment || '',
      date: appointment.date || '',
      time: appointment.time || '',
      message: appointment.message || ''
    });
  };

  // Handle Update Appointment (Flow 9)
  const handleUpdateSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!editingAppointmentId) return;
    
    setIsUpdating(true);

    try {
      await updateAppointment(editingAppointmentId, editFormData);

      setAppointmentsList(prev => prev.map(appt => {
        if (appt.id === editingAppointmentId) {
          return { ...appt, ...editFormData };
        }
        return appt;
      }));

      setEditingAppointmentId(null);
      toast.success('Appointment updated successfully.');
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast.error("We couldn't update your appointment right now. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle Cancel Appointment (Flow 10)
  const handleConfirmCancel = async () => {
    if (!cancellingAppointment) return;
    setIsCancelling(true);

    try {
      await cancelAppointment(cancellingAppointment.id);

      setAppointmentsList(prev => prev.map(appt => {
        if (appt.id === cancellingAppointment.id) {
          return { ...appt, status: 'cancelled' };
        }
        return appt;
      }));
      
      setJustCancelledIds(prev => [...prev, cancellingAppointment.id]);
      setCancellingAppointment(null);
      toast.success('Appointment cancelled successfully.');
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      toast.error("We couldn't cancel your appointment right now. Please try again.");
    } finally {
      setIsCancelling(false);
    }
  };

  // Min date calculation
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <>
      <Helmet>
        <title>Manage Appointment | Dermat Clinic</title>
        <meta name="description" content="View, verify, update, or cancel your dermatological consultation." />
      </Helmet>

      <section className="py-20 bg-background min-h-[calc(100vh-200px)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Manage Your Appointments" 
            subtitle="Patient Portal"
            centered
          />

          {/* STEP 1: Verification Form (Flow 7) */}
          {!isVerified ? (
            <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border mt-8 relative min-h-[400px]">
              
              {/* Full-card loading overlay for "Starting/Refresh" feel */}
              <AnimatePresence>
                {isVerifying && (
                  <motion.div 
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-surface/80 rounded-3xl"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-1">Starting...</h3>
                    <p className="text-sm text-text-secondary">Verifying your appointment details</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">Appointment Verification</h3>
                  <p className="text-sm text-text-secondary">
                    Please confirm your identity by entering the details associated with your booking.
                  </p>
                </div>
              </div>

              <AnimatePresence>
                {verificationError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 flex items-start shadow-sm"
                  >
                    <div className="flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                        Verification Failed
                      </h3>
                      <div className="mt-1 text-sm text-red-700 dark:text-red-300">
                        <p>{verificationError}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={verifyForm.fullName}
                    onChange={(e) => setVerifyForm({ ...verifyForm, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={verifyForm.email}
                    onChange={(e) => setVerifyForm({ ...verifyForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={verifyForm.phone}
                    onChange={(e) => setVerifyForm({ ...verifyForm, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="pt-4 border-t border-border flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-text-secondary hover:text-text-primary text-sm font-medium flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-1.5" /> Logout
                  </button>
                  <Button type="button" size="lg" isLoading={isVerifying} onClick={handleVerifySubmit}>
                    Verify Appointments
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* STEP 2: Verified Details & Actions List (Flow 8, 9, 10, 11) */
            <div className="space-y-8 mt-8">
              <div className="flex justify-between items-center mb-4 px-2">
                <button
                  type="button"
                  onClick={() => setIsVerified(false)}
                  className="text-sm text-text-secondary hover:text-primary font-medium flex items-center"
                >
                  ← Verify different details
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-text-secondary hover:text-text-primary text-sm font-medium flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-1.5" /> Logout
                </button>
              </div>

              {appointmentsList.map((appointment) => {
                const isThisEditing = editingAppointmentId === appointment.id;
                const isJustCancelled = justCancelledIds.includes(appointment.id);
                const isCancelled = appointment.status === 'cancelled';

                return (
                  <div key={appointment.id} className="bg-surface p-8 rounded-3xl shadow-sm border border-border relative transition-all duration-300 hover:shadow-md">
                    
                    {/* Absolute Positioned Actions Container (Top Right) */}
                    {!isCancelled && !isThisEditing && !isJustCancelled && (
                      <div className="absolute top-6 right-8 flex gap-2 hidden sm:flex">
                        <button
                          onClick={() => startEditing(appointment)}
                          className="text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors flex items-center text-sm font-medium border border-primary/20 bg-background"
                        >
                          <Edit3 className="w-4 h-4 mr-1.5" /> Update
                        </button>
                        <button
                          onClick={() => setCancellingAppointment(appointment)}
                          className="text-error hover:bg-error/10 px-3 py-1.5 rounded-lg transition-colors flex items-center text-sm font-medium border border-error/20 bg-background"
                        >
                          <XCircle className="w-4 h-4 mr-1.5" /> Cancel
                        </button>
                      </div>
                    )}

                    {/* Header & Status */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 pb-6 border-b border-border">
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className="text-2xl font-bold text-text-primary">Appointment Details</h3>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                            isCancelled
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200'
                              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200'
                          }`}>
                            {isCancelled ? 'Cancelled' : 'Confirmed'}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary mt-1">
                          Booking ID: <span className="font-mono text-xs">{appointment.id}</span>
                        </p>
                      </div>
                    </div>

                    {/* Status Notice if Cancelled this session (Flow 11) */}
                    {isJustCancelled ? (
                      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-2xl p-6 text-center">
                        <XCircle className="w-12 h-12 text-error mx-auto mb-3" />
                        <h4 className="text-lg font-bold text-text-primary mb-2">This appointment is cancelled</h4>
                        <p className="text-sm text-text-secondary max-w-md mx-auto mb-6">
                          Your appointment has been successfully marked as cancelled.
                        </p>
                        <Button to="/appointment">
                          Book Another
                        </Button>
                      </div>
                    ) : null}

                    {/* VIEW AND EDIT MODES */}
                    {!isJustCancelled && (
                      !isThisEditing ? (
                        <div className="space-y-6">
                          <div className="grid sm:grid-cols-2 gap-6 bg-background rounded-2xl p-6 border border-border">
                            <div className="flex items-start">
                              <UserIcon className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0" />
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Patient Name</p>
                                <p className="font-semibold text-text-primary text-base mt-0.5">{appointment.fullName}</p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <Mail className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0" />
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Email Address</p>
                                <p className="font-semibold text-text-primary text-base mt-0.5">{appointment.email}</p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <Phone className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0" />
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Phone Number</p>
                                <p className="font-semibold text-text-primary text-base mt-0.5">{appointment.phone}</p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <UserIcon className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0" />
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Specialist</p>
                                <p className="font-semibold text-text-primary text-base mt-0.5">{appointment.specialist}</p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0" />
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Treatment</p>
                                <p className="font-semibold text-text-primary text-base mt-0.5">{appointment.treatment}</p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <Calendar className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0" />
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Date</p>
                                <p className="font-semibold text-text-primary text-base mt-0.5">{appointment.date}</p>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <Clock className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0" />
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Time</p>
                                <p className="font-semibold text-text-primary text-base mt-0.5">{appointment.time}</p>
                              </div>
                            </div>
                          </div>

                          {appointment.message && (
                            <div className="bg-background rounded-2xl p-6 border border-border">
                              <div className="flex items-start">
                                <FileText className="w-5 h-5 text-primary mt-0.5 mr-3 shrink-0" />
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Additional Notes</p>
                                  <p className="text-text-primary text-sm mt-1 leading-relaxed">{appointment.message}</p>
                                </div>
                              </div>
                            </div>
                          )}

                          {!isCancelled && (
                            <div className="flex sm:hidden flex-wrap items-center justify-end gap-3 w-full pt-4 border-t border-border">
                              <button
                                onClick={() => startEditing(appointment)}
                                className="text-primary hover:bg-primary/10 px-4 py-2 rounded-lg transition-colors flex items-center text-sm font-medium border border-primary/20 bg-background"
                              >
                                <Edit3 className="w-4 h-4 mr-2" /> Update
                              </button>
                              <button
                                onClick={() => setCancellingAppointment(appointment)}
                                className="text-error hover:bg-error/10 px-4 py-2 rounded-lg transition-colors flex items-center text-sm font-medium border border-error/20 bg-background"
                              >
                                <XCircle className="w-4 h-4 mr-2" /> Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* EDIT MODE (Flow 9) */
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-text-primary mb-2">Select Specialist</label>
                              <select
                                name="specialist"
                                required
                                value={editFormData.specialist}
                                onChange={(e) => setEditFormData({ ...editFormData, specialist: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                              >
                                <option value="">Any Available Specialist</option>
                                {doctors.map(d => (
                                  <option key={d.id} value={`${d.name} - ${d.designation}`}>{d.name} - {d.designation}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-text-primary mb-2">Select Treatment</label>
                              <select
                                name="treatment"
                                required
                                value={editFormData.treatment}
                                onChange={(e) => setEditFormData({ ...editFormData, treatment: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                              >
                                <option value="General Consultation">General Consultation</option>
                                {treatments.map(t => (
                                  <option key={t.id} value={t.title}>{t.title}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-text-primary mb-2">Date</label>
                              <input
                                type="date"
                                name="date"
                                required
                                min={minDate}
                                value={editFormData.date}
                                onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
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
                                value={editFormData.time}
                                onChange={(e) => setEditFormData({ ...editFormData, time: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">Additional Message / Concerns</label>
                            <textarea
                              name="message"
                              rows="3"
                              value={editFormData.message}
                              onChange={(e) => setEditFormData({ ...editFormData, message: e.target.value })}
                              className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors resize-none"
                              placeholder="Briefly describe any updated concerns..."
                            ></textarea>
                          </div>

                          <div className="pt-4 border-t border-border flex justify-end space-x-4">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setEditingAppointmentId(null)}
                              disabled={isUpdating}
                            >
                              Cancel
                            </Button>
                            <Button type="button" isLoading={isUpdating} onClick={handleUpdateSubmit}>
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      )
                    )}

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* CANCEL CONFIRMATION MODAL (Flow 10) */}
      {cancellingAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-surface rounded-3xl max-w-md w-full p-8 border border-border shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-error/10 text-error flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <h3 className="text-xl font-bold text-text-primary text-center mb-2">
              Cancel Appointment?
            </h3>
            
            <p className="text-text-secondary text-sm text-center mb-6 leading-relaxed">
              Are you sure you want to cancel the consultation for <strong>{cancellingAppointment.date} at {cancellingAppointment.time}</strong>? This action will mark the appointment as cancelled.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={() => setCancellingAppointment(null)}
                disabled={isCancelling}
              >
                Keep Appointment
              </Button>
              <Button
                type="button"
                variant="danger"
                fullWidth
                onClick={handleConfirmCancel}
                isLoading={isCancelling}
                className="bg-error text-white hover:bg-error-600"
              >
                Cancel Appointment
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
