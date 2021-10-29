import React from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const MARGIN = 16;
export const CARD_HEIGHT = 90 + MARGIN * 2;
const {height: wHeight} = Dimensions.get('window');
const height = wHeight - 64;
const styles = StyleSheet.create({
  card: {
    marginVertical: MARGIN,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#999999',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  movieInfo: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'flex-start',
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  year: {
    color: 'yellow',
    fontSize: 15,
  },
  image: {
    width: 50,
    height: 50,
  },
});

interface WalletCardProps {
  y: Animated.Value;
  index: number;
  show: any;
}

interface ItemProps {
  title: string;
  image: string;
  date: string;
}

const MovieItem = ({y, index, show}: WalletCardProps) => {
  const navigation = useNavigation();
  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isDisappearing = -CARD_HEIGHT;
  const isTop = 0;
  const isBottom = height - CARD_HEIGHT;
  const isAppearing = height;
  const translateY = Animated.add(
    Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.00001 + index * CARD_HEIGHT],
        outputRange: [0, -index * CARD_HEIGHT],
        extrapolateRight: 'clamp',
      }),
    ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -CARD_HEIGHT / 4],
      extrapolate: 'clamp',
    }),
  );
  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: 'clamp',
  });
  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });

  const Item = ({title, image, date}: ItemProps) => (
    <View style={styles.item}>
      <Image
        style={styles.image}
        source={{
          uri: image
            ? image
            : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALcAAAETCAMAAABDSmfhAAAAP1BMVEXo6Ojp6enn5+fd3d2ZmZmUlJTi4uKbm5u4uLjPz8+Tk5Pt7e2zs7O8vLzW1tbMzMympqbFxcWhoaHBwcGqqqpGcOzZAAAEkElEQVR4nO2di5LiIBBFIS+N5KGZ/P+3Lg15kJhY67h7wap7pmaMktocWeimMTWjuvwb6VSuv5Hceqvvg95Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiNhd5Y6I2F3ljojYXeWOiN5VPvLGB9tnn59MW43moW0POD/Vr/ST03BM3zG/zguv+iv3X27i89rJSO39+6Hi9vMoy5tv9RUb3NT1m8TXnpdNxxonPRLoXZ6ZigVR4HHbe/tevu5to017t7B3d7eMB1cNbjfGIpIyWmd2MdeiPo0R625oTqblsf/rgpi7JOwLvyceVRFrdO7+O0j5WZaW2rm46Z6W9JeBeVHM3ek6z/mrKNnCjelWtNwVs5bx309y5Dqulb+/52h8l4q0PvxTkLxkla/S2HEsmdt8rU8wrF97eRoWMeaXiX10pkOxvqJu+DqSnecmKVqVxCS1xv5fq7GO6WSzF5B/NxmqJTfwcnxu5vF09WFu9wWroH771m+gTGyc47sA4ek/R2qzzvbbZhMNv0d3mZz0xhfJetluydz/NylV3V/bxsMpfyx+jeQd6x4S2M32onn1j81q/yzhRaVLre4frkoCqe1ye5i+4JeKuz/t4GlWxZn8hLKaxPFm/bjYu3WrWXYW6C9WAd3dvHk14vYaJVR0WDnuqGH3diFr9u8Hn+0lwto0so4/WYu2tdTkxinPx9XbwcWu8PLvuP5uUvSKi/y1fdvWmN7+3n5ZhXll7WHUNXHfOQ1rtrrYfo3j7P50a2L12k643b1dTTT7eLqbU8lSDSGTmUwiiF/n6Z59Uu72Sp5R31lOeV91Zr3tnk+Q8u+5/WVUEdv7yJFNdVPqFvvddx4vtbp+Xt4olMN21k5s31jnpaFbq6obYp36b6Nvq89PFkeHR1V1+DOk1te33yLoZeTmzjx+8579ws5a6+3EYUXxcvJ8b2Pqjnn5n3Y9PN83tvtdlHTifPz+O77vv6Wk77J2q/j6zmfYjLo7e0lzS8JZ5IoGiO9pHnQxdPegk8Opl48iLPL5Elsbxz7H1Q0ie2PjnyPvx4PrF8ebo+8aF7G08S8nbzMnc3Exg/81RwM8F6HWX8+lueyIZFbG+/XenqnXqtaA5w1dCYTL2j65tkE5d8ivVn8fShfdDq8k4V9XNue/HhF/cVyOfKke8/0flwO63hz7g16/02kbwzrer2ZI/qjLYzvoaL6W1LGbP5U6Dm4GjfnEX2fq5rdmuTV80xvSNBbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8s9MZCbyz0xkJvLPTGQm8sX+39jeSqe/evbiZB9wdLkUgm3FJ9/AAAAABJRU5ErkJggg==',
        }}
      />
      <View style={styles.movieInfo}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.year}>{new Date(date).getFullYear()}</Text>
      </View>
    </View>
  );

  return (
    <Animated.View
      style={[styles.card, {opacity, transform: [{translateY}, {scale}]}]}
      key={index}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Show Detail', {
            id: show.id,
          })
        }>
        <Item
          title={show.name}
          image={show.image?.medium}
          date={show.premiered}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default MovieItem;
