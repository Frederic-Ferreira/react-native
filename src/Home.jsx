// import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Button } from "react-native";
import Todos from './components/Todos';

export default async function Home({ navigation }) {
  const getJWT = async () => {
    try {
        const jwt = await AsyncStorage.getItem('jwt');
        return jwt;
    } catch (error) {
        console.log(error);
    }
  };

  const jwt = await getJWT()
  console.log(jwt)
  return (
    <View style={styles.container}>
      <Todos />
      <Button title="Go todetails" onPress={() => navigation.navigate('Detail')} />
      {/* <StatusBar backgroundColor="red" barStyle="light-content" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "red"
  },
});
