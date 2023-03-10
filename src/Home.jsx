import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Todos from './components/Todos';

export default function Home() {
  return (
    <View>
      <Todos />
      {/* <Text style={styles.text}>Open up App.js to start working on your app!</Text> */}
      <StatusBar style="auto" />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     color: "red"
//   },
// });
