import { StyleSheet, View, Text, Button } from "react-native";
import {gql, useMutation, useQuery} from "@apollo/client";
import {PLACES_QUERY} from "./Places";
import {useEffect, useState} from "react";
import {Input} from "react-native-elements";


const PLACE_QUERY = gql`
query($id: ID){
  place(id: $id) {
    data{
      id
      attributes{
        title
        address
        latitude
        longitude
      }
    }
  }
}
`

const DELETE_MUTATION = gql`
mutation($id: ID!) {
  deletePlace(id: $id) {
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

const UPDATE_MUTATION = gql`
mutation($id: ID!, $data: PlaceInput!) {
  updatePlace(id: $id, data: $data) {
    data {
      id
      attributes {
        title
      }
    }
  }
}
`

export default function Place({ navigation, route }){
    const [updateMode, setUpdateMode ] = useState(false);
    const { loading, error, data } = useQuery(PLACE_QUERY, {
        variables: { id: route.params.id },
    });
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        if(data && !updateMode){
            setTitle(data.place.data.attributes.title);
            setAddress(data.place.data.attributes.address);
            setLatitude(data.place.data.attributes.latitude.toString());
            setLongitude(data.place.data.attributes.longitude.toString());
        }
    }, [data])

    const [ deletePlace ] = useMutation(DELETE_MUTATION, {
        variables: { id: route.params.id },
        refetchQueries: [
            { query: PLACES_QUERY }
            ],
        onCompleted() {
            navigation.goBack();
        },
    });

    const [ updatePlace ] = useMutation(UPDATE_MUTATION, {
        variables: { id: route.params.id },
        refetchQueries: [
            { query: PLACE_QUERY }
        ],
        onCompleted() {
            setUpdateMode(false);
        },
    });

    const handleDeletePlace = () => {
        deletePlace({ variables: { id: route.params.id } });
    };

    const handleUpdatePlace = () => {
        updatePlace({ variables: { id: route.params.id, data: { "title": title, "address": address, "longitude": +longitude, "latitude": +latitude } } });
    }

    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
        },
        buttonsContainer: {
            flex: 1,
            flexDirection: 'row',
            marginHorizontal: 10,
            marginTop: 30
        },
        place: {
            alignItems: "center",
            borderWidth: 1,
            borderColor: 'black',
            padding: 10,
            width: 300,
            minHeight: 100
        },
        title: {
            margin: 30
        },
        deleteButton: {
            marginTop: 20,
        },
        button: {
            marginTop: 20,
            backgroundColor: '#1e88e5',
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Place Detail</Text>
            {loading && <Text>Loading...</Text>}
            {data && !updateMode && (
                <View style={styles.place} key={data.place.data.attributes.id}>
                    <Text>{data.place.data.attributes.title}</Text>
                    <Text>{data.place.data.attributes.address}</Text>
                    <View>
                        <Button
                        title="Delete"
                        onPress={handleDeletePlace}
                        />
                        <Button
                            title="Update"
                            onPress={() => setUpdateMode(true)}
                        />
                    </View>
                </View>
            )}
            {data && updateMode && (
                <View style={styles.place} key={data.place.data.attributes.id}>
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
                        title="Update infos"
                        onPress={handleUpdatePlace}
                        buttonStyle={styles.button}
                    />
                </View>
            )}
            {error && <Text>{error}</Text>}
        </View>
    );
}