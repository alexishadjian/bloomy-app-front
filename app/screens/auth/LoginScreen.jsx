import { SafeAreaView, ScrollView, StyleSheet, TextInput, Text, Button, TouchableOpacity, View, Image } from 'react-native';
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { bloomyLogo, bgLines } from "../../../assets/index";
import authStyles from "../../styles/auth";
import globalStyles from "../../styles/global";


export default function LoginScreen() {

    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { onLogin } = useAuth();
  
    const login = async () => {
      const res = await onLogin(email, password);
    
      
      if (res && res.error) alert(res.msg);
    };




    return (
        <SafeAreaView style={authStyles.safeContainer}>
            <Image style={authStyles.bgLines} source={bgLines}/>
            <View style={authStyles.container}>

                <Image style={authStyles.logo} source={bloomyLogo}/>
                <View style={authStyles.formContainer}>
                    <Text style={authStyles.title}>Se connecter</Text>
                    <Text style={globalStyles.label}>Email</Text>
                    <TextInput style={globalStyles.input} placeholder="Email" onChangeText={(text) => setEmail(text)} value={email}></TextInput>
                    <Text style={globalStyles.label}>Mot de passe</Text>
                    <TextInput style={globalStyles.input} placeholder="Mot de passe" secureTextEntry={true} onChangeText={(text) => setPassword(text)} value={password}></TextInput>
                    <TouchableOpacity style={globalStyles.btnPrimary} onPress={login}>
                        <Text style={globalStyles.btnPrimaryTxt}>Connexion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ fontSize: '15px' }} onPress={() => {navigation.navigate("register")}}>
                        <Text style={authStyles.goToRegister}>Vous n'avez pas de compte ?</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

});