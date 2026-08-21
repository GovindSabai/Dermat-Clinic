import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './layouts/MainLayout';
import { ScrollToTop } from './components/ScrollToTop';
import { Loader2 } from 'lucide-react';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const About = lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const FAQ = lazy(() => import('./pages/FAQ').then(module => ({ default: module.FAQ })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Conditions = lazy(() => import('./pages/Conditions').then(module => ({ default: module.Conditions })));
const ConditionDetails = lazy(() => import('./pages/ConditionDetails').then(module => ({ default: module.ConditionDetails })));
const Treatments = lazy(() => import('./pages/Treatments').then(module => ({ default: module.Treatments })));
const TreatmentDetails = lazy(() => import('./pages/TreatmentDetails').then(module => ({ default: module.TreatmentDetails })));
const Doctors = lazy(() => import('./pages/Doctors').then(module => ({ default: module.Doctors })));
const DoctorDetails = lazy(() => import('./pages/DoctorDetails').then(module => ({ default: module.DoctorDetails })));
const OurTeam = lazy(() => import('./pages/OurTeam').then(module => ({ default: module.OurTeam })));
const BeforeAfter = lazy(() => import('./pages/BeforeAfter').then(module => ({ default: module.BeforeAfter })));
const Blog = lazy(() => import('./pages/Blog').then(module => ({ default: module.Blog })));
const BlogDetails = lazy(() => import('./pages/BlogDetails').then(module => ({ default: module.BlogDetails })));
const Appointment = lazy(() => import('./pages/Appointment').then(module => ({ default: module.Appointment })));
const AppointmentSuccess = lazy(() => import('./pages/AppointmentSuccess').then(module => ({ default: module.AppointmentSuccess })));
const ManageAppointment = lazy(() => import('./pages/ManageAppointment').then(module => ({ default: module.ManageAppointment })));
const Profile = lazy(() => import('./pages/Profile').then(module => ({ default: module.Profile })));
const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const Signup = lazy(() => import('./pages/Signup').then(module => ({ default: module.Signup })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./pages/TermsOfService').then(module => ({ default: module.TermsOfService })));
const NotFound = lazy(() => import('./pages/NotFound').then(module => ({ default: module.NotFound })));
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <Loader2 className="w-8 h-8 animate-spin text-primary" />
  </div>
);

const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <ScrollToTop />
            <Toaster position="top-center" />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/conditions" element={<Conditions />} />
                  <Route path="/conditions/:slug" element={<ConditionDetails />} />
                  <Route path="/treatments" element={<Treatments />} />
                  <Route path="/treatments/:slug" element={<TreatmentDetails />} />
                  <Route path="/doctors" element={<Doctors />} />
                  <Route path="/doctors/:slug" element={<DoctorDetails />} />
                  <Route path="/our-team" element={<OurTeam />} />
                  <Route path="/before-after" element={<BeforeAfter />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogDetails />} />
                  <Route path="/appointment" element={<Appointment />} />
                  <Route path="/appointment-success" element={<AppointmentSuccess />} />
                  <Route path="/manage-appointment" element={<ManageAppointment />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
