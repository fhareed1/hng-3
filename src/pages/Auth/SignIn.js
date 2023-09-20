import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ROOT, SIGNUP } from '../../Router/Router';
import { auth } from '../../firebase/firebaseConfig';
import { useState } from 'react';
import Loader from '../../components/Loader';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signIn = (e) => {
    setLoading(true);
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setTimeout(() => {
          setLoading(false);
          navigate(ROOT);
        }, 3000);

        toast('Successfully Signed In', {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => {
        console.log(error.message);

        const errorMessage = error.message;
        const errorCode = errorMessage.split('(auth/')[1].split(')')[0];

        console.log(errorCode);

        toast(`Error: ${errorCode}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <img
              className='mx-auto h-10 w-auto'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
              alt='Your Company'
            />
            <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
              Sign in to your account
            </h2>
          </div>

          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form className='space-y-6' onSubmit={signIn}>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Password
                  </label>
                  <div className='text-sm'>
                    <Link
                      to='#'
                      className='font-semibold text-indigo-600 hover:text-indigo-500'
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className='mt-2'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className='mt-10 text-center text-sm text-gray-500'>
              Not a User?
              <Link
                to={SIGNUP}
                className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
