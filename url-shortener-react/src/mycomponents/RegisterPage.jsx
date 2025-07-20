import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import CustomInputField from './CustomInputField';
import api from '../Apis/api'; 
import { toast } from 'react-hot-toast';



// Put this at the top of RegisterForm.jsx just once:
console.log('VITE_API_URL at runtime =', import.meta.env.VITE_API_URL);
console.log('Axios baseURL =', api.defaults.baseURL);

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const navigate=useNavigate();

  const onSubmit = async(data) => {
    try {
      
      const response = await api.post('/api/auth/public/register', data);
      console.log('Registration successful:', response.data);  
      reset();
      navigate('/login'); 
      toast.success('Registration successful! Redirecting to login...');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
    } 
  
  };

  return (
    <div className="mx-auto mt-24 max-w-md mb-8">
      {/* Card */}
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-blue-200 via-purple-200 to-red-200/60 p-8 shadow-xl backdrop-blur-sm">
        <h1 className="mb-6 text-center text-3xl font-extrabold text-blue-600">
          Create an account
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
            name="email"
            type="email"
            label="Email"
            placeholder="you@example.com"
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
            {isSubmitting ? 'Registering…' : 'Register'}
          </button>
        </form>

        {/* Switch to login */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-blue-600 underline-offset-2 hover:underline"
          >
            Sign&nbsp;in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
