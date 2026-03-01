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
          const url = `https://quick-hire-server-side-jmmo.vercel.app/users/${user.uid}`;
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
             console.log('=== ROLE SOURCE COMPARISON ===');
             console.log('MongoDB (Live):', role);
             
             // Get the role from the token itself for comparison
             const token = await user.getIdTokenResult();
             console.log('Firebase Token Claim:', token.claims.role || 'none (default: user)');
             
             if (role !== token.claims.role && token.claims.role !== undefined) {
               console.warn('⚠️ ROLE MISMATCH: MongoDB says "' + role + '" but your Token still says "' + token.claims.role + '".');
               console.warn('This is because the token is a snapshot. Follow the steps in implementation_plan.md to set Custom Claims on the backend!');
             }
             
             setUserRole(role);
           } else if (response.status === 404) {
             console.log('User not found in backend (404)');
             console.log('Attempting to create user...');
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
               console.warn('Could not auto-create user in backend:', saveError.message);
               console.log('This usually means the backend POST /users route is missing or broken.');
               setUserRole('user');
             }
           } else {
             console.error('Failed to fetch user data, status:', response.status);
             setUserRole('user');
           }
         } catch (error) {
           console.error('Error fetching user role:', error);
           setUserRole('user');
         }
       } else {
         setUser(null);
         setUserRole('user');
       }
       setLoading(false);
     });

    return () => unsubscribe();
  }, []);

  const refreshRole = async () => {
    if (!auth.currentUser) return;
    
    try {
      // Force Firebase token refresh to get latest custom claims if any
      await auth.currentUser.getIdToken(true);
      
      const url = `https://quick-hire-server-side-jmmo.vercel.app/users/${auth.currentUser.uid}`;
      const response = await fetch(url);
      if (response.ok) {
        const userData = await response.json();
        const role = userData.role || 'user';
        setUserRole(role);
        return role;
      }
    } catch (error) {
      console.error('Error refreshing role:', error);
    }
  };

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
      const response = await fetch('https://quick-hire-server-side-jmmo.vercel.app/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('POST /users response status:', response.status);

      if (!response.ok) {
        if (response.status === 409) {
          console.log('User already exists in backend');
          return;
        }
        
        const errorText = await response.text();
        // Check if it's an HTML error page (commonly returned by Express/Vercel on 404)
        const isHtml = errorText.includes('<!DOCTYPE html>') || errorText.includes('<html>');
        const errorMessage = isHtml ? 'Backend route not found (404). Check if POST /users exists.' : errorText;
        
        console.error(`Backend error (${response.status}):`, errorMessage);
        throw new Error(`Failed to save user to backend: ${response.status} - ${errorMessage}`);
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
    refreshRole,
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
