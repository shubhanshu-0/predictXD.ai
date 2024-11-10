import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeModules,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

function App(): React.JSX.Element {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loadImage, setLoadImage] = useState(false);

  const handleLoad = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setImageUri(image.path);
        setLoadImage(true);
        console.log("Image Loaded!");
      })
      .catch(error => {
        console.log("Image selection canceled", error);
      });
  };

  const handleUnload = () => {
    setImageUri(null);
    setLoadImage(false);
    console.log("Removed!");
  };

  const predict = async () => {
    if (!loadImage) {
      console.log('Load Image First!');
      return;
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
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
          />
        )}
      </View>

      <View style={styles.buttonsBox}>
        <TouchableOpacity style={[styles.button, styles.loadButton]} onPress={handleLoad}>
          <Text style={styles.btnText}>Load Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.unloadButton]} onPress={handleUnload}>
          <Text style={styles.btnText}>Unload Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.processButton]} onPress={predict}>
          <Text style={styles.btnText}>Predict</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
    backgroundColor: '#22263a',
  },
  appNameText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#141827',
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
    height: '40%',
    width: '80%',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b1e2c',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    resizeMode: 'contain',
  },
  buttonsBox: {
    width: '80%',
  },
  button: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    borderWidth: 2,
    backgroundColor : '001F3F'
  },
  loadButton: {
    // backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  unloadButton: {
    // backgroundColor: '#e74c3c',
    borderColor: '#e74c3c',
  },
  processButton: {
    // backgroundColor: '#2ecc71',
    borderColor: '#2ecc71',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});

export default App;
