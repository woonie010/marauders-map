'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { signup } from '@/app/signup/action';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormSchema, SignupFormInputs } from '@/app/_lib/definitions';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface SubmitButtonProps {
  isSubmitting: boolean;
}

interface SignupFormProps {
  router: ReturnType<typeof useRouter>; // Specify the type for router
}

export function SignupForm({ router }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },  // Form error and submission states
    setError,
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(SignupFormSchema), // Uses Zod schema to validate inputs
  });

  // Handler for form submission
  const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
    try {
      const response = await signup(data); // Calls signup action

      // Handle field-specific server errors
      if (response && response.errors) {
        Object.entries(response.errors).forEach(([field, messages]) => {
          const messageArray = messages as string[];
          setError(field as keyof SignupFormInputs, {
            type: 'server',
            message: messageArray.join(', '),
          });
        });
      } else {
        router.push('/admin'); // Redirect on successful signup
      }
    } catch (error) {
      console.error('Signup Error:', error); // Logs any unexpected errors
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image src="/MonashUniversity.png" alt="Organisation Icon" width={100} height={100} className="mx-auto" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-customBlue_700">
          Sign up for your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
              User Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                {...register('username', { required: 'Name is required' })}
                placeholder="Name"
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

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="Email"
                aria-invalid={errors.email ? 'true' : 'false'}
                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && (
                <p role="alert" className="text-red-600">
                  {errors.email.message?.toString()}
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
                <div role="alert" className="text-red-600">
                  <p>Password must:</p>
                  <ul>
                    {errors.password.message
                      ?.toString()
                      .split(',')
                      .map((error, index) => <li key={index}>- {error.trim()}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div>
            <SubmitButton isSubmitting={isSubmitting} />
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?
          <a href="#" className="font-semibold leading-6 text-customBlue_300 hover:text-monashBlue">
            {' '}
            Sign in to your account
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
      {isSubmitting ? 'Signing Up...' : 'Sign Up'}
    </button>
  );
}
