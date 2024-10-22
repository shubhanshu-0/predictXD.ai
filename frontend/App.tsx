/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
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

  const process = async () => {
    if (!loadImage) {
      console.log('Load Image First!');
      return;
    }
    if (imageUri) {
      try {
        await NativeModules.ImagePreprocessorModule.preprocessImage(imageUri);
      } catch (error) {
        console.log("Error during preprocessing: ", error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appName}><Text style={{color : 'black'}}>Xapp</Text></View>
      <View><Text>Hello</Text></View>
      <View style={styles.imgBox}>
        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
          />
        )}
      </View>

      <View style={styles.buttonsBox}>
        <TouchableOpacity style={styles.uploadBtn} onPress={handleLoad}>
          <Text>Load Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadBtn} onPress={handleUnload}>
          <Text>Unload Image</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadBtn} onPress={process}>
          <Text>Process</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appName : {
    height : '5%' ,
    borderColor : 'black' , 
    width : '100%' ,
    position:'absolute' ,
    top : 0 , 
    borderBottomWidth : 2
  } , 

  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgBox: {
    height: '50%',
    width: '70%',
    borderColor: 'black',
    borderWidth: 2,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  uploadBtn: {
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#5ea6f7',
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonsBox: {
    width: '90%',
  },
});

export default App;
