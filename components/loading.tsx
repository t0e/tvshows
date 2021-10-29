import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.gif} source={require('../assets/loading.gif')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: 50,
    height: 50,
  },
});

export default Loading;
