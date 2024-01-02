
import React, { useEffect } from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigation from './src/navigation/AppNavigation';
import { initializeSslPinning } from 'react-native-ssl-public-key-pinning';


function App(): JSX.Element {
  useEffect(() => {
    const configureSslPinning = async () => {
      try {
        await initializeSslPinning({
          'https://3.121.219.180': {
            includeSubdomains: true,
            publicKeyHashes: [
              "Upmz83F2acKWXA+7W9WVxADNxAvhiAobLZhoQvnBEsI=",
              "Upmz83F2acKWXA+7W9WVxADNxAvhiAobLZhoQvnBEsI="
            ],
          },
        });
        console.log('SSL Pinning configured successfully');
      } catch (error) {
        console.error('Error configuring SSL Pinning', error);
      }
    };

    configureSslPinning();
  }, []);

  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}
export default App;

