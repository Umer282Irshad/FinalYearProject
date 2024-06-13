import { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import AppLoading from './screens/AppLoading';
import Navigator from './routes/signInUp_Stack';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';

// Custom fonts
const customFonts = {
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf')
};

// Main App 
export default function App() {
  LogBox.ignoreAllLogs()
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Loading screen
  useEffect(() => {
    async function loadFontsAndHideSplash() {
      try {
        await Font.loadAsync(customFonts); // Load custom fonts
        await SplashScreen.hideAsync(); // Hide splash screen
        setFontsLoaded(true); // Set fontsLoaded to true after fonts are loaded
      } catch (error) {
        console.error('Error loading fonts and hiding splash screen:', error);
      }
    }
    loadFontsAndHideSplash();
  }, []);

  // Logic for showing different screens
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>

        <Navigator />
      </NavigationContainer>
    )
  }
}
