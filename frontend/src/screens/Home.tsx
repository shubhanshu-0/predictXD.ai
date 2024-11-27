import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const API_BASE_URL = "http://192.168.1.88:5001/predict";

const Home = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loadImage, setLoadImage] = useState(false);

  // Animation states
  const fadeAnim = new Animated.Value(0); // Initial opacity 0

  const handleLoad = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        setImageUri(image.path);
        setLoadImage(true);
        console.log("Image Loaded!");
        // Fade-in animation
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      })
      .catch((error) => {
        console.log("Image selection canceled", error);
      });
  };

  const handleUnload = () => {
    setImageUri(null);
    setLoadImage(false);
    console.log("Removed!");
    // Fade-out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const predict = async () => {
    if (!loadImage || !imageUri) {
      console.log('Load an image first!');
      Alert.alert('Error', 'Please load an image before predicting.');
      return;
    }

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'image.jpg',
    } as any);

    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      console.log(response);
      if (response.ok) {
        const result = await response.json();
        console.log('Prediction result:', result);
        Alert.alert(
          'Prediction Result',
          `Disease: ${result.predicted_class}\nConfidence: ${result.prediction_probability}`
        );
      } else {
        console.error('Server error:', response.status);
        Alert.alert('Error', 'Server error occurred.');
      }
    } catch (error) {
      console.error('Error during prediction:', error);
      Alert.alert('Error', 'An error occurred during prediction.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appName}>
        <Text style={styles.appNameText}>predictXD.ai</Text>
      </View>

      <View style={styles.greetingBox}>
        <Text style={styles.greetingText}>Welcome</Text>
      </View>

       <View style={styles.imgBox}>
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
      </View>

      <View style={styles.buttonsBox}>
        <TouchableOpacity
          style={[styles.button, styles.loadButton]}
          onPress={handleLoad}
        >
          <Text style={styles.btnText}>Load Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.unloadButton]}
          onPress={handleUnload}
        >
          <Text style={styles.btnText}>Unload Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.processButton]}
          onPress={predict}
        >
          <Text style={styles.btnText}>Predict</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  appName: {
    height: '7%',
    borderBottomWidth: 2,
    borderBottomColor: '#1c1f2e',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    backgroundColor: '#121212', // Dark theme background
  },
  appNameText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark theme background
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10%',
  },
  greetingBox: {
    marginVertical: 20,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5ea6f7', 
  },
  imgBox: {
    height: '58.5%', 
    width: '85%', 
    borderColor: '#ffffff4e', 
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d0d14', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 20,
    borderRadius: 3
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  placeholderText: {
    color: '#ccc', // Light gray color for the text
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsBox: {
    width: '80%',
  },
  button: {
    marginBottom: 10, // Smaller margin between buttons
    paddingVertical: 10, // Reduced vertical padding for smaller buttons
    paddingHorizontal: 20, // Adjusted horizontal padding
    borderRadius: 8, // Slightly smaller border radius
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  loadButton: {
    borderColor: '#18a01d',
  },
  unloadButton: {
    borderColor: '#e74c3c',
  },
  processButton: {
    borderColor: '#2e78cc',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 14, // Smaller text size for buttons
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
