import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

interface StartProps {
  onStart: () => void;
}

const Start = ({onStart} : StartProps) => {

  return (
    <View style={styles.container}>
      <Button title = "Start" onPress={onStart}></Button>
    </View>
  );
};

export default Start;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
