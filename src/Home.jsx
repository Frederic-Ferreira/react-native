// import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text } from "react-native";

import Todos from './components/Todos';

export default function Home({ navigation }) {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the App!</Text>
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
    color: "grey",
    fontSize: 23
  },
});
