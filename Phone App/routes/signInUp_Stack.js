import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import Sign_In_Up from '../screens/sign_In_Up';
import SignIn from '../screens/signIn';
import SignUp from '../screens/signUp';
import Map from '../screens/map';
import logo from '../assets/electric_vehicle_logo.png';
import Inventory from '../screens/Inventory';
import Orders from '../screens/orders';
import Rating from '../screens/rating';
import EditProfile from '../screens/editProfile';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    const CustomDrawerContent = (props) => {
      return (
        <DrawerContentScrollView {...props} style={{ backgroundColor: '#3ec3cf'}}>
          <DrawerItemList {...props} />
          <DrawerItem
        label="Settings"
        style={{ color: 'white',justifyContent:'center'}}
      />
        </DrawerContentScrollView>
      );
    };
  
    return (
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0bcc',
          },
          headerTintColor: '#ddd',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={logo}
                style={{ width: 50, height: 40, marginRight: 10, marginTop: 5 }}
                resizeMode="contain"
              />
              <Text style={{ fontSize: 24, fontWeight: 'bold', fontFamily: 'nunito-bold', color: '#ddd', marginRight: 20 }}>SmartCart</Text>
            </View>
          ),
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        drawerContentOptions={{
            labelStyle: {
              color: 'red', // Change the color of the screen names
              fontSize: 18, // Optional: Adjust the font size
            },
            drawerLabelStyle: {
                color: 'red', // Change the color here
                // Add more styles as needed
              }
          }}
      >
        <Drawer.Screen name="Map_Drawer" component={Map} options={{ title: 'Map' }} />
        <Drawer.Screen name="Profile_Drawer" component={EditProfile} options={{ title: 'Profile' }} />
        <Drawer.Screen name="Orders_Drawer" component={Orders} options={{ title: 'Orders' }} />
        <Drawer.Screen name="Inventory_Drawer" component={Inventory} options={{ title: 'Inventory' }} />
        <Drawer.Screen name="Rating_Drawer" component={Rating} options={{ title: 'Ratings/Orders' }} />
      </Drawer.Navigator>
    );
  };
  

const Stack = createNativeStackNavigator();

function SmartCart() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0bcc',
        },
        headerLeft: null,
        headerTintColor: '#ddd',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 24,
        },
        headerTitleAlign: 'center',
        headerTitle: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={logo}
              style={{ width: 50, height: 40, marginRight: 10, marginTop: 5 }}
              resizeMode="contain"
            />
            <Text style={{ fontSize: 24, fontWeight: 'bold', fontFamily: 'nunito-bold', color: '#ddd', marginRight: 20 }}>SmartCart</Text>
          </View>
        ),
      }}
    >
      <Stack.Screen name="SmartCart" component={Sign_In_Up} options={{ title: 'Home', headerLeft: null }} />
      <Stack.Screen name="Sign In" component={SignIn} options={{ title: 'Logging In', headerLeft: null }} />
      <Stack.Screen name="Sign Up" component={SignUp} options={{ title: 'Create Account', headerLeft: null }} />
      <Stack.Screen name="Map" component={DrawerNavigator} options={{ title: 'Map', headerShown: false }} />
    </Stack.Navigator>
  );
}

export default SmartCart;
