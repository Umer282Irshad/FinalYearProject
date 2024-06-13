import { Text, View ,TouchableOpacity} from 'react-native';
import { globalStyles } from '../styles/globalStyle';
import logo from '../assets/electric_vehicle_logo.png';
import { Image } from 'react-native';

export default function Sign_In_Up({navigation}) {
  return (
    <View style={globalStyles.container}>
      <Image source={logo} style={globalStyles.logo} />
      <Text style={[globalStyles.titleText]}>Welcome to SmartCart App!</Text>
      <View style={globalStyles.buttonContainer}>
          <TouchableOpacity 
            style={[globalStyles.button, { height: 60 }]} 
            onPress={() => navigation.navigate('Sign In')}
          >
            <Text style={globalStyles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[globalStyles.button, { height: 60 }]} 
            onPress={() => navigation.navigate('Sign Up')}
          >
            <Text style={globalStyles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}
