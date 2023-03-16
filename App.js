import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import Constants from 'expo-constants'
import Home from "./src/Home";
import Detail from './src/Detail';
import NavBar from './src/components/NavBar';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={{flex: 1, paddingTop: Constants.statusBarHeight}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            header: NavBar,
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Detail" component={Detail} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
