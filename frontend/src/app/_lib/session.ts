// src/app/_lib/session.ts

'use server';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Ensure that the SECRET environment variable is defined
if (!process.env.SECRET) {
  throw new Error('SECRET environment variable is not defined.');
}

// Define the payload structure with an index signature
export interface SessionPayload extends Record<string, any> {
  userId: string;
  role: string; // Added role
  expires: string; // ISO string format for dates
}

interface CookieConfig {
  name: string;
  options: {
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'lax' | 'strict' | 'none';
    path: string;
  };
  duration: number; // Duration in milliseconds
}

const sessionCookieConfig: CookieConfig = {
  name: 'session',
  options: {
    httpOnly: true,
    secure: true, // Set to true if on HTTPS
    sameSite: 'none', // Set to 'none' if different origins
    path: '/',
  },
  duration: 24 * 60 * 60 * 1000, // 1 day in milliseconds
};

const key = new TextEncoder().encode(process.env.SECRET);

// Function to encrypt payload into JWT
export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d') // Correct duration format
    .sign(key);
}

// Function to decrypt JWT into payload
export async function decrypt(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });

    return payload as SessionPayload;
  } catch (error) {
    console.error('JWT Decryption Error:', error);
    return null;
  }
}

// Function to create a new session
export async function createSession(userId: string, username: string, role: string): Promise<void> {
  const expiresDate = new Date(Date.now() + sessionCookieConfig.duration);
  const expiresString = expiresDate.toISOString();
  const sessionToken = await encrypt({ userId, username, role, expires: expiresString });

  cookies().set(sessionCookieConfig.name, sessionToken, {
    httpOnly: sessionCookieConfig.options.httpOnly,
    secure: sessionCookieConfig.options.secure,
    expires: expiresDate, // Cookie expects a Date object
    sameSite: sessionCookieConfig.options.sameSite,
    path: sessionCookieConfig.options.path,
  });
}

// Function to update an existing session's expiration
export async function updateSession(): Promise<void | null> {
  const sessionToken = cookies().get(sessionCookieConfig.name)?.value;
  const payload = sessionToken ? await decrypt(sessionToken) : null;

  if (!sessionToken || !payload) {
    return null;
  }

  const newExpiresDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Extend by 7 days
  const newExpiresString = newExpiresDate.toISOString();
  const updatedSessionToken = await encrypt({ userId: payload.userId, role: payload.role, expires: newExpiresString });

  cookies().set(sessionCookieConfig.name, updatedSessionToken, {
    httpOnly: sessionCookieConfig.options.httpOnly,
    secure: sessionCookieConfig.options.secure,
    expires: newExpiresDate, // Cookie expects a Date object
    sameSite: sessionCookieConfig.options.sameSite,
    path: sessionCookieConfig.options.path,
  });

  return;
}

// Function to verify the current session
export async function verifySession(): Promise<{ userId: string; username: string; role: string } | null> {
  const sessionCookieValue = cookies().get(sessionCookieConfig.name)?.value;
  const session = sessionCookieValue ? await decrypt(sessionCookieValue) : null;

  if (session) {
    return { userId: session.userId, username: session.username, role: session.role };
  }

  return null;
}

// Function to delete the current session
export async function deleteSession(): Promise<void> {
  cookies().delete(sessionCookieConfig.name);
  redirect('/signin');
}
