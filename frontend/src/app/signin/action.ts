'use server';

import { SigninFormSchema, SigninFormInputs } from '@/app/_lib/definitions';
import { createSession } from '../_lib/session';

// Define response format for the signin function
interface SigninResponse {
  errors?: Partial<Record<keyof SigninFormInputs, string[]>> & { general?: string[] };
  message?: string;
}

export async function signin(data: SigninFormInputs): Promise<SigninResponse | void> {
  // Validate Fields
  // Validate input fields using schema
  const validationResult = SigninFormSchema.safeParse(data);

  // If validation fails, return specific field errors
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // Destructure validated fields
  const { username, password } = validationResult.data;

  try {
    // Send a POST request to the API for user authentication
    const response = await fetch('http://127.0.0.1:8000/api/signin/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include', // Include cookies if necessary
    });

    // If the response is successful, handle session creation
    if (response.ok) {
      const responseData = await response.json();

      const { userId, username, role } = responseData;

      // Create session if userId is present
      if (userId) {
        await createSession(userId, username, role);
      } else {
        return {
          errors: { general: ['Invalid response from server.'] },
        };
      }

      return;
    } else {
      // Handle server errors, e.g., invalid credentials
      const errorData = await response.json();
      return {
        errors: errorData.errors || { error: 'Unknown error occurred' }, // Adjusting error handling
      };
    }
  } catch (error) {
    // Handle network or unexpected errors
    console.error('Signin Error:', error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}
