import React from 'react';
import { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import Layout from '../components/Layout';
import '../public/assets/styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default MyApp;
