import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput,TouchableWithoutFeedback,Keyboard } from 'react-native';
import { globalStyles } from '../styles/globalStyle';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

const openImageLibrary = async () => {
  // Request permission to access the device's image library
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to access image library was denied');
    return;
  }

  // Open the image library
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.cancelled) {
    // console.log('Image selected:', result.uri);
    // You can do something with the selected image URI here
  }
};

const EditProfileScreen = () => {
    const [user, setUser] = useState({
        name: 'Ahmad Zafar',
        password: '12345678',
        phoneNo: '03084369961',
        cnic: '31203-1234567-8',
        email: 'ahmadzafar@gmail.com',
        avatar: require('../assets/img.jpg'), // Path to user's avatar image
    });

    const [editableField, setEditableField] = useState(null); // State to track which field is being edited
    const [nameBuffer, setNameBuffer] = useState('Ahmad Zafar'); // State to buffer name changes before saving

    const handleEdit = (field) => {
        setEditableField(field);
    };

    const handleChange = (value) => {
        if (editableField === 'name') {
            setNameBuffer(value);
        } else {
            setUser({ ...user, [editableField]: value });
        }
    };

    const handleSave = () => {
        if (editableField === 'name') {
            setUser({ ...user, name: nameBuffer });
        }
        // Logic to save changes to backend or database
        // console.log('Saved changes:', user);
        // Reset editableField state
        setEditableField(null);
    };

    const killKeyboard =()=>{
        Keyboard.dismiss()
        setEditableField(null);
    }

    return (
        <TouchableWithoutFeedback onPress={killKeyboard}>
        <View style={globalStyles.container}>
            <Text style={[globalStyles.titleText, styles.editIcon, { marginBottom: 10 }]}>Edit Your Profile</Text>
            <View style={styles.imageContainer}>
                <Image source={user.avatar} style={styles.avatar} />
            </View>
            <View style={{ borderRadius: 14, overflow: 'hidden', backgroundColor: '#ccc', marginLeft: 110, marginTop: -25, marginBottom: 5 }}>
                <TouchableOpacity onPress={openImageLibrary}>
                    <Ionicons name="pencil" size={20} color="black" padding={2} />
                </TouchableOpacity>
            </View>
            <Text style={[globalStyles.titleText, { marginBottom: 15 }]}>{user.name}</Text>

            <View style={styles.detailsContainer}>
                <Text style={styles.email}>User Name:</Text>
                <TextInput
                    style={[styles.input, editableField === 'name' && styles.editableInput]}
                    value={editableField === 'name' ? nameBuffer : user.name}
                    onChangeText={(value) => handleChange(value)}
                    editable={editableField === 'name'}
                />
                <TouchableOpacity onPress={() => handleEdit('name')}>
                    <Ionicons name="pencil" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Similar blocks for other details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.email}>Email:</Text>
                <TextInput
                    style={[styles.input, editableField === 'email' && styles.editableInput]}
                    value={user.email}
                    onChangeText={(value) => handleChange(value)}
                    editable={editableField === 'email'}
                />
                <TouchableOpacity onPress={() => handleEdit('email')}>
                    <Ionicons name="pencil" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.email}>Password:</Text>
                <TextInput
                    style={[styles.input, editableField === 'password' && styles.editableInput]}
                    value={user.password}
                    onChangeText={(value) => handleChange(value)}
                    editable={editableField === 'password'}
                />
                <TouchableOpacity onPress={() => handleEdit('password')}>
                    <Ionicons name="pencil" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.email}>Phone No:</Text>
                <TextInput
                    style={[styles.input, editableField === 'phoneNo' && styles.editableInput]}
                    value={user.phoneNo}
                    onChangeText={(value) => handleChange(value)}
                    editable={editableField === 'phoneNo'}
                />
                <TouchableOpacity onPress={() => handleEdit('phoneNo')}>
                    <Ionicons name="pencil" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.email}>CNIC:</Text>
                <TextInput
                    style={[styles.input, editableField === 'cnic' && styles.editableInput]}
                    value={user.cnic}
                    onChangeText={(value) => handleChange(value)}
                    editable={editableField === 'cnic'}
                />
                <TouchableOpacity onPress={() => handleEdit('cnic')}>
                    <Ionicons name="pencil" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={[globalStyles.button, { height: 60, marginTop: 50, marginLeft: 10 }]}
                onPress={handleSave}
            >
                <Text style={globalStyles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    detailsContainer: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: '#0bcd',
        width: '90%',
        padding: 10,
        borderRadius: 5
    },
    email: {
        fontSize: 16,
        color: '#bbb',
        width: 100,
        marginTop:3
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#bbb',
    },
    editableInput: {
        color: 'black', // Change text color when editable
    },
    editIconContainer: {
        borderRadius: 14,
        overflow: 'hidden',
        backgroundColor: '#bbb',
        marginLeft: 10,
        padding: 5,
    },
    editIcon: {
        width: '100%',
        backgroundColor: '#333',
        textAlign: 'center',
        fontSize: 30
    },
});

export default EditProfileScreen;
