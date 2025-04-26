import React from 'react';
import { GoogleLogin } from 'react-oauth/google';
import { MicrosoftLogin } from 'react-oauth/microsoft';

const CloudAuthButtons: React.FC = () => {
  const handleGoogleAuth = (response: any) => {
    console.log(response);
    // Implement Google OAuth logic here
    const { tokenId } = response;
    fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: tokenId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Google Auth Success:', data);
      })
      .catch((error) => {
        console.error('Google Auth Error:', error);
      });
  };

  const handleMicrosoftAuth = (response: any) => {
    console.log(response);
    // Implement Microsoft OAuth logic here
    const { accessToken } = response;
    fetch('/api/auth/microsoft', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: accessToken }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Microsoft Auth Success:', data);
      })
      .catch((error) => {
        console.error('Microsoft Auth Error:', error);
      });
  };

  return (
    <div className="cloud-auth-buttons">
      <GoogleLogin
        onSuccess={handleGoogleAuth}
        onError={() => {
          console.log('Google Login Failed');
        }}
      />
      <MicrosoftLogin
        clientId="YOUR_MICROSOFT_CLIENT_ID"
        authCallback={handleMicrosoftAuth}
      />
    </div>
  );
};

export default CloudAuthButtons;
