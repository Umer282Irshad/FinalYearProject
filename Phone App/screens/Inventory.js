import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,TouchableWithoutFeedback,Keyboard, FlatList, StyleSheet, Image, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyle';

export default function Inventory() {
  const [items, setItems] = useState([
    { name: 'Lock', quantity: 3, date: '3/28/2024' },
    { name: 'Breadboard', quantity: 2, date: '3/29/2024' }
  ]);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState('');
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [isEdit, setIsEdit] = useState(false); // To determine if it's an edit operation

  const addItem = () => {
    if (itemName.trim() !== '') {
      const currentDate = date || new Date().toLocaleDateString(); // Get current date if not provided
      const newItem = {
        name: itemName,
        quantity: quantity || 1, // Default quantity to 1 if not provided
        date: currentDate,
      };
      setItems([...items, newItem]);
      setItemName('');
      setQuantity('');
      setDate('');
    }
  };

  const deleteItem = (index) => {
    // Function to handle item deletion
    const confirmDelete = () => {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      setItems(updatedItems);
    };

    // Show confirmation modal
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: confirmDelete },
      ],
      { cancelable: false }
    );
  };


  const handleItemPress = (index) => {
    setSelectedItemIndex(index);
    setImageModalVisible(true);
    setIsEdit(true);
  };

  const handleEditItem = () => {
    const editedItems = [...items];
    const editedItem = {
      name: itemName || editedItems[selectedItemIndex].name,
      quantity: quantity || editedItems[selectedItemIndex].quantity,
      date: date || editedItems[selectedItemIndex].date, // Use existing date if not provided
    };
    editedItems[selectedItemIndex] = editedItem;
    setItems(editedItems);
    setImageModalVisible(false);
    setIsEdit(false); // Reset edit mode after saving changes
    // Reset input fields
    setItemName('');
    setQuantity('');
    setDate('');
  };
  const dismissKeyboard=()=>{
    Keyboard.dismiss();
  }

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => { }}>
        <Image source={require('../assets/favicon.png')} style={styles.itemImage} />
      </TouchableOpacity>
      <View style={styles.itemInfo}>
        <TouchableOpacity onPress={() => handleItemPress(index)}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
          <Text style={styles.itemDate}>Date: {item.date}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => handleItemPress(index)}>
          <Ionicons name="create-outline" size={24} color="blue" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteItem(index)}>
          <Ionicons name="trash-outline" size={24} color="red" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View style={styles.container}>
      <Text style={[globalStyles.titleText, { textAlign: 'center', fontSize: 34, marginBottom: 25 }]}>Inventory</Text>

      {/* Input fields and Add Item button */}
      <TextInput
        style={styles.input}
        value={itemName}
        onChangeText={setItemName}
        placeholder="Enter item name"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        placeholder="Enter quantity"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Enter date (optional)"
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.addButton} onPress={isEdit ? handleEditItem : addItem}>
        <Text style={styles.buttonText}>{'Add Item'}</Text>
      </TouchableOpacity>

      {/* FlatList */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContainer}
      />

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input2}
              value={itemName}
              onChangeText={setItemName}
              placeholder="Enter item name"
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input2}
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              placeholder="Enter quantity"
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input2}
              value={date}
              onChangeText={setDate}
              placeholder="Enter date"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.editButton} onPress={handleEditItem}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setImageModalVisible(false)}>
              <Ionicons name="close-circle" size={40} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#234',
  },
  input: {
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#fed',
    fontFamily: 'nunito-bold'
  },
  input2: {
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    marginRight: 20,
    marginTop: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'black',
    fontFamily: 'nunito-bold',
    width: 200
  },
  addButton: {
    backgroundColor: '#0bcc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
    marginLeft: 110,
    width: '40%',
    fontFamily: 'nunito-bold'
  },
  editButton: {
    backgroundColor: '#0bcc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    width: '40%',
    fontFamily: 'nunito-bold',
    width: 140
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'nunito-bold',
    padding: 5,
    textAlign: 'center',
  },
  listContainer: {
    flexGrow: 1,
    fontFamily: 'nunito-bold',
    padding:1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    fontFamily: 'nunito-bold',
    backgroundColor: '#b7e9e5'
  },
  itemInfo: {
    flex: 1,
    fontFamily: 'nunito-bold'
  },
  itemName: {
    fontWeight: 'bold',
    fontFamily: 'nunito-bold'
  },
  itemQuantity: {
    color: 'gray',
    fontFamily: 'nunito-bold'
  },
  itemDate: {
    color: 'gray',
    fontFamily: 'nunito-bold'
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});
