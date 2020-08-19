import React, { createContext, useEffect, useState } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase";
import "firebase/auth";

export const AppContext = createContext(null);

var firebaseConfig = {
  apiKey: "AIzaSyA3PNa6vUojS07RvYi3ib-my-AT6q0hAao",
  authDomain: "user-app-55598.firebaseapp.com",
  databaseURL: "https://user-app-55598.firebaseio.com",
  projectId: "user-app-55598",
  storageBucket: "user-app-55598.appspot.com",
  messagingSenderId: "591991425352",
  appId: "1:591991425352:web:75a00b82f60c9683290b7d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();
const providers = { googleProvider: new firebase.auth.GoogleAuthProvider() };

const AppProvider = ({ children, signInWithGoogle, signOut, user }) => {
  const [appUser, setAppUser] = useState({});

  const handleSignOut = () => {
    signOut();
    setAppUser({});
  };

  useEffect(() => {
    if (user)
      setAppUser({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
  }, [user]);
  return (
    <AppContext.Provider value={{ appUser, signInWithGoogle, handleSignOut }}>
      {children}
    </AppContext.Provider>
  );
};

export default withFirebaseAuth({ providers, firebaseAppAuth })(AppProvider);
