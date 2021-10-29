import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {storeMovieList} from '../redux/movies';

type FormData = {
  movieTitle: string;
};

const getMoviesFromApi = async (movieTitle: string) => {
  return await fetch(`https://api.tvmaze.com/search/shows?q=${movieTitle}`)
    .then(response => response.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      console.error(error);
    });
};

const SearchBox = () => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>();
  const onSubmit = (data: {movieTitle: string}) => {
    getMoviesFromApi(data.movieTitle).then(res =>
      dispatch(storeMovieList(res)),
    );
  };

  return (
    <View style={styles.formContainer}>
      <Controller
        control={control}
        rules={{
          required: false,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Search TV Shows"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="movieTitle"
        defaultValue=""
      />
      {errors.movieTitle && <Text>This is required.</Text>}
      <TouchableOpacity
        style={styles.submitBtn}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.btnText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'row',
    height: 50,
  },
  input: {
    width: '80%',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'grey',
    paddingHorizontal: 10,
  },
  submitBtn: {
    width: '20%',
    backgroundColor: 'grey',
    justifyContent: 'center',
  },
  btnText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default SearchBox;
