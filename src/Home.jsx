import { StyleSheet, View, Text, Animated } from "react-native";

import Todos from './components/Todos';
import {useEffect, useRef, useState} from "react";

export default function Home({ navigation }) {
    const translateY = useRef(new Animated.Value(-500)).current;
    const [rotateAnimation] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [translateY]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            Animated.loop(
                Animated.timing(rotateAnimation, {
                    toValue: 5,
                    duration: 1000,
                    useNativeDriver: true,
                })
            ).start();
        }, 1000);

        return () => clearTimeout(timeout);
    }, [rotateAnimation]);


    const rotateInterpolate = rotateAnimation.interpolate({
        inputRange: [0, 1, 2, 3, 4],
        outputRange: ['0deg', '-10deg', '0deg', '40deg', '0deg'],
    });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the App!</Text>
        <Animated.Text style={[
            styles.emoji,
            { transform: [{ translateY }, { rotate: rotateInterpolate }] },
        ]}>
        👋
        </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "grey",
    fontSize: 23
  },
    emoji: {
        fontSize: 25,
    },
});
