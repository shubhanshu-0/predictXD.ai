/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState , useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Alert , 
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Start from './src/screens/Start';
import Home from './src/screens/Home';

const API_BASE_URL = 'http://192.168.29.223:5001/';

function App() : React.JSX.Element{

  const [start , setStart] = useState(false)
  const [message, setMessage] = useState<string | null>(null);

  const fetchMessage = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    const data = await response.json();
    if (response.ok) {
      setMessage(data.message);
      Alert.alert('Success', 'Message fetched successfully!'); // Alert for successful fetch
    } else {
      Alert.alert('Error', 'Failed to fetch message from server.');
    }
  } catch (error) {
    console.error('Error fetching message:', error);
    Alert.alert('Error', 'Failed to connect to server.');
  }
};


  const handleStart = () => {
    setStart(true);
  }

  useEffect(() => {
    fetchMessage();
  }, []);
  
  return (
        <SafeAreaView style={styles.bg}>
      {!start ? (
        <Start onStart={handleStart} />
      ) : (
        <Home />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor:'white' , 
    height : '100%'
  } ,
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
