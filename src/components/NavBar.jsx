import { View, StyleSheet, Text } from 'react-native';

function Navbar({navigation, route}) {

  return (
    <View style={styles.navbar}>
        {route.name === 'Home' && (
            <>
            <Text style={styles.title} onPress={() => navigation.navigate('Home')}>Home</Text>
            <Text style={styles.title} onPress={() => navigation.navigate('Detail')}>Detail</Text>
            </> 
        )}
      {route.name !== 'Home' && (
            <>
            <Text style={[styles.title, styles.back]} onPress={() => navigation.goBack()}>Back</Text>
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
