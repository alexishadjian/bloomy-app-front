import { SafeAreaView, ScrollView, StyleSheet, TextInput, Text, Button, TouchableOpacity, View } from 'react-native';
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";


export default function LoginScreen() {

    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { onLogin } = useAuth();
  
    const login = async () => {
      const res = await onLogin(email, password);
      
    //   navigation.navigate("AuthenticatedApp");

    //   console.log('res login', res);
      
      if (res && res.error) alert(res.msg);
    };




    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Se connecter</Text>
                <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} value={email}></TextInput>
                <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={true} onChangeText={(text) => setPassword(text)} value={password}></TextInput>
                <Button onPress={login} title="Connexion"></Button>

                <Button onPress={() => {navigation.navigate("register")}} title="Aller au register"></Button>
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
    }
});