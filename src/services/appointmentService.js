import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  doc, 
  updateDoc, 
  serverTimestamp,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase';

const COLLECTION_NAME = 'appointments';

/**
 * Creates a new appointment document in Firestore.
 * @param {Object} appointmentData 
 * @param {string} userId - Current Firebase user UID
 * @returns {Promise<Object>} Created appointment reference and ID
 */
export const createAppointment = async (appointmentData, userId) => {
  if (!userId) {
    throw new Error('User must be authenticated to create an appointment.');
  }

  const payload = {
    userId,
    fullName: appointmentData.name || appointmentData.fullName || '',
    email: appointmentData.email || '',
    phone: appointmentData.phone || '',
    specialist: appointmentData.specialist || appointmentData.doctorName || 'Any Specialist',
    treatment: appointmentData.treatment || appointmentData.treatmentName || 'General Consultation',
    date: appointmentData.date || '',
    time: appointmentData.time || '',
    message: appointmentData.message || '',
    status: 'confirmed',
    createdAt: serverTimestamp()
  };

  const docRef = await addDoc(collection(db, COLLECTION_NAME), payload);
  return { id: docRef.id, ...payload };
};

/**
 * Retrieves all appointments for the currently authenticated user.
 * @param {string} userId 
 * @returns {Promise<Array>}
 */
export const getUserAppointments = async (userId) => {
  if (!userId) return [];

  const q = query(
    collection(db, COLLECTION_NAME),
    where('userId', '==', userId)
  );

  const snapshot = await getDocs(q);
  const appointments = [];
  snapshot.forEach((docSnapshot) => {
    appointments.push({ id: docSnapshot.id, ...docSnapshot.data() });
  });

  return appointments;
};

/**
 * Retrieves the latest active (non-cancelled) appointment for the user.
 * @param {string} userId 
 * @returns {Promise<Object|null>}
 */
export const getUserActiveAppointment = async (userId) => {
  if (!userId) return null;

  const appointments = await getUserAppointments(userId);
  // Find first non-cancelled appointment (status: 'confirmed' or not 'cancelled')
  const active = appointments.find((a) => a.status !== 'cancelled');
  return active || null;
};

/**
 * Subscribes to the active appointment status in real-time for navbar updates.
 * @param {string} userId 
 * @param {Function} callback - Called with active appointment or null
 * @returns {Function} Unsubscribe function
 */
export const subscribeToUserActiveAppointment = (userId, callback) => {
  if (!userId) {
    callback(null);
    return () => {};
  }

  const q = query(
    collection(db, COLLECTION_NAME),
    where('userId', '==', userId)
  );

  return onSnapshot(q, (snapshot) => {
    const list = [];
    snapshot.forEach((docSnapshot) => {
      list.push({ id: docSnapshot.id, ...docSnapshot.data() });
    });
    const active = list.find((a) => a.status !== 'cancelled');
    callback(active || null);
  }, (error) => {
    console.error('Error subscribing to active appointment:', error);
    callback(null);
  });
};

/**
 * Verifies appointment details against the current user's appointments in Firestore.
 * Securely restricts query to only the authenticated user's records.
 * @param {string} userId 
 * @param {Object} verificationData - { fullName, email, phone }
 * @returns {Promise<Object|null>} Matching appointment or null
 */
export const verifyAppointment = async (userId, { fullName, email, phone }) => {
  if (!userId) return null;

  const appointments = await getUserAppointments(userId);
  if (!appointments || appointments.length === 0) return null;

  const cleanName = (fullName || '').trim().toLowerCase();
  const cleanEmail = (email || '').trim().toLowerCase();
  
  // Extract only the last 10 digits to safely ignore country codes like +91
  const cleanPhoneFull = (phone || '').replace(/\D/g, '');
  const cleanPhone10 = cleanPhoneFull.slice(-10);

  const matchedAppointments = appointments.filter((appt) => {
    const apptName = (appt.fullName || '').trim().toLowerCase();
    const apptEmail = (appt.email || '').trim().toLowerCase();
    
    const apptPhoneFull = (appt.phone || '').replace(/\D/g, '');
    const apptPhone10 = apptPhoneFull.slice(-10);

    const nameMatches = apptName === cleanName;
    const emailMatches = apptEmail === cleanEmail;
    
    // Match if the last 10 digits match, or if the exact raw string matches
    const phoneMatches = (apptPhone10 && cleanPhone10 && apptPhone10 === cleanPhone10) || 
                         (appt.phone || '').trim() === (phone || '').trim();
                         
    const isNotCancelled = appt.status !== 'cancelled';

    return nameMatches && emailMatches && phoneMatches && isNotCancelled;
  });

  // Sort by createdAt descending (most recent first)
  matchedAppointments.sort((a, b) => {
    const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
    const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
    return timeB - timeA;
  });

  return matchedAppointments;
};

/**
 * Updates editable fields of an appointment.
 * Prevents editing userId and createdAt.
 * @param {string} appointmentId 
 * @param {Object} updatedData 
 * @returns {Promise<void>}
 */
export const updateAppointment = async (appointmentId, updatedData) => {
  if (!appointmentId) throw new Error('Appointment ID is required.');

  // Sanitize to only permit allowed editable fields
  const allowedUpdates = {};
  if (updatedData.specialist !== undefined) allowedUpdates.specialist = updatedData.specialist;
  if (updatedData.treatment !== undefined) allowedUpdates.treatment = updatedData.treatment;
  if (updatedData.date !== undefined) allowedUpdates.date = updatedData.date;
  if (updatedData.time !== undefined) allowedUpdates.time = updatedData.time;
  if (updatedData.message !== undefined) allowedUpdates.message = updatedData.message;

  allowedUpdates.updatedAt = serverTimestamp();

  const docRef = doc(db, COLLECTION_NAME, appointmentId);
  await updateDoc(docRef, allowedUpdates);
};

/**
 * Cancels an appointment by updating its status to 'cancelled'.
 * Preserves the document history for clinic administrative records.
 * @param {string} appointmentId 
 * @returns {Promise<void>}
 */
export const cancelAppointment = async (appointmentId) => {
  if (!appointmentId) throw new Error('Appointment ID is required.');

  const docRef = doc(db, COLLECTION_NAME, appointmentId);
  await updateDoc(docRef, {
    status: 'cancelled',
    cancelledAt: serverTimestamp()
  });
};
