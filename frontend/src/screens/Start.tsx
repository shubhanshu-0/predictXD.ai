import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface StartProps {
  onStart: () => void;
  ready: boolean;  // Prop to control button color
}

const Start = ({ onStart, ready }: StartProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Skin Disease Predictor</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, ready ? styles.readyButton : styles.notReadyButton]} // Conditional styling
          onPress={onStart}
          // disabled={!ready} // Disable button until ready is true
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Start;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28, 
    fontWeight: '700', 
    color: '#ffffff',
    textAlign: 'center', 
    fontFamily: 'sans-serif-medium', 
    marginBottom: 30,
  },
  buttonContainer: {
    width: 180, 
    borderRadius: 20, 
    overflow: 'hidden', 
    elevation: 8, 
  },
  button: {
    borderWidth: 2,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  readyButton: {
    borderColor: '#4CAF50',  // Green border when ready
  },
  notReadyButton: {
    backgroundColor: 'transparent', // No background color when not ready
    borderColor: '#E74C3C',  // Red border when not ready
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
