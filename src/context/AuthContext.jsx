import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  updateProfile, 
  updatePassword,
  updateEmail,
  sendPasswordResetEmail,
  signOut 
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  loginWithGoogle: async () => {},
  logout: async () => {},
  updateUserProfile: async () => {},
  updateUserPassword: async () => {},
  updateUserEmail: async () => {},
  resetPassword: async () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };

  const signup = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (name && userCredential.user) {
      await updateProfile(userCredential.user, { displayName: name });
    }
    return userCredential.user;
  };

  const loginWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    return userCredential.user;
  };

  const logout = async () => {
    await signOut(auth);
  };

  const updateUserProfile = async (displayName, photoURL) => {
    if (!auth.currentUser) throw new Error("No user logged in");
    await updateProfile(auth.currentUser, { displayName, photoURL });
    setUser({ ...auth.currentUser });
  };

  const updateUserPassword = async (newPassword) => {
    if (!auth.currentUser) throw new Error("No user logged in");
    await updatePassword(auth.currentUser, newPassword);
  };

  const updateUserEmail = async (newEmail) => {
    if (!auth.currentUser) throw new Error("No user logged in");
    await updateEmail(auth.currentUser, newEmail);
    setUser({ ...auth.currentUser });
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, logout, updateUserProfile, updateUserPassword, updateUserEmail, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
