import { SafeAreaView, ScrollView, StyleSheet, TextInput, Button, TouchableOpacity, Text, View } from 'react-native';
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LoginScreen({ navigation }) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { onLogin, onRegister } = useAuth();
  
    const login = async () => {
      const result = await onLogin(email, password);
      
      if (result && result.error) alert(result.msg);
    };
  
    const register = async () => {
      const result = await onRegister(firstName, lastName, email, password);

      if (result && result.error) alert(result.msg);
      else login();

    };


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Se créer un compte</Text>
                <TextInput style={styles.input} placeholder="Prénom" onChangeText={(text) => setFirstName(text)} value={firstName}></TextInput>
                <TextInput style={styles.input} placeholder="Nom" onChangeText={(text) => setLastName(text)} value={lastName}></TextInput>
                <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} value={email}></TextInput>
                <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={true} onChangeText={(text) => setPassword(text)} value={password}></TextInput>
                <Button style={styles.button} onPress={register} title="S'enregistrer"></Button>
                <Button onPress={() => {navigation.navigate("login")}} title="Aller au login"></Button>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        // justifyContent: 'center',
        minHeight: '100%'
    },
    title: {
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#000000',
        borderWidth: 1,
        color: 'red',
        paddingHorizontal: 20
    }
});