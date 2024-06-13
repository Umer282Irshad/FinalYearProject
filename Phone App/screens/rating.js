import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Linking, Alert, Modal, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyle';

export default function OrdersScreen({ navigation }) {
  const [orders, setOrders] = useState([
    { 
      id: 1, 
      name: 'Ahmad', 
      date: '2024-04-26', 
      time: '10:17 AM', 
      number: '03084369961',
      location: { latitude: 31.4697, longitude: 74.2728 }, // Dummy location
      items: [
        { id: 1, name: 'burger', quantity: 2 },
        { id: 2, name: 'pizza', quantity: 3 },
      ],
      completed: false, // Track completion status
      rating: null // Track the rating given by user
    },
    { 
      id: 2, 
      name: 'Ali', 
      date: '2024-04-27', 
      time: '11:23 AM', 
      number: '03166376261',
      location: { latitude: 31.5165, longitude: 74.3499 }, // Dummy location31.5165° N, 74.3499° E
      items: [
        { id: 3, name: 'white Board', quantity: 1 },
      ],
      completed: false, // Track completion status
      rating: null // Track the rating given by user
    },
    // Add more orders here
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);

  const handleLocationPress = (order) => {
    const { latitude, longitude } = order.location;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const handleMessagePress = (order) => {
    const message = "Your message here";
    const phoneNumber = order.number;
    const uri = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
    Linking.openURL(uri);
  };

  const handleCallPress = (order) => {
    const phoneNumber = `tel:${order.number}`;
    Linking.openURL(phoneNumber);
  };

  const handleOrderPress = (order) => {
    // Toggle order expansion
    order.expanded = !order.expanded;
    setOrders([...orders]);
  };

  const handleCompleteOrder = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const handleDeleteOrder = (order) => {
    Alert.alert(
      'Delete Order',
      'Are you sure you want to delete this order?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => deleteOrder(order.id) },
      ],
      { cancelable: false }
    );
  };

  const deleteOrder = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
  };

  const handleRatingSubmit = () => {
    const updatedOrders = orders.map(order => {
      if (order.id === selectedOrder.id) {
        return { ...order, completed: true, rating: rating };
      }
      return order;
    });
    setOrders(updatedOrders);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <TouchableOpacity style={styles.orderHeader} onPress={() => handleOrderPress(item)}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderName}>{item.name}</Text>
          <Text>Date: {item.date}</Text>
          <Text>Time: {item.time}</Text>
          <Text>Phone Number: {item.number}</Text>
          {item.completed && (
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map(star => (
                <Ionicons
                  key={star}
                  name={star <= item.rating ? 'star' : 'star-outline'}
                  size={20}
                  color={star <= item.rating ? '#ffc107' : '#ccc'}
                />
              ))}
            </View>
          )}
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => handleMessagePress(item)}>
            <Ionicons name="chatbubble" size={24} color="blue" margin={5} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCallPress(item)}>
            <Ionicons name="call" size={24} color="green" margin={5}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLocationPress(item)}>
            <Ionicons name="location" size={24} color="red" margin={5} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteOrder(item)}>
            <Ionicons name="close" size={24} color="black" margin={5}/>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {!item.completed && (
        <TouchableOpacity
          style={[styles.completeButton]}
          onPress={() => handleCompleteOrder(item)}
          disabled={item.completed} // Disable the button if the order is completed
        >
          <Text style={styles.buttonText}>Received</Text>
        </TouchableOpacity>
      )}
      {item.completed && (
        <Text style={styles.completedText}>Order Received</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={[globalStyles.titleText,{textAlign:'center',fontSize:34, marginBottom:50}]}>Rating/Orders</Text>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Rate your experience</Text>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                >
                  <Ionicons
                    name={star <= rating ? 'star' : 'star-outline'}
                    size={32}
                    color={star <= rating ? '#ffc107' : '#ccc'}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={handleRatingSubmit}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#234',
  },
  orderContainer: {
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden'
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#b7e9eb',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  orderInfo: {
    flex: 1,
  },
  orderName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: '#0bcc',
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  completedText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#888',
    paddingVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 20
  },
});
