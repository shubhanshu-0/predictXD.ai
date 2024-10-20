import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

type Props = {
  imgSource: string; 
  image: string;
};

const ImageViewer = ({ imgSource , image } : Props) => {

  const imageSource = imgSource != "" ? { image } : imgSource;

  return (

    <View style={styles.container}>
      {imgSource ? (
        <Image source={{uri : imgSource}} style={styles.image} alt={'Image'} />
      ) : (
        <Text style={styles.text}>No image available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%' , // Adjust the height to fit your requirements
    width : '100%' ,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
});

export default ImageViewer;
