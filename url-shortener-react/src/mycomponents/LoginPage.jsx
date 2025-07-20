import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import CustomInputField from './CustomInputField';
import api from '../Apis/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useCustomContext } from '../ContextApi/contextApi'; 

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
const navigate=useNavigate();
const {setToken}=useCustomContext(); 
  const onSubmit = async(data) => {
    try {
      
      const response = await api.post('/api/auth/public/login', data);
      console.log('Login successful:', response.data.token);
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token); // Update context with the new token

      reset();
      navigate('/'); 
      toast.success('login successful! Redirecting to dashboard...');
    } catch (error) {
      console.error('login failed:', error);
      toast.error('login failed. Please try again.');
    } 
  
  };
  return (
    <div className="mx-auto mt-24 max-w-md mb-8">
  
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-200 via-purple-200 to-red-200/60 p-8 shadow-xl backdrop-blur-sm">
        <h1 className="mb-6 text-center text-3xl font-extrabold text-blue-600">
       LogIn to your account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <CustomInputField
            name="username"
            label="Username"
            placeholder="john_doe"
            minLength={3}
            required
            register={register}
            errors={errors}
          />

          
          <CustomInputField
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            minLength={6}
            required
            register={register}
            errors={errors}
          />

          <button
            disabled={isSubmitting}
            className="w-full rounded-md bg-purple-600 py-2 font-semibold text-white shadow-sm transition hover:bg-purple-700 hover:shadow-lg"
          >
            {isSubmitting ? 'Logging in' : 'Log in'}
          </button>
        </form>

        {/* Switch to login */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-blue-600 underline-offset-2 hover:underline"
          >
            Register 
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
