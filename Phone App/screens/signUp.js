import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { globalStyles } from '../styles/globalStyle';
import { RadioButton } from 'react-native-paper';

export default function SignUp({ navigation }) {
  const [userName, setUserName] = useState('');
  const [cnic, setCnic] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [role, setRole] = useState('buyer');

  const handleSignUp = () => {
    // Validate input fields
    if (!userName || !cnic || !phoneNumber || !email || !password || !confirmPassword) {
      // Display error message or prevent submission
      alert('Please fill in all fields');
      return;
    }

    if(userName.length<3 || cnic.length<13 || phoneNumber.length<11 || email.length<5 || password.length<8 || confirmPassword.length<8){
      alert('Please enter valid inputs');
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    // Reset password match state
    setPasswordsMatch(true);

    // Add your sign-up logic here
    console.log('User Name:', userName);
    console.log('CNIC:', cnic);
    console.log('Phone Number:', phoneNumber);
    console.log('Email:', email);
    console.log('Password:', password);

    // Navigate to another screen after sign-up if needed
    navigation.navigate('Map');
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <View style={globalStyles.container}>
        <Text style={[globalStyles.titleText, { marginTop: 35, fontSize: 34,marginBottom:20 }]}>Create Account</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="User Name"
          value={userName}
          onChangeText={setUserName}
        />
        <Text style={{color:'white',fontFamily:'nunito-bold',marginTop:-10,fontSize:10,width:240,height:13}}>
          *atleast 4 characters</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="CNIC"
          value={cnic}
          onChangeText={setCnic}
          keyboardType="numeric"
        />
        <Text style={{color:'white',fontFamily:'nunito-bold',marginTop:-10,fontSize:10,width:240,height:13}}>
          *13 digits (without dash)</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="numeric"
        />
        <Text style={{color:'white',fontFamily:'nunito-bold',marginTop:-10,fontSize:10,width:240,height:13}}>
          *11 digits</Text>
        
        <TextInput
          style={globalStyles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={{color:'white',fontFamily:'nunito-bold',marginTop:-10,fontSize:10,width:240,height:13}}>
          *example@gmail.com</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={{color:'white',fontFamily:'nunito-bold',marginTop:-10,fontSize:10,width:240,height:13}}>
          *atleast 8 characters</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
  <RadioButton.Group onValueChange={newValue => setRole(newValue)} value={role}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <RadioButton value="buyer" />
      <Text style={{ color: 'white' }}>Customer</Text>
    </View>
  </RadioButton.Group>
  
  <RadioButton.Group onValueChange={newValue => setRole(newValue)} value={role}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
      <RadioButton value="seller" />
      <Text style={{ color: 'white' }}>Seller</Text>
    </View>
  </RadioButton.Group>
</View>

        {!passwordsMatch && <Text style={globalStyles.errorText}>Passwords do not match</Text>}
        <TouchableOpacity
          style={[globalStyles.button, { height: 60,marginTop:35 }]}
          onPress={handleSignUp}
        >
          <Text style={globalStyles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
