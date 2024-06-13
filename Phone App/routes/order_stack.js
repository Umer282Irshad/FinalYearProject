import * as React from 'react';
import { Text, View} from 'react-native';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import logo from '../assets/electric_vehicle_logo.png';
import Orders from '../screens/orders';

const Stack = createNativeStackNavigator();

function Order_Stack() {
  return (
      <Stack.Navigator
        screenOptions= {{headerStyle:{
                backgroundColor:'#2bcc'
            },
            headerTintColor: '#ddd',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize:24
            },
        }}>
        <Stack.Screen name="orders" component={Orders}/>
      </Stack.Navigator>
  );
}

export default Order_Stack;