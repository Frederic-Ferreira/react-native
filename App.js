import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import Login from './src/Login';
import Register from './src/Register';
import Home from "./src/Home";
import Detail from './src/Detail';
import NavBar from './src/components/NavBar';

const client = new ApolloClient({
  uri: 'https://digitalcampus.nerdy-bear.com/graphql',
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
