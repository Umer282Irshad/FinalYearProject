import * as React from 'react';
import { Text, View} from 'react-native';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import logo from '../assets/electric_vehicle_logo.png';
import Inventory from '../screens/Inventory';

const Stack = createNativeStackNavigator();

function Inventory_Stack() {
  return (
      <Stack.Navigator
        screenOptions= {{headerStyle:{
                backgroundColor:'#888'
            },
            headerTintColor: '#ddd',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize:24
            },
        }}>
        <Stack.Screen name="Inventory" component={Inventory}/>
      </Stack.Navigator>
  );
}

export default Inventory_Stack;