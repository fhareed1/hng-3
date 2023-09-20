import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { SIGNIN } from '../Router/Router';
import { onAuthStateChanged } from 'firebase/auth';
// import Loader from '../components/Loader';

const ProtectedComponent = ({ children }) => {
  const [authUser, setAuthUser] = useState(null); // Use null as the initial state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user); // Set the user object
      } else {
        setAuthUser(null); // User is not signed in
      }
    });

    // Cleanup the subscription to avoid memory leaks
    return () => unsubscribe();
  }, []);

  // While waiting for the auth state to resolve, you can return a loading indicator or null
  if (authUser === null) {
    return null; // or return a loading indicator
  }

  // If authUser is null, the user is not signed in, so redirect to the sign-in page
  if (!authUser) {
    return <Navigate to={SIGNIN} />;
  }

  // If authUser is not null, the user is signed in, so render the children
  return <>{children}</>;
};

export default ProtectedComponent;
