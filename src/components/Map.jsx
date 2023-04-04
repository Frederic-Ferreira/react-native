import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from 'react-native-elements';
import { useQuery } from "@apollo/client";
import { PLACES_QUERY } from "./Places";
import { useEffect, useState, useRef } from "react";

function MapScreen(){
    const [ markers, setMarkers ] = useState([]);
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState({
        latitude: 45.7640,
        longitude: 4.8357,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const { loading, error, data } = useQuery(PLACES_QUERY);
    const input = useRef();

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
        const { latitude, longitude, title, address, id } = suggestion;
        setSelectedLocation({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
        setMarkers([...markers, { title,
            address,
            latitude,
            longitude,
            id }])
        setSuggestions([]);
        setSearch("");
        input.current.blur();
    };

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
                        title: place.attributes.title,
                        address: place.attributes.address,
                        latitude: place.attributes.latitude,
                        longitude: place.attributes.longitude,
                        id: place.id
                    }))
            );
        }
    }, [data])

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
            <Input
                ref={input}
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
            <MapView
                style={styles.map}
                region={selectedLocation}
                >
                {markers.length > 0 && markers.map(marker => ( <Marker
                    key={marker.id}
                    coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                    title={marker.title}
                    description={marker.address}
                />))}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    searchContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
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

export default MapScreen;