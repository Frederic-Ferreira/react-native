// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from "react-native";
import Todos from './components/Todos';

export default function Home({ navigation }) {
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
