import { SafeAreaView, ScrollView, StyleSheet, TextInput, Image, TouchableOpacity, Text, View } from 'react-native';
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { bloomyLogo, bgLines } from "../../../assets/index";


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

        <SafeAreaView style={styles.safeContainer}>
            <Image style={styles.bgLines} source={bgLines}/>
            <View style={styles.container}>

                <Image style={styles.logo} source={bloomyLogo}/>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Inscription</Text>
                    <Text style={styles.label}>Prénom</Text>
                    <TextInput style={styles.input} placeholder="Prénom" onChangeText={(text) => setFirstName(text)} value={firstName}></TextInput>
                    <Text style={styles.label}>Nom</Text>
                    <TextInput style={styles.input} placeholder="Nom" onChangeText={(text) => setLastName(text)} value={lastName}></TextInput>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} value={email}></TextInput>
                    <Text style={styles.label}>Mot de passe</Text>
                    <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry={true} onChangeText={(text) => setPassword(text)} value={password}></TextInput>
                    <TouchableOpacity style={styles.button} onPress={register}>
                        <Text style={styles.buttonTxt}>Inscription</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ fontSize: '15px' }} onPress={() => {navigation.navigate("login")}}>
                        <Text style={styles.goToRegister}>Vous avez déjà un compte ?</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        backgroundColor: '#B190F3',
        flex: 1,
        width: '100%',
        alignItems: 'center',
        minHeight: '100%',
        overflow: 'hidden'
    },
    container: {
        padding: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20
    },
    label: {
        marginBottom: 10
    },
    input: {
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#F5F5F5'
    },
    bgLines: {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '-1'
    },
    logo: {
        height: 170,
        resizeMode: 'contain'
    },
    formContainer: {
        backgroundColor: "#FFFFFF",
        padding: 30,
        borderRadius: 20,
        marginTop: 30,
        width: '100%'
    },
    button: {
        backgroundColor: "#9261F2",
        borderRadius: '5px', 
        padding: 10,
        marginTop: 20,
    },
    buttonTxt: {
        color: '#FFFFFF',
        fontSize: '18px',
        textAlign: 'center' 
    },
    goToRegister: {
        fontSize: '14px',
        textAlign: 'center',
        marginTop: 10
    }
});