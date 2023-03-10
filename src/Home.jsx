import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from "react-native";
import Todos from './components/Todos';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Todos />
      <Button title="Go todetails" onPress={() => navigation.navigate('Detail')} />
      <StatusBar backgroundColor="#4a90e2" barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "red"
  },
});
