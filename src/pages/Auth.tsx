import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const location = useLocation();
  const [authOption, setAuthOption] = useState<'signIn' | 'signUp'>('signIn');

  useEffect(() => {
    if (location.state?.authOption) {
      setAuthOption(location.state.authOption);
    }
  }, [location.state]);

  return (
    <section className='min-h-screen flex justify-center items-center bg-neutral-25'>
      <div className='flex-1 h-full overflow-hidden hidden md:flex'>
        <img
          src='/images/auth-front.png'
          alt='Auth Food Background'
          loading='lazy'
          className='h-screen w-full object-center object-cover'
        />
      </div>

      <div className='flex items-center justify-center flex-1 w-full'>
        <Card className='max-w-[347px] flex flex-col gap-4 md:gap-5 w-full'>
          <CardHeader className='flex flex-col gap-4 md:gap-5'>
            <CardTitle className='flex gap-3 md:gap-4 items-center'>
              <img
                src='/icon/logo.svg'
                alt='logo'
                className='h-8 w-8 md:h-[42px] md:w-[42px]'
              />
              <span className='font-extrabold text-display-lg md:text-display-md text-neutral-950'>
                Foody
              </span>
            </CardTitle>

            <CardDescription className='flex flex-col'>
              <span className='font-extrabold text-display-lg md:text-display-md text-neutral-950'>
                Welcome Back
              </span>
              <span className='font-medium text-sm md:text-md text-neutral-950'>
                Good to see you again! Let’s eat
              </span>
            </CardDescription>

            <CardContent className='flex flex-col gap-4 md:gap-5 w-full'>
              <div className='h-12 md:h-[56px] w-full rounded-[16px] flex items-center p-2 gap-2 bg-neutral-100 '>
                <Button
                  onClick={() => setAuthOption('signIn')}
                  variant='blank'
                  size='blank'
                  className={cn(
                    'flex-1 h-full',
                    authOption === 'signIn'
                      ? 'font-bold text-neutral-950 bg-white shadow-[0_0_20px_0_#CBCACA40]'
                      : 'font-medium text-neutral-600'
                  )}
                >
                  Sign in
                </Button>
                <Button
                  onClick={() => setAuthOption('signUp')}
                  variant='blank'
                  size='blank'
                  className={cn(
                    'flex-1 h-full',
                    authOption === 'signUp'
                      ? 'font-bold text-neutral-950 bg-white shadow-[0_0_20px_0_#CBCACA40]'
                      : 'font-medium text-neutral-600'
                  )}
                >
                  Sign up
                </Button>
              </div>

              {authOption === 'signIn' && <SignInForm />}
              {authOption === 'signUp' && <SignUpForm />}
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
};

export default Auth;

const SignInForm = () => {
  const { login, error, success, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    if (success.login) {
      navigate('/');
    }
  }, [success.login, navigate]);

  useEffect(() => {
    if (error.login) {
      console.log(error.login);
      setErrorMsg('Incorrect Email/Password');
    }
  }, [error.login]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please fill all fields');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long');
      return;
    }

    if (rememberMe) {
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('email');
    }

    const data = {
      email: email,
      password: password,
    };

    login(data);
  };

  return (
    <form onSubmit={handleLogin} className='flex flex-col gap-4 md:gap-5'>
      {/* Email */}
      <div className='w-full relative'>
        <Input
          type='email'
          placeholder='Email'
          name='email'
          value={email}
          disabled={loading.login}
          onChange={(e) => setEmail(e.target.value)}
          className='peer h-12 md:h-[56px] font-semibold text-sm md:text-md text-neutral-950 placeholder-shown:pt-1 pt-5'
        />
        <label className='absolute left-3 top-1 text-xs text-neutral-500 transition-all opacity-0 peer-placeholder-shown:opacity-0 peer-not-placeholder-shown:opacity-100'>
          Email
        </label>
      </div>

      {/* Password */}
      <div className='w-full relative'>
        <Input
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          disabled={loading.login}
          onChange={(e) => setPassword(e.target.value)}
          className='peer h-12 md:h-[56px] font-semibold text-sm md:text-md text-neutral-950 placeholder-shown:pt-1 pt-5'
        />
        <label className='absolute left-3 top-1 text-xs text-neutral-500 transition-all opacity-0 peer-placeholder-shown:opacity-0 peer-not-placeholder-shown:opacity-100'>
          Password
        </label>
      </div>

      {/* Remember Me */}
      <label className='flex items-center gap-2'>
        <input
          type='checkbox'
          name='rememberMe'
          checked={rememberMe}
          disabled={loading.login}
          onChange={(e) => setRememberMe(e.target.checked)}
          className='h-5 w-5 rounded-[6px] border border-neutral-300 accent-primary-100'
        />
        <span className='font-medium text-sm md:text-md text-neutral-950'>
          Remember Me
        </span>
      </label>

      {/* Error */}
      {errorMsg && (
        <p className='font-medium text-sm md:text-md text-primary-100'>
          {errorMsg}
        </p>
      )}

      {/* Button */}
      <Button type='submit'>
        {loading.login ? (
          <div className='h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin mx-auto' />
        ) : (
          'Login'
        )}
      </Button>
    </form>
  );
};

const SignUpForm = () => {
  const { register, error, success, loading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (success.register) {
      navigate('/');
    }
  }, [success.register, navigate]);

  useEffect(() => {
    if (error.register) {
      console.log(error.register);
      setErrorMsg('Incorrect Email/Phone Number');
    }
  }, [error.register]);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !email || !phoneNumber || !password || !confirmPassword) {
      setErrorMsg('Please fill all fields');
      return;
    }

    if (name.length < 3) {
      setErrorMsg('Name must be at least 2 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Password must match');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long');
      return;
    }

    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phoneNumber)) {
      setErrorMsg('Please provide a valid Indonesian phone number');
      return;
    }

    const data = {
      name: name,
      email: email,
      phone: phoneNumber,
      password: password,
    };

    register(data);
  };

  return (
    <form onSubmit={handleRegister} className='flex flex-col gap-4 md:gap-5'>
      {/* Name */}
      <div className='w-full relative'>
        <Input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          disabled={loading.register}
          onChange={(e) => setName(e.target.value)}
          className='peer h-12 md:h-[56px] font-semibold text-sm md:text-md text-neutral-950 placeholder-shown:pt-1 pt-5'
        />
        <label className='absolute left-3 top-1 text-xs text-neutral-500 transition-all opacity-0 peer-placeholder-shown:opacity-0 peer-not-placeholder-shown:opacity-100'>
          Name
        </label>
      </div>

      {/* Email */}
      <div className='w-full relative'>
        <Input
          type='email'
          placeholder='Email'
          name='email'
          value={email}
          disabled={loading.register}
          onChange={(e) => setEmail(e.target.value)}
          className='peer h-12 md:h-[56px] font-semibold text-sm md:text-md text-neutral-950 placeholder-shown:pt-1 pt-5'
        />
        <label className='absolute left-3 top-1 text-xs text-neutral-500 transition-all opacity-0 peer-placeholder-shown:opacity-0 peer-not-placeholder-shown:opacity-100'>
          Email
        </label>
      </div>

      {/* Phone Number */}
      <div className='w-full relative'>
        <Input
          type='text'
          placeholder='Phone Number'
          name='phoneNumber'
          value={phoneNumber}
          disabled={loading.register}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className='peer h-12 md:h-[56px] font-semibold text-sm md:text-md text-neutral-950 placeholder-shown:pt-1 pt-5'
        />
        <label className='absolute left-3 top-1 text-xs text-neutral-500 transition-all opacity-0 peer-placeholder-shown:opacity-0 peer-not-placeholder-shown:opacity-100'>
          Phone Number
        </label>
      </div>

      {/* Password */}
      <div className='w-full relative'>
        <Input
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          disabled={loading.register}
          onChange={(e) => setPassword(e.target.value)}
          className='peer h-12 md:h-[56px] font-semibold text-sm md:text-md text-neutral-950 placeholder-shown:pt-1 pt-5'
        />
        <label className='absolute left-3 top-1 text-xs text-neutral-500 transition-all opacity-0 peer-placeholder-shown:opacity-0 peer-not-placeholder-shown:opacity-100'>
          Password
        </label>
      </div>

      {/* Confirm Password */}
      <div className='w-full relative'>
        <Input
          type='password'
          placeholder='Confirm Password'
          name='confirmPassword'
          value={confirmPassword}
          disabled={loading.register}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='peer h-12 md:h-[56px] font-semibold text-sm md:text-md text-neutral-950 placeholder-shown:pt-1 pt-5'
        />
        <label className='absolute left-3 top-1 text-xs text-neutral-500 transition-all opacity-0 peer-placeholder-shown:opacity-0 peer-not-placeholder-shown:opacity-100'>
          Confirm Password
        </label>
      </div>

      {/* Error */}
      {errorMsg && (
        <p className='font-medium text-sm md:text-md text-primary-100'>
          {errorMsg}
        </p>
      )}

      {/* Button */}
      <Button type='submit'>
        {loading.register ? (
          <div className='h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin mx-auto' />
        ) : (
          'Register'
        )}
      </Button>
    </form>
  );
};
