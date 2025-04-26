import React from 'react';
import { GoogleLogin } from 'react-oauth/google';
import { MicrosoftLogin } from 'react-oauth/microsoft';

const CloudAuthButtons: React.FC = () => {
  const handleGoogleAuth = (response: any) => {
    console.log(response);
    // Implement Google OAuth logic here
  };

  const handleMicrosoftAuth = (response: any) => {
    console.log(response);
    // Implement Microsoft OAuth logic here
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
