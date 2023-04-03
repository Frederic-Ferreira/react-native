import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { gql, useQuery, useMutation } from "@apollo/client";


export const PLACES_QUERY = gql`
{
  places(pagination: { limit: -1 }) {
    data {
      id
      attributes {
        title
        address
        latitude
        longitude
      }
    }
  }
 }
`

export default function Places({navigation}){
    const { loading, error, data } = useQuery(PLACES_QUERY);

    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
        },
        title: {
            margin: 30
        },
        place: {
            alignItems: "center",
            borderWidth: 1,
            borderColor: 'black',
            padding: 10,
            width: 300,
            minHeight: 100
        },
        newPlace:{
            backgroundColor: 'blue',
            padding: 10,
            borderWidth: 1,
            borderColor: 'white',
            textAlign: 'center',
            marginBottom: 20
        },
        textNewPlace:{
            color: 'white',
            fontFamily: 'Arial',
        }
    });

    data && console.log(data.places.data);

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Places</Text>
            <TouchableOpacity style={styles.newPlace} onPress={() => navigation.navigate('NewPlace')}>
                <Text style={styles.textNewPlace}>+ Create a new place</Text>
            </TouchableOpacity>
            {loading && <Text>Loading...</Text>}
            {data && data.places.data.map(place => (
                <TouchableOpacity key={place.id} onPress={() => navigation.navigate('Place', { id: place.id })}>
                    <View style={styles.place} >
                        <Text>{place.attributes.title}</Text>
                        <Text>{place.attributes.address}</Text>
                    </View>
                </TouchableOpacity>
                ))}
            {error && <Text>{error}</Text>}
        </View>
    );
}