import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { gql, useMutation } from '@apollo/client';

const REGISTER_MUTATION = gql`
mutation($input: UsersPermissionsRegisterInput!)  {
    register(input: $input) {
    jwt
    user {
        id
        username
        email
        confirmed
        blocked
        role {
        id
        name
        description
        type
        }
    }
    }
}
`;

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // Pass mutation to useMutation
  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION);

  const handleRegister = async () => {
    if(username && email && password && confirmPassword && password === confirmPassword){
        const user = await register({ variables: { input: { "username": username, "email": email, "password": password } } });
        console.log(user)
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Register</Text>
        <Input
          label="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <Button
          title="Register"
          onPress={handleRegister}
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
