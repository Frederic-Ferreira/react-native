import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Button } from "react-native";
import { gql, useQuery } from "@apollo/client";
import {useEffect, useState} from "react";


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
    const [ markers, setMarkers ] = useState([]);
    const { loading, error, data } = useQuery(PLACES_QUERY);

    useEffect(() => {
        if (data) {
            setMarkers(
                data.places.data
                    .filter((place) =>
                        place.attributes.latitude >= -85 &&
                        place.attributes.latitude <= 85 &&
                        place.attributes.longitude >= -180 &&
                        place.attributes.longitude <= 180
                    )
                    .map((place) => ({
                        latitude: place.attributes.latitude,
                        longitude: place.attributes.longitude,
                    }))
            );
        }
    }, [data])
    console.log(markers)

    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
        },
        title: {
            fontSize: 24,
            margin: 30
        },
        place: {
            alignItems: "center",
            borderWidth: 1,
            borderColor: 'black',
            padding: 10,
            width: 300,
            minHeight: 100,
            marginTop: 20,
            shadowColor: '#000000',
            shadowOpacity: 0.2,
            shadowOffset: {
                width: 2,
                height: 2,
            },
            shadowRadius: 5,
        },
        underline: {
            textDecorationLine: 'underline',
            marginBottom: 5,
            marginTop: 2
        }
    });

    return (
        <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Places</Text>
            <Button title="+ Create a new place" onPress={() => navigation.navigate('NewPlace')} />
            {loading && <Text>Loading...</Text>}
            {data && data.places.data.map(place => (
                <TouchableOpacity key={place.id} onPress={() => navigation.navigate('Place', { id: place.id })}>
                    <View style={styles.place} >
                        <Text style={styles.underline}>Title :</Text>
                        <Text>{place.attributes.title}</Text>
                        <Text style={styles.underline}>Address :</Text>
                        <Text>{place.attributes.address}</Text>
                    </View>
                </TouchableOpacity>
                ))}
            {error && <Text>{error}</Text>}
        </ScrollView>
    );
}