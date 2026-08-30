'use client';

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { SigninFormSchema, SigninFormInputs } from '@/app/_lib/definitions';
import { zodResolver } from '@hookform/resolvers/zod';
import { signin } from './action';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Define properties for the SubmitButton component
interface SubmitButtonProps {
  isSubmitting: boolean;
}

// Define properties for the SignInForm component
interface SigninFormProps {
  router: ReturnType<typeof useRouter>;
}

// Main SignInForm component for user authentication
export function SignInForm({ router }: SigninFormProps) {
  // Initialize React Hook Form with schema-based validation using zod
  const {
    register, // Register fields for form handling
    handleSubmit,
    formState: { errors, isSubmitting }, // Access form state like errors and submission status
    setError,
  } = useForm<SigninFormInputs>({
    resolver: zodResolver(SigninFormSchema), // Use zod schema for validation
  });

  // Handler function for form submission
  const onSubmit: SubmitHandler<SigninFormInputs> = async (data) => {
    try {
      // Attempt to sign in the user with provided data
      const response = await signin(data);

      // If server returns validation errors, map them to fields
      if (response && response.errors) {
        Object.entries(response.errors).forEach(([field, messages]) => {
          const messageArray = messages as string[];
          setError(field as keyof SigninFormInputs, {
            type: 'server',
            message: messageArray.join(', '),
          });
        });
      } else {
        // Redirect to admin page on successful login
        router.push('/admin');
      }
    } catch (error) {
      console.error('Signin Error:', error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image src="/MonashUniversity.png" alt="Organisation Icon" width={100} height={100} className="mx-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-customBlue_700">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                type="username"
                {...register('username', { required: 'Email is required' })}
                placeholder="username"
                aria-invalid={errors.username ? 'true' : 'false'}
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.username && (
                <p role="alert" className="text-red-600">
                  {errors.username.message?.toString()}
                </p>
              )}
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                {...register('password', { required: 'Password is required' })}
                aria-invalid={errors.password ? 'true' : 'false'}
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && (
                <p role="alert" className="text-red-600">
                  {errors.password.message?.toString()}
                </p>
              )}
            </div>
          </div>

          <div>
            <SubmitButton isSubmitting={isSubmitting} />
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          New to us?
          <a href="/signup" className="font-semibold leading-6 text-customBlue_300 hover:text-monashBlue">
            {' '}
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}

function SubmitButton({ isSubmitting }: SubmitButtonProps) {
  return (
    <button
      disabled={isSubmitting}
      type="submit"
      className="flex w-full justify-center rounded-md bg-monashBlue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-customBlue_500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {isSubmitting ? 'Signing In...' : 'Sign In'}
    </button>
  );
}
