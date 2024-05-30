import { SafeAreaView, ScrollView, StyleSheet, TextInput, Image, TouchableOpacity, Text, View } from 'react-native';
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { bloomyLogo, bgLines } from "../../../assets/index";
import authStyles from "../../styles/auth";
import globalStyles from "../../styles/global";

export default function RegisterScreen({ navigation }) {

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

        <SafeAreaView style={authStyles.safeContainer}>
            <Image style={authStyles.bgLines} source={bgLines}/>
            <View style={authStyles.container}>

                <Image style={authStyles.logo} source={bloomyLogo}/>
                <View style={authStyles.formContainer}>
                    <Text style={authStyles.title}>Inscription</Text>
                    <Text style={globalStyles.label}>Prénom</Text>
                    <TextInput style={globalStyles.input} placeholder="Prénom" onChangeText={(text) => setFirstName(text)} value={firstName}></TextInput>
                    <Text style={globalStyles.label}>Nom</Text>
                    <TextInput style={globalStyles.input} placeholder="Nom" onChangeText={(text) => setLastName(text)} value={lastName}></TextInput>
                    <Text style={globalStyles.label}>Email</Text>
                    <TextInput style={globalStyles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} value={email}></TextInput>
                    <Text style={globalStyles.label}>Mot de passe</Text>
                    <TextInput style={globalStyles.input} placeholder="Mot de passe" secureTextEntry={true} onChangeText={(text) => setPassword(text)} value={password}></TextInput>
                    <TouchableOpacity style={globalStyles.btnPrimary} onPress={register}>
                        <Text style={globalStyles.btnPrimaryTxt}>Inscription</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ fontSize: '15px' }} onPress={() => {navigation.navigate("login")}}>
                        <Text style={authStyles.goToRegister}>Vous avez déjà un compte ?</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

});