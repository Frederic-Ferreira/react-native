import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { gql, useMutation } from '@apollo/client';

const LOGIN_MUTATION = gql`
mutation($input: UsersPermissionsLoginInput!) {
  login(input: $input){
    jwt
  }
}
`;

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    if(email && password){
      try{
        const { data } = await login({ variables: { input: { "identifier": email, "password": password } } });
        await AsyncStorage.setItem('jwt', data.login.jwt);
        navigation.navigate('Home')
      } catch (err){
        console.log(err)
      }
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Log In</Text>
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCompleteType="email"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCompleteType="password"
        />
        <Button
          title="Login"
          onPress={handleLogin}
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
