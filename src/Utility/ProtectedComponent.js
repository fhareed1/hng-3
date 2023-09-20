import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
// import { SIGNIN } from '../Router/Router';
// import { onAuthStateChanged } from 'firebase/auth';
// import Loader from '../components/Loader';

import { useAuthState } from 'react-firebase-hooks/auth';
import { SIGNIN } from '../Router/Router';

const ProtectedComponent = ({ children }) => {
  const [user, loading, ] = useAuthState(auth);

  if (!user && !loading) {
    return <Navigate to={SIGNIN} />;
  }

  return <>{children}</>;
};

export default ProtectedComponent;
