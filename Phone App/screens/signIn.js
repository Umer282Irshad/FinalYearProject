import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { globalStyles } from '../styles/globalStyle';

export default function SignIn({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Validate username length
    if (username.length < 3) {
      // Show alert for invalid username
      return alert('Username cannot be less than 3 characters');
    }
  
    // Validate password length
    if (password.length < 8) {
      // Show alert for invalid password
      return alert('Password cannot be less than 8 characters');
    }
  
    // Check if username and password match
    if (true) {
    // if (username === 'Ahmad Zafar' && password === '12345678') {
      // Navigate to the Map screen if credentials are correct
      navigation.navigate('Map');
    } else {
      // Show alert for invalid credentials
      alert('Invalid username or password');
    }
  };
  

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
    <View style={globalStyles.container}>
      <Text style={[globalStyles.titleText,{marginTop:100,fontSize:34,marginBottom:50}]}>Sign In</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Hide text for password input
      />
      <TouchableOpacity
        style={[globalStyles.button, { height: 60,marginTop:30 ,marginLeft:10}]}
        onPress={handleSignIn}
      >
        <Text style={globalStyles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  );
}
