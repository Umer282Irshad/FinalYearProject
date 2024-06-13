import { createDrawerNavigator } from '@react-navigation/drawer';
import Order_Stack from './order_stack';
import Inventory_Stack from './inventory_stack';
import SmartCart_Stack from './signInUp_Stack';
import { NavigationContainer } from '@react-navigation/native';
import { Text, View} from 'react-native';
import { Image } from 'react-native';
import logo from '../assets/electric_vehicle_logo.png';


const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <NavigationContainer>
    <Drawer.Navigator
    screenOptions= {{headerStyle:{
        backgroundColor:'#2bcc'
    },
    headerTintColor: '#ddd',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize:24
    },
    headerTitleAlign: 'center',
    headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center'}}>
        <Image
            source={logo}
            style={{ width: 50, height: 40, marginRight: 10,marginTop:5}}
            resizeMode="contain"
        />
        <Text style={{ fontSize: 24, fontWeight: 'bold',fontFamily: 'nunito-bold', color: '#ddd',marginRight:20 }}>SmartCart</Text>
        </View>
  ),
    }}
    >
      <Drawer.Screen name="Home" component={SmartCart_Stack} />
      <Drawer.Screen name="Inventory" component={Inventory_Stack} />
      <Drawer.Screen name="Orders" component={Order_Stack} />
    </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default MyDrawer;