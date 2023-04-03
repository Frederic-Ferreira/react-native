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
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    // Pass mutation to useMutation
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
                <Text style={styles.title}>Fields of the new place</Text>
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
                />
                <Input
                    label="Longitude"
                    value={longitude}
                    onChangeText={setLongitude}
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
});
