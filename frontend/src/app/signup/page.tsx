'use client';

import React from 'react';
import { SignupForm } from '@/app/signup/signup-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex justify-center items-center p-5">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

        <SignupForm router={router} />

        <div className="text-center mt-4">
          Already have an account? <Link href="/signin"></Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
