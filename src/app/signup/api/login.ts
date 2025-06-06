import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@/lib/client';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { User } from '@/app/global/types';
import { cookies } from 'next/headers';

const client = new OAuth2Client();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECURE_COOKIE = process.env.JWT_SECURE_COOKIE;

type ResponseData = {
  message?: string;
  user?: User;
  error?: string;
  details?: unknown;
};

export async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    const { credential, client_id } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });
    const payload = ticket.getPayload();

    if (!payload) {
      throw new Error('Invalid Google ID token');
    }

    const { email, given_name, family_name, picture } = payload;

    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      // If user does not exist, create a new user
      user = await prisma.user.create({
        data: {
          email: email,
          name: `${given_name} ${family_name}`,
          picture: picture || '',
        },
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET!,
      {
        expiresIn: '1h', // Adjust expiration time as needed
      }
    );

    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: JWT_SECURE_COOKIE === 'true', // Set to true in production when using HTTPS
      maxAge: 3600000, // 1 hour in milliseconds
    });

    res
      .status(200)
      .json({ message: 'Authentication successful', user });

  } catch (error: unknown) {
    console.error('Error verifying Google login:', error);
    res.status(400).json({ error: 'Authentication failed', details: error });
  }
}