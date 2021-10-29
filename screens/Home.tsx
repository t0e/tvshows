import React from 'react';
import {View, StyleSheet} from 'react-native';
import SearchBox from '../components/searchBox';
import MovieList from '../components/movieList';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <SearchBox />
      <MovieList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default HomeScreen;
