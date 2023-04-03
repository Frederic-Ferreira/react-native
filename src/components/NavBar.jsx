import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import Constants from 'expo-constants'
import connectionStore from "../store/connectionStore";

function Navbar({navigation, route}) {

  const { connected } = connectionStore();
  return (
    <View style={styles.navbar}>
            {!connected ? (
                <>
                    <Text style={styles.title} onPress={() => navigation.navigate('Login')}>Login</Text>
                    <Text style={styles.title} onPress={() => navigation.navigate('Register')}>Register</Text>
                </>

                ) : (
                <>
                    <Text style={styles.title} onPress={() => navigation.navigate('Home')}>Home</Text>
                    <Text style={styles.title} onPress={() => navigation.navigate('Places')}>Places</Text>
                </>
              )}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    height: 60,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: Constants.statusBarHeight - 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  back: {
    color: '#007AFF',
  },
});

export default Navbar;
