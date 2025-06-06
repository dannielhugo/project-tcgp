'use client'

import { User } from '@/app/global/types';
import { CredentialResponse, GoogleLogin, googleLogout, TokenResponse, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Signup() {
  const [user, setUser] = useState<User | null>(null);

  const onSuccessHandler = async (codeResponse: CredentialResponse) => {
    const response = await axios.post<User>('/api/signup', {
      credential: codeResponse.credential,
      client_id: codeResponse.clientId
    });
    setUser(response.data);
    console.log('Login Success:', response.data);
  }
  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setUser(null);
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {user ? (
        <div>
          <Image
            src={user.picture}
            alt="user image"
            width={60}
            height={60}
          />
          <h3>User Logged in</h3>
          <p>Name: {user.name}</p>
          <p>Email Address: {user.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={onSuccessHandler}
          onError={() => console.log('Login Failed:')}
        />
      )}
    </div>
  );
}