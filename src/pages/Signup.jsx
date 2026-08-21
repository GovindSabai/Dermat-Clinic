import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const GoogleIcon = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

export const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from || '/';

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match. Please try again.');
      return;
    }
    
    setIsLoading(true);
    const toastId = toast.loading('Creating account...');
    try {
      await signup(formData.name, formData.email, formData.password);
      toast.success('Account created successfully! Welcome to Dermat Clinic.', { id: toastId });
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error('Firebase Signup Error:', error);
      const code = error.code;
      if (code === 'auth/email-already-in-use') {
        toast.error('This email is already registered. Please sign in instead.', { id: toastId, duration: 3000 });
      } else if (code === 'auth/weak-password') {
        toast.error('Password should be at least 6 characters.', { id: toastId, duration: 3000 });
      } else if (code === 'auth/invalid-email') {
        toast.error('Please enter a valid email address.', { id: toastId, duration: 2500 });
      } else {
        toast.error("We couldn't complete account registration. Please try again.", { id: toastId, duration: 2500 });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    const toastId = toast.loading('Connecting to Google...');
    try {
      await loginWithGoogle();
      toast.success('Successfully connected with Google!', { id: toastId });
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error('Firebase Google Signup Error:', error);
      const code = error.code;
      if (code === 'auth/popup-closed-by-user') {
        toast.error('Google sign-in was cancelled.', { id: toastId, icon: 'ℹ️' });
      } else if (code === 'auth/popup-blocked') {
        toast.error('Google sign-in popup was blocked by your browser. Please allow popups for this site.', { id: toastId });
      } else if (code === 'auth/cancelled-popup-request') {
        toast.dismiss(toastId);
        // Ignore duplicate popup requests
      } else if (code === 'auth/account-exists-with-different-credential') {
        toast.error('An account already exists with the same email using a different sign-in method.', { id: toastId });
      } else if (code === 'auth/network-request-failed') {
        toast.error('Network error. Please check your internet connection.', { id: toastId });
      } else {
        toast.error(error.message || 'Could not connect with Google. Please try again.', { id: toastId });
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Create Account | Dermat Clinic</title>
      </Helmet>

      <section className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-text-primary">Create an account</h2>
            <p className="mt-2 text-text-secondary">Join us to book and manage your appointments</p>
          </div>

          <div className="bg-surface p-8 rounded-3xl shadow-sm border border-border">
            {/* Google Sign In Option */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading || isGoogleLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border bg-background hover:bg-secondary/15 hover:border-primary/40 active:scale-[0.99] text-text-primary font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isGoogleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              ) : (
                <GoogleIcon />
              )}
              <span>{isGoogleLoading ? 'Connecting to Google...' : 'Continue with Google'}</span>
            </button>

            {/* Divider */}
            <div className="relative flex items-center py-6">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink-0 mx-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                or register with email
              </span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
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
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Email address</label>
                <input
                  type="email" 
                  name="email" 
                  required 
                  value={formData.email} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  placeholder="patient@example.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} 
                    name="password" 
                    required 
                    minLength="6" 
                    value={formData.password} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors pr-10"
                    placeholder="•••••••• (min 6 characters)"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-primary"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Confirm Password</label>
                <input
                  type={showPassword ? "text" : "password"} 
                  name="confirmPassword" 
                  required 
                  minLength="6" 
                  value={formData.confirmPassword} 
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>

              <Button type="submit" fullWidth isLoading={isLoading} disabled={isGoogleLoading}>
                Create Account
              </Button>
            </form>

            <p className="mt-8 text-center text-sm text-text-secondary">
              Already have an account?{' '}
              <Link 
                to="/login" 
                state={{ from: redirectPath }}
                className="font-medium text-primary hover:text-primary-dark"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
