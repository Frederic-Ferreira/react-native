import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { gql, useMutation } from '@apollo/client';
import { PLACES_QUERY } from "./Places";

const CREATE_PLACE_MUTATION = gql`
    mutation($data: PlaceInput!) {
      createPlace(data: $data) {
        data {
          id
          attributes {
            title
          }
        }
      }
    }
`

export default function NewPlace({ navigation }) {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    // Pass mutation to useMutation

    const handleSearch = async (value) => {
        setSearch(value);
        if(search.length >= 3){
            try {
                const response = await fetch(
                    `https://api-adresse.data.gouv.fr/search/?q=${value}&limit=5`
                );
                const data = await response.json();
                setSuggestions(data?.features?.map(feature => {
                    return {
                        title: feature.properties.label,
                        address: feature.properties.city,
                        latitude: feature.geometry.coordinates[1],
                        longitude: feature.geometry.coordinates[0],
                        id: feature.properties.id,
                    }
                }));
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleLocationSelect = (suggestion) => {
        const { latitude, longitude, title } = suggestion;
        setAddress(title);
        setLatitude(latitude.toString());
        setLongitude(longitude.toString());
        setSuggestions([]);
        setSearch("");
    };

    const [createPlace] = useMutation(CREATE_PLACE_MUTATION, {
        refetchQueries: [
            { query: PLACES_QUERY }
        ],
            onCompleted() {
            navigation.goBack();
        },
    });

    const handleCreateNewPlace = async () => {
        if(title && address && latitude && longitude){
            try{
                const place = await createPlace({ variables: { data: { "title": title, "address": address, "longitude": +longitude, "latitude": +latitude, "publishedAt": new Date() } } });
                console.log(place)
                // user && navigation.navigate('Login')
            } catch (err){
                console.log(err)
            }
        }
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Define or search</Text>
            <View style={styles.searchContainer}>
                <Input
                    // ref={input}
                    style={styles.searchInput}
                    placeholder="Search address"
                    value={search}
                    onChangeText={handleSearch}
                />
                {suggestions && suggestions.map((suggestion) => (
                    <View
                        key={suggestion.id}
                        style={styles.suggestionsContainer}
                        onTouchEnd={() => handleLocationSelect(suggestion)}
                    >
                        <Text style={styles.suggestion}>{suggestion.title}</Text>
                    </View>
                ))}
            </View>
                <Input
                    label="Title"
                    value={title}
                    onChangeText={setTitle}
                />
                <Input
                    label="Address"
                    value={address}
                    onChangeText={setAddress}
                />
                <Input
                    label="Latitude"
                    value={latitude}
                    onChangeText={setLatitude}
                    keyboardType="number-pad"
                />
                <Input
                    label="Longitude"
                    value={longitude}
                    onChangeText={setLongitude}
                    keyboardType="number-pad"
                />
                <Button
                    title="Create new place"
                    onPress={handleCreateNewPlace}
                    buttonStyle={styles.button}
                />
                {/* <Text style={styles.button} /> */}
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 100,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#1e88e5',
    },
    searchContainer: {
        position: 'relative',
        top: -50,
        width: 350,
        padding: 10,
    },
    searchInput: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
    },
    suggestionsContainer: {
        position: 'relative',
        top: -25,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        maxHeight: 150,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    suggestion: {
        padding: 10,
    },
});
