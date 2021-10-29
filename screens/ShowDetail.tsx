/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  NativeModules,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {RouteProp} from '@react-navigation/native';

import {useSelector, useDispatch} from 'react-redux';
import {storeMovie, getMovies} from '../redux/movies';
import Loading from '../components/loading';
const windowWidth = Dimensions.get('window').width;

const getMoviesDetail = async (movieId: Number) => {
  return await fetch(`https://api.tvmaze.com/shows/${movieId}`)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};

const ShowDetailScreen: React.FC<{
  route: RouteProp<{params: {id: Number}}, 'params'>;
}> = ({route}) => {
  const {id} = route.params;
  const [status, setStatus] = useState('inactive');
  const dispatch = useDispatch();
  const movie = useSelector(getMovies).movieDetail;

  useEffect(() => {
    getMoviesDetail(id).then(res => dispatch(storeMovie(res)));
    return () => {
      dispatch(storeMovie({}));
    };
  }, []);

  const {MovieModule} = NativeModules;

  const changeStatus = (newStatus: string) => {
    setStatus(newStatus);
  };

  // Animation ...

  const animatedValue = new Animated.Value(0);

  const buttonScale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.25, 1.5],
  });

  const onPressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{scale: buttonScale}],
  };

  return JSON.stringify(movie) !== '{}' /* Check movie is empty */ ? (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: movie.image
              ? movie.image.medium
              : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAAETCAMAAABDSmfhAAAAP1BMVEXo6Ojp6enn5+fd3d2ZmZmUlJTi4uKbm5u4uLjPz8+Tk5Pt7e2zs7O8vLzW1tbMzMympqbFxcWhoaHBwcGqqqpGcOzZAAAEkElEQVR4nO2di5LiIBBFIS+N5KGZ/P+3Lg15kJhY67h7wap7pmaMktocWeimMTWjuvwb6VSuv5Hceqvvg95Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiN5VPvLGB9tnn59MW43moW0POD/Vr/ST03BM3zG/zguv+iv3X27i89rJSO39+6Hi9vMoy5tv9RUb3NT1m8TXnpdNxxonPRLoXZ6ZigVR4HHbe/tevu5to017t7B3d7eMB1cNbjfGIpIyWmd2MdeiPo0R625oTqblsf/rgpi7JOwLvyceVRFrdO7+O0j5WZaW2rm46Z6W9JeBeVHM3ek6z/mrKNnCjelWtNwVs5bx309y5Dqulb+/52h8l4q0PvxTkLxkla/S2HEsmdt8rU8wrF97eRoWMeaXiX10pkOxvqJu+DqSnecmKVqVxCS1xv5fq7GO6WSzF5B/NxmqJTfwcnxu5vF09WFu9wWroH771m+gTGyc47sA4ek/R2qzzvbbZhMNv0d3mZz0xhfJetluydz/NylV3V/bxsMpfyx+jeQd6x4S2M32onn1j81q/yzhRaVLre4frkoCqe1ye5i+4JeKuz/t4GlWxZn8hLKaxPFm/bjYu3WrWXYW6C9WAd3dvHk14vYaJVR0WDnuqGH3diFr9u8Hn+0lwto0so4/WYu2tdTkxinPx9XbwcWu8PLvuP5uUvSKi/y1fdvWmN7+3n5ZhXll7WHUNXHfOQ1rtrrYfo3j7P50a2L12k643b1dTTT7eLqbU8lSDSGTmUwiiF/n6Z59Uu72Sp5R31lOeV91Zr3tnk+Q8u+5/WVUEdv7yJFNdVPqFvvddx4vtbp+Xt4olMN21k5s31jnpaFbq6obYp36b6Nvq89PFkeHR1V1+DOk1te33yLoZeTmzjx+8579ws5a6+3EYUXxcvJ8b2Pqjnn5n3Y9PN83tvtdlHTifPz+O77vv6Wk77J2q/j6zmfYjLo7e0lzS8JZ5IoGiO9pHnQxdPegk8Opl48iLPL5Elsbxz7H1Q0ie2PjnyPvx4PrF8ebo+8aF7G08S8nbzMnc3Exg/81RwM8F6HWX8+lueyIZFbG+/XenqnXqtaA5w1dCYTL2j65tkE5d8ivVn8fShfdDq8k4V9XNue/HhF/cVyOfKke8/0flwO63hz7g16/02kbwzrer2ZI/qjLYzvoaL6W1LGbP5U6Dm4GjfnEX2fq5rdmuTV80xvSNBbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8sX+39jeSqe/evbiZB9wdLkUgm3FJ9/AAAAABJRU5ErkJggg==',
          }}
        />
      </View>
      <Text style={styles.title}>{movie.name}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.verticalContainer}>
          <Text style={styles.info}>
            {new Date(movie.premiered).getFullYear()}
          </Text>
          <Text style={styles.label}>Year</Text>
        </View>
        <View style={styles.verticalContainer}>
          <Text style={styles.info}>{movie.language}</Text>
          <Text style={styles.label}>Language</Text>
        </View>
        <View style={styles.verticalContainer}>
          <Text style={styles.info}>
            {movie.rating.average
              ? JSON.stringify(movie.rating.average)
              : 'null'}
          </Text>
          <Text style={styles.label}>Rating</Text>
        </View>
      </View>
      <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
        <Animated.View style={[styles.iconContainer, animatedScaleStyle]}>
          <TouchableOpacity
            style={styles.statusBtn}
            onPress={() =>
              MovieModule.changeStatus(status, (newStatus: string) =>
                changeStatus(newStatus),
              )
            }>
            <Text style={styles.status}>Status: {status}</Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableWithoutFeedback>
      <Text style={styles.summary}>
        {/* Format html tags */}
        {movie.summary
          ? movie.summary.replace(/<\/?[^>]+(>|$)/g, '')
          : 'No summary'}{' '}
      </Text>
    </ScrollView>
  ) : (
    <Loading />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 20,
  },
  image: {
    width: windowWidth / 2,
    height: windowWidth / 1.5,
  },
  imageContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: 'grey',
    elevation: 10,
  },
  infoContainer: {
    flexDirection: 'row',
  },
  verticalContainer: {
    flex: 1,
    alignItems: 'center',
  },
  info: {
    fontSize: 16,
    color: 'black',
  },
  label: {
    fontSize: 14,
    color: 'grey',
  },
  status: {
    fontWeight: '700',
    marginVertical: 10,
  },
  statusBtn: {
    padding: 10,
    borderRadius: 10,
  },
  summary: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ShowDetailScreen;
