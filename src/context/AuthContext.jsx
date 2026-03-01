"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/firebase/firebase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('user');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('=== AUTH STATE CHANGED ===');
      console.log('User:', user?.email);
      console.log('User UID:', user?.uid);
      
      if (user) {
        setUser(user);
        try {
          const url = `http://localhost:4000/users/${user.uid}`;
          console.log('Fetching from URL:', url);
          
          const response = await fetch(url);
          console.log('Response status:', response.status);
          console.log('Response ok:', response.ok);
          
          if (response.ok) {
            const userData = await response.json();
            console.log('=== USER DATA FROM BACKEND ===');
            console.log('Full response:', JSON.stringify(userData, null, 2));
            console.log('Role field:', userData.role);
            console.log('Role type:', typeof userData.role);
            
            const role = userData.role || 'user';
            console.log('=== SETTING ROLE ===');
            console.log('Final role value:', role);
            setUserRole(role);
            
            setTimeout(() => {
              console.log('Role after setState:', role);
            }, 100);
          } else if (response.status === 404) {
            console.log('User not found in backend (404), creating...');
            const newUserData = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              provider: user.providerData[0]?.providerId || 'email',
              role: 'user',
              createdAt: new Date().toISOString()
            };
            
            try {
              await saveUserToBackend(newUserData);
              console.log('User created in backend successfully');
              setUserRole('user');
            } catch (saveError) {
              console.error('Failed to create user in backend:', saveError);
              setUserRole('user');
            }
          } else {
            console.error('Failed to fetch user data, status:', response.status);
            const text = await response.text();
            console.error('Response body:', text);
            setUserRole('user');
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
          console.error('Error details:', error.message);
          setUserRole('user');
        }
      } else {
        console.log('No user logged in');
        setUser(null);
        setUserRole('user');
      }
      setLoading(false);
      console.log('=== AUTH STATE CHANGE COMPLETE ===');
    });

    return () => unsubscribe();
  }, []);

  const saveUserToFirestore = async (userId, userData) => {
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      console.error('Error saving user to Firestore:', error);
      throw error;
    }
  };

  const saveUserToBackend = async (userData) => {
    try {
      const response = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        if (response.status === 409) {
          console.log('User already exists in backend');
          return;
        }
        throw new Error('Failed to save user to backend');
      }

      const data = await response.json();
      console.log('User saved to backend successfully:', data);
      return data;
    } catch (error) {
      console.error('Error saving user to backend:', error);
      throw error;
    }
  };

  // Register with email and password
  const register = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile with display name
      await updateProfile(user, { displayName });

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        photoURL: user.photoURL || null,
        provider: 'email',
        role: 'user', // Default role
        createdAt: new Date().toISOString()

      };

      // Save to backend API
      try {
        await saveUserToBackend(userData);
      } catch (backendError) {
        console.error('Failed to save to backend:', backendError);
      }

      // Save user data to Firestore (optional, as backup)
      try {
        await saveUserToFirestore(user.uid, userData);
      } catch (firestoreError) {
        console.warn('Could not save to Firestore:', firestoreError);
      }

      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Google Sign In
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        provider: 'google',
        role: 'user', // Default role
        createdAt: new Date().toISOString()
      };

      // Save to backend API
      try {
        await saveUserToBackend(userData);
      } catch (backendError) {
        console.error('Failed to save to backend:', backendError);
      }

      // Try to save user data to Firestore, but don't fail if offline
      try {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        // If user doesn't exist, save to Firestore
        if (!userDoc.exists()) {
          await saveUserToFirestore(user.uid, userData);
        }
      } catch (firestoreError) {
        // Log the error but don't prevent login
        console.warn('Could not save to Firestore (possibly offline):', firestoreError);
      }

      return user;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    userRole,
    register,
    login,
    logout,
    signInWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
