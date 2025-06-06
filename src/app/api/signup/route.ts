import { PrismaClient } from '@/lib/client';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const client = new OAuth2Client();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECURE_COOKIE = process.env.JWT_SECURE_COOKIE;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { credential, client_id } = body;

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
      { userId: user.id, email: user.email },
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

    return new Response(JSON.stringify(user), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error verifying Google login:', error);

    return new Response(JSON.stringify({ error: 'Authentication failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}