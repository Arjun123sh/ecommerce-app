import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, firestore } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { AuthContextType, AuthUser } from '@/types/types';

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const basicUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
        };
        setUser(basicUser);
        updateUserData(firebaseUser.uid);
        router.replace('/(tabs)');
      } else {
        setUser(null);
        router.replace('/');
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      console.log(msg);

      if (msg === 'Firebase: Error (auth/invalid-credential).') msg = 'Wrong credentials';
      if (msg === 'Firebase: Error (auth/user-not-found).') msg = 'User not found';
      if (msg === 'Firebase: Error (auth/wrong-password).') msg = 'Wrong password';
      if (msg === 'Firebase: Error (auth/too-many-requests).') msg = 'Too many requests';
      if (msg === 'Firebase: Error (auth/invalid-email).') msg = 'Invalid email';

      return { success: false, msg };
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    phone: string
  ) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, 'users', response.user.uid), {
        name,
        email,
        uid: response.user.uid,
        phone,
      });
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      if (msg === 'Firebase: Error (auth/email-already-in-use).') msg = 'Email already in use';
      if (msg === 'Firebase: Error (auth/invalid-email).') msg = 'Invalid email';
      return { success: false, msg };
    }
  };

  const updateUserData = async (uid: string) => {
    try {
      const docRef = doc(firestore, 'users', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData: AuthUser = {
          uid: data.uid,
          email: data.email || null,
          name: data.name || null,
          image: data.image || null,
          phone: data.phone || undefined,
        };
        setUser(userData);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
