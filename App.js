import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import Login from './src/Login';
import Register from './src/Register';
import Home from "./src/Home";
import Detail from './src/Detail';
import NavBar from './src/components/NavBar';

const httpLink = createHttpLink({
  uri: 'https://digitalcampus.nerdy-bear.com/graphql',
});

const getJWT = async () => {
  try {
      const jwt = await AsyncStorage.getItem('jwt');
      return jwt;
  } catch (error) {
      console.log(error);
  }
};

const authLink = setContext(async (_, { headers }) => {
  const jwt = await getJWT();
  return {
    headers: {
      ...headers,
      authorization: jwt ? `Bearer ${jwt}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{
              header: NavBar,
            }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Detail" component={Detail} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </ApolloProvider>
  );
}
