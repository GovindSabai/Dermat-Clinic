import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { SectionHeading } from '../components/SectionHeading';
import toast from 'react-hot-toast';
import { User, Lock, Mail, Camera } from 'lucide-react';

export const Profile = () => {
  const { user, updateUserProfile, updateUserPassword } = useAuth();
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [imageError, setImageError] = useState(false);

  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
  });

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);
    try {
      await updateUserProfile(profileData.displayName, user.photoURL);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile.');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    
    setIsUpdatingPassword(true);
    try {
      await updateUserPassword(passwordData.newPassword);
      toast.success('Password updated successfully!');
      setPasswordData({ newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error(error);
      if (error.code === 'auth/requires-recent-login') {
        toast.error('Please logout and login again to update your password.');
      } else {
        toast.error('Failed to update password.');
      }
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>My Profile | Dermat Clinic</title>
      </Helmet>

      <section className="py-20 bg-background min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="My Profile" 
            subtitle="Account Settings"
            centered
          />

          <div className="mt-12 space-y-8">
            
            {/* Profile Info Card */}
            <div className="bg-surface rounded-3xl shadow-sm border border-border p-8">
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
                <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold overflow-hidden relative group">
                  {user.photoURL && !imageError ? (
                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" onError={() => setImageError(true)} />
                  ) : (
                    <span className="leading-none mt-1">
                      {user.displayName?.trim() ? user.displayName.trim().charAt(0).toUpperCase() : user.email?.trim().charAt(0).toUpperCase() || '?'}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-text-primary">{user.displayName || 'No Name Set'}</h3>
                  <p className="text-text-secondary flex items-center mt-1">
                    <Mail className="w-4 h-4 mr-2" />
                    {user.email}
                  </p>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-text-primary mb-6">Update Profile details</h4>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Display Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-text-secondary" />
                    </div>
                    <input
                      type="text"
                      value={profileData.displayName}
                      onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                      className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl focus:ring-primary focus:border-primary bg-background text-text-primary transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" disabled={isUpdatingProfile || profileData.displayName === user.displayName}>
                    {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </div>

            {/* Password Update Card */}
            {user.providerData[0]?.providerId === 'password' && (
              <div className="bg-surface rounded-3xl shadow-sm border border-border p-8">
                <h4 className="text-lg font-semibold text-text-primary mb-6 flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-primary" />
                  Change Password
                </h4>
                
                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">New Password</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="block w-full px-4 py-3 border border-border rounded-xl focus:ring-primary focus:border-primary bg-background text-text-primary transition-colors"
                        placeholder="Min 6 characters"
                        minLength="6"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Confirm Password</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="block w-full px-4 py-3 border border-border rounded-xl focus:ring-primary focus:border-primary bg-background text-text-primary transition-colors"
                        placeholder="Re-enter password"
                        minLength="6"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" variant="primary" disabled={isUpdatingPassword || !passwordData.newPassword}>
                      {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
          </div>
        </div>
      </section>
    </>
  );
};
