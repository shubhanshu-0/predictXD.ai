/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';

  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };
  // const handleLoad = () => ImagePicker.openPicker({
  //           width: 300,
  //           height: 400,
  //           cropping: true
  //         }).then(image => {
  //           console.log(image);
  //         });

  const [loadImage , setLoadImage] = useState(false);

  const handleLoad = () => {
    setLoadImage(true);
    console.log(" Image Loaded !");
  }

  const handleUnload = () => {
    setLoadImage(false);
    console.log(" Removed !");
  }

  const process = () => {
    if(!loadImage) console.log('Load Image First !')
    else console.log("Processing Image");
  }
  return (
    <SafeAreaView style = {styles.container}>
          <View><Text> Hello </Text></View>
          <View style = {styles.imgBox}>

          </View>

          <View style = {styles.buttonsBox}>
            <TouchableOpacity style = {styles.uploadBtn} onPress={handleLoad}>
              <Text> Load Image </Text> 
            </TouchableOpacity>

            <TouchableOpacity style = {styles.uploadBtn} onPress={handleUnload}>
              <Text> Unload Image </Text>
          </TouchableOpacity>

            <TouchableOpacity style = {styles.uploadBtn} onPress={process}>
              <Text> Process </Text>
            </TouchableOpacity>
        </View>
          
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container : {
    height : '100%' , 
    width : '100%' , 
    backgroundColor : 'white',
    flex : 1 , 
    alignItems : 'center' , 
    justifyContent : 'center'
  } ,
  imgBox : {
    height : '50%' , 
    width : '70%',
    borderColor : 'black' , 
    borderWidth : 2
  } , 
  uploadBtn : {
  marginTop : 5 ,
  marginBottom : 5,
  backgroundColor : '#5ea6f7' , 
  padding : 10 , 
  width : '100%' , 
  alignItems : 'center'
  },
   buttonsBox : {
      width : '90%'
  }, 
});

export default App;
