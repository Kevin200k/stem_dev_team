// src/firebase/controllers/userLearningStyle.js
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase'; // ✅ Import db

// Save to Firestore + update localStorage
export const saveLearningStyle = async (userId, learningStyle) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { learningStyle }, { merge: true });

    const stored = JSON.parse(localStorage.getItem('user'));
    if (stored) {
      localStorage.setItem('user', JSON.stringify({ ...stored, learningStyle }));
    }

    console.log('✅ Learning style saved');
  } catch (error) {
    console.error('❌ Error saving learning style:', error);
  }
};

// Read from Firestore
export const getLearningStyle = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data().learningStyle || null : null;
  } catch (error) {
    console.error('❌ Error getting learning style:', error);
    return null;
  }
};
