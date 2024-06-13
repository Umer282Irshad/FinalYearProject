import { StyleSheet, Text, View } from 'react-native';
import { globalStyles } from '../styles/globalStyle';


export default function AppLoading() {
  return (
    <View style={globalStyles.container}>
      <Text style={[globalStyles.titleText,{textAlign:'center',justifyContent:'center',fontSize:20,marginTop:400}]}>App is loading. Please wait for a momemt...</Text>
    </View>
  );
}
