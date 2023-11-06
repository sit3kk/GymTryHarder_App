
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/components/Tabs';
import Login from './src/components/Login';

function App(): JSX.Element {
  return (
      <Login />
  );
}
export default App;

/*
<NavigationContainer>
        <Tabs />
</NavigationContainer>
*/
