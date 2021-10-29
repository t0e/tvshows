import React, {useCallback} from 'react';
import {View, FlatList, StyleSheet, Animated} from 'react-native';
import {useSelector} from 'react-redux';
import {getMovies} from '../redux/movies';

import MovieItem from './movieItem';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const MovieList = () => {
  const movies = useSelector(getMovies);

  const y = new Animated.Value(0);
  const onScroll = Animated.event([{nativeEvent: {contentOffset: {y}}}], {
    useNativeDriver: true,
  });

  const ITEM_HEIGHT = 60;

  const getItemLayout = useCallback(
    (data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  const keyExtractor = useCallback((item: any) => item.show.id.toString(), []);
  return (
    <View style={styles.container}>
      <AnimatedFlatList
        scrollEventThrottle={16}
        bounces={false}
        data={movies.movieList}
        renderItem={({index, item, item: {show}}: any) => (
          <MovieItem key={item.id} {...{index, y, show}} />
        )}
        keyExtractor={keyExtractor}
        maxToRenderPerBatch={5}
        getItemLayout={getItemLayout}
        {...{onScroll}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

export default MovieList;
