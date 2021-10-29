import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import HomeScreen from './screens/Home';
import ShowDetailScreen from './screens/ShowDetail';

import store from './redux/store';

const Stack = createStackNavigator();

const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TV Shows">
          <Stack.Screen name="TV Shows" component={HomeScreen} />
          <Stack.Screen name="Show Detail" component={ShowDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
