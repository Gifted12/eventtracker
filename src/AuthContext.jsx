import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, googleProvider } from './firebase';

const AuthContext = createContext();

const POKEMON_MAX = 898;

const getRandomPokemonUrl = async () => {
  const id = Math.floor(Math.random() * POKEMON_MAX) + 1;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!response.ok) throw new Error('Failed to load Pokemon avatar');
  const data = await response.json();
  return data.sprites?.front_default || data.sprites?.other?.['official-artwork']?.front_default || null;
};

const ensurePokemonAvatar = async (user) => {
  if (!user || user.photoURL) return user?.photoURL || null;
  const photoURL = await getRandomPokemonUrl();
  if (!photoURL) return null;
  await user.updateProfile({ photoURL });
  const updatedUser = auth.currentUser;
  return updatedUser?.photoURL || photoURL;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        if (!user.photoURL) {
          try {
            await ensurePokemonAvatar(user);
            const refreshed = auth.currentUser;
            setCurrentUser(refreshed || user);
          } catch (error) {
            console.error('Pokemon avatar failed', error);
            setCurrentUser(user);
          }
        } else {
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password, name) => {
    const result = await auth.createUserWithEmailAndPassword(email, password);
    if (result.user) {
      const profileUpdates = { displayName: name || result.user.email.split('@')[0] };
      const photoURL = await getRandomPokemonUrl();
      if (photoURL) {
        profileUpdates.photoURL = photoURL;
      }
      await result.user.updateProfile(profileUpdates);
      const updatedUser = auth.currentUser;
      setCurrentUser(updatedUser || result.user);
    }
    return result;
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const googleSignIn = () => {
    return auth.signInWithPopup(googleProvider);
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    googleSignIn
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};