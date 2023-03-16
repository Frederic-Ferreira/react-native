import { StyleSheet, Text, View } from "react-native";

function Todos(){
    return(
        <View>
            <Text style={styles.text}>TODOS 1</Text>
            <Text style={styles.text}>TODOS 4</Text>
        </View>
    )
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

  export default Todos