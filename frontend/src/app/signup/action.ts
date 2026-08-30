'use server';

import { SignupFormSchema, SignupFormInputs } from '@/app/_lib/definitions';

// Define response format for the signup function
interface SignupResponse {
  errors?: Partial<Record<keyof SignupFormInputs, string[]>>;
  message?: string;
}

// Handles the signup process by validating form inputs and sending a request to the backend
export async function signup(data: SignupFormInputs): Promise<SignupResponse | void> {
  // Validate Fields
  // Validate input fields using the signup schema
  const validationResult = SignupFormSchema.safeParse(data);

  // If validation fails, return specific field errors
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  // Extract validated data fields
  const { username, email, password } = validationResult.data;
  console.log(password);

  try {
    // Send a POST request to the API for user registration
    const response = await fetch('http://127.0.0.1:8000/api/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, email, password }),
    });

    // Check if the signup request was successful
    if (response.ok) {
      return;
    } else {
      // Handle server errors, such as duplicate account or validation issues
      const errorData = await response.json();
      return {
        errors: errorData,
      };
    }
  } catch (error) {
    // Handle network or unexpected errors
    console.error('Signup Error:', error);
    return {
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}

// Handles the logout process by sending a request to the backend to clear the user session
export async function logout(): Promise<void> {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/logout/', {
      method: 'POST',
      credentials: 'include', // Include cookies if necessary
    });

    // Check if the logout request was unsuccessful
    if (!response.ok) {
      console.error('Logout failed.');
    }
  } catch (error) {
    // Handle network or unexpected errors
    console.error('Logout Error:', error);
  }
}
