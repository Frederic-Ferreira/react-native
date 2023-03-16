import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from "react-native";

export default function Detail() {
  return (
    <View style={styles.container}>
      <Text>This is the detail page.</Text>
      <StatusBar style="auto" />
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
