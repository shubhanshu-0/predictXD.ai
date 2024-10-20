import {StyleSheet ,  SafeAreaView, Text , View , TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from '@/components/ImageViewer';


export default function HomeScreen() {
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [loadImage , setLoadImage] = useState(false);
  const [image, setImage] = useState<string>("");

   const handleLoad = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);
    }else{
      alert("You did not select any image !");
    }
  }

  // const handleLoad = () => {
  //   setLoadImage(true);
  // }

  const handleUnload = () => {
    setLoadImage(false);
  }

  const process = () => {
    if(loadImage){
        console.log('PROCESSING ... ');
    }else console.log('LOAD IMAGE FIRST !');
  }

  const photo = '../assets/images/react-logo@3x.png'
  return (
    <SafeAreaView style={styles.container}>
      <View style = {styles.imageBox}>
        <ImageViewer imgSource={image} image={image}></ImageViewer>
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
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    borderWidth : 2 , 
    // borderColor : 'white',
    backgroundColor :'white',
    alignItems : 'center',
    justifyContent: 'space-evenly'
  } , 
   mainText: {
    borderWidth: 2, 
    borderColor: 'white',
    padding: 10, // Adds some padding around the text
  },
   imageBox: {
    width: '90%',
    height: '40%',
    borderWidth : 2 , 
    borderColor : 'black',
  } , 
  buttonsBox : {
      width : '90%'
  }, 
  uploadBtn : {
    marginTop : 5 ,
    marginBottom : 5,
    backgroundColor : '#5ea6f7' , 
    padding : 10 , 
    width : '100%' , 
    alignItems : 'center',
  },
});