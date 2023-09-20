import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProtectedComponent from '../Utility/ProtectedComponent';

import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
// import { ToastContainer } from 'react-toastify';

export const ROOT = '';
export const SIGNIN = 'signin';
export const SIGNUP = 'signup';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: ROOT,
      element: (
        <ProtectedComponent>
          <HomePage />
        </ProtectedComponent>
      ),
    },
    {
      path: SIGNIN,
      element: <SignIn />,
    },
    {
      path: SIGNUP,
      element: <SignUp />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default Router;
