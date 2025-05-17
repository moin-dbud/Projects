import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User } from 'lucide-react';
import { SignUpCredentials, UserRole } from '../../types';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Link } from 'react-router-dom';

export const SignupForm: React.FC = () => {
  const { signup, isLoading, error } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpCredentials>();
  
  const roleOptions = [
    { value: 'admin', label: 'Administrator' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'student', label: 'Student' },
    { value: 'parent', label: 'Parent' },
  ];

  const onSubmit = async (data: SignUpCredentials) => {
    await signup(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          leftIcon={<User size={18} />}
          error={errors.firstName?.message}
          {...register('firstName', { required: 'First name is required' })}
          placeholder="John"
        />
        
        <Input
          label="Last Name"
          leftIcon={<User size={18} />}
          error={errors.lastName?.message}
          {...register('lastName', { required: 'Last name is required' })}
          placeholder="Doe"
        />
      </div>
      
      <Input
        label="Email Address"
        type="email"
        leftIcon={<Mail size={18} />}
        error={errors.email?.message}
        {...register('email', { 
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        })}
        placeholder="youremail@example.com"
      />
      
      <Input
        label="Password"
        type="password"
        leftIcon={<Lock size={18} />}
        error={errors.password?.message}
        {...register('password', { 
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        })}
        placeholder="••••••••"
      />
      
      <Select
        label="Role"
        options={roleOptions}
        error={errors.role?.message}
        {...register('role', { required: 'Role is required' })}
      />
      
      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          required
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          I accept the <a href="#" className="text-blue-600 hover:text-blue-800">Terms and Conditions</a>
        </label>
      </div>
      
      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
      >
        Create Account
      </Button>
      
      <div className="text-sm text-center text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:text-blue-800">
          Sign in
        </Link>
      </div>
    </form>
  );
};