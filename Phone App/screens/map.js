import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity, Text, Linking, Modal, FlatList, TextInput } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export default function Map() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [randomLocations, setRandomLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef(null);

  useEffect(() => {
    getLocationPermission();
    generateRandomLocations();
  }, []);

  const getLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        getCurrentLocation();
      } else {
        Alert.alert('Location Permission Denied', 'Please enable location services to use this feature.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to get location permission.');
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCurrentLocation({ latitude, longitude });
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to get current location.');
    }
  };

  const generateRandomLocations = () => {
    const locations = [
      { latitude: 31.5497 + Math.random() * 0.05, longitude: 74.3436 + Math.random() * 0.05, title: 'fast food 1' },
      { latitude: 31.5497 + Math.random() * 0.05, longitude: 74.3436 + Math.random() * 0.05, title: 'fast food 2' },
      { latitude: 31.5497 + Math.random() * 0.05, longitude: 74.3436 + Math.random() * 0.05, title: 'stationary 1' },
      { latitude: 31.5497 + Math.random() * 0.05, longitude: 74.3436 + Math.random() * 0.05, title: 'Vegetables' },
      { latitude: 31.5497 + Math.random() * 0.05, longitude: 74.3436 + Math.random() * 0.05, title: 'cloths 1' }
    ];
    setRandomLocations(locations);
  };

  const openGoogleMaps = () => {
    const { latitude, longitude } = currentLocation;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const openFullScreenInterface = (location) => {
    setSelectedLocation(location);
  };

  const closeFullScreenInterface = () => {
    setSelectedLocation(null);
  };

  const handleShowRoute = async () => {
    if (!selectedLocation || !currentLocation) return;
    const { latitude, longitude, title } = selectedLocation;
    const { latitude: currentLatitude, longitude: currentLongitude } = currentLocation;
    const matchingLocation = randomLocations.find(location => location.title === title);
    if (matchingLocation) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLatitude},${currentLongitude}&destination=${latitude},${longitude}&travelmode=driving`;
      Linking.openURL(url);
    } else {
      const searchUrl = `https://www.google.com/maps/search/?api=1&query=${title}`;
      Linking.openURL(searchUrl);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
      Linking.openURL(url);
    } else {
      Alert.alert('Empty Search', 'Please enter a search query.');
    }
  };

  const filteredLocations = randomLocations.filter(location => {
    const searchWords = searchQuery.toLowerCase().trim().split(/\s+/);
    return location.title && searchWords.some(word => location.title.toLowerCase().includes(word));
  });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="checkmark-circle" size={24} color="green" />
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: currentLocation ? currentLocation.latitude : 31.5497,
          longitude: currentLocation ? currentLocation.longitude : 74.3436,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="Current Location"
            pinColor="#0bcc"
          />
        )}
        {filteredLocations.map((location, index) => (
          <Marker
            key={index}
            coordinate={location}
            title={location.title}
            description="Click to see more"
            onPress={() => openFullScreenInterface(location)}
          >
            <Callout>
              <Text>{`SmartCart ${index + 1}`}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Current Location Button */}
      <TouchableOpacity style={styles.currentLocationButton} onPress={getCurrentLocation}>
        <Text style={styles.buttonText}>Current Location</Text>
      </TouchableOpacity>

      {/* Google Maps Button */}
      <TouchableOpacity style={styles.googleMapsButton} onPress={openGoogleMaps}>
        <Text style={styles.buttonText}>Google Maps</Text>
      </TouchableOpacity>

      {/* Full Screen Interface */}
      <LocationDetailModal
        location={selectedLocation}
        onClose={closeFullScreenInterface}
        onShowRoute={handleShowRoute}
      />

    </View>
  );
}

const LocationDetailModal = ({ location, onClose, onShowRoute }) => {
  const dummyItems = [
    { name: 'Breadboard', quantity: 10, count: 0 },
    { name: 'Lock', quantity: 8, count: 0 },
    { name: 'Chair', quantity: 5, count: 0 },
    { name: 'Table', quantity: 12, count: 0 },
    { name: 'Lamp', quantity: 3, count: 0 },
    { name: 'Bookshelf', quantity: 6, count: 0 },
    { name: 'Plant', quantity: 4, count: 0 },
    { name: 'Mirror', quantity: 2, count: 0 },
    { name: 'Desk', quantity: 7, count: 0 },
    { name: 'Couch', quantity: 9, count: 0 },
  ];

  const [items, setItems] = useState(dummyItems);

  const decrementQuantity = (index) => {
    const updatedItems = [...items];
    if (updatedItems[index].count > 0) {
      updatedItems[index].count -= 1;
      setItems(updatedItems);
    }
  };

  const incrementQuantity = (index) => {
    const updatedItems = [...items];
    if (updatedItems[index].count < updatedItems[index].quantity) {
      updatedItems[index].count += 1;
      setItems(updatedItems);
    }
  };

  const placeOrder = () => {
    const anyNonZero = items.some(item => item.count > 0);
    if (anyNonZero) {
      setItems(dummyItems.map(item => ({ ...item, count: 0 }))); // Reset counts
      Alert.alert('Order Placed', 'Your order has been placed successfully!');
    } else {
      Alert.alert('Empty Order', 'Please select items to place an order.');
    }
  };

  return (
    <Modal visible={!!location} animationType="slide" transparent={false}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.locationName}>Ahmad</Text>
        <Text style={styles.locationPhone}>Phone No: 04303953485</Text>
        <TouchableOpacity style={styles.showRouteButton} onPress={onShowRoute}>
          <Text style={styles.buttonText}>Show Route</Text>
          <Ionicons name="location-sharp" size={22} color="red" />
        </TouchableOpacity>
        <Text style={styles.locationitem}>Items Available:</Text>
        <FlatList
          style={styles.dummyItemsList}
          data={items}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text style={styles.dummyItemText}>{item.name}{'\n'}<Text style={{ color: 'grey' }}>In Stock: {item.quantity}</Text></Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => decrementQuantity(index)}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.quantityInput}
                  value={items[index].count.toString()}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    const updatedItems = [...items];
                    if (text === '') {
                      updatedItems[index].count = 0;
                    } else {
                      updatedItems[index].count = Math.min(parseInt(text), updatedItems[index].quantity);
                    }
                    setItems(updatedItems);
                  }}
                />
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => incrementQuantity(index)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity style={styles.placeOrderButton} onPress={placeOrder}>
          <Text style={styles.buttonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: '#0bcc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  googleMapsButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0bcc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    width: '90%',
    height:45,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    zIndex: 1,
    elevation: 2,
  },
  searchBar: {
    flex: 1,
  },
  searchButton: {
    marginLeft: 10,
  },
  modalContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  locationName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  locationPhone: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  showRouteButton: {
    backgroundColor: '#0bcc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationitem: {
    padding: 5,
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: 'grey',
    width: '100%',
    justifyContent: 'center',
    textAlign: 'center',
  },
  dummyItemsList: {
    marginTop: 10,
    marginBottom: 15,
    maxHeight: '66%',
  },
  dummyItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#0bcc",
    width: 240,
    borderWidth: 2,
    padding: 7,
    borderRadius: 7,
    marginBottom: 10,
    backgroundColor: '#0bc5',
    textAlign: 'center',
  },
  placeOrderButton: {
    backgroundColor: '#0bcc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 25,
    marginTop: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  item: {
    flexDirection: 'row',
    width: 400,
    justifyContent: 'flex-start',
    paddingLeft: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#0bcc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#0bcc',
    borderRadius: 5,
    marginHorizontal: 5,
    minWidth: 30,
    textAlign: 'center',
  },
});


