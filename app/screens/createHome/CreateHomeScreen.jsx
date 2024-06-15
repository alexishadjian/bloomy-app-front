import { SafeAreaView, ScrollView, StyleSheet, TextInput, Text, Button, TouchableOpacity, View, Image, KeyboardAvoidingView } from 'react-native';
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import authStyles from "../../styles/auth";
import globalStyles from "../../styles/global";
import { bgLines, bloomyLogo } from "../../../assets/index";
import Notification from '../../components/Notification';



export default function CreateHomeScreen({navigation}) {

    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    const { onCreateHome } = useAuth();
  
    const createHome = async () => {
        const res = await onCreateHome(name);
        
        if (res && res.error) setErrorMessage(res.msg);
    };


    return (
        <SafeAreaView style={authStyles.safeContainer}>
            <Image style={authStyles.bgLines} source={bgLines}/>

            <KeyboardAvoidingView behavior="padding" style={authStyles.container}>

                <Image style={authStyles.logo} source={bloomyLogo}/>

                <View style={authStyles.formContainer}>
                    {errorMessage && <Notification message={errorMessage} onHide={() => setErrorMessage(null)} />}

                    <Text style={authStyles.title}>Créer une maison</Text>

                    <Text style={globalStyles.label}>Nom</Text>
                    <TextInput style={globalStyles.input} placeholder="Nom de la maison" onChangeText={(text) => setName(text)} value={name}></TextInput>
                    <TouchableOpacity style={globalStyles.btnPrimary} onPress={createHome}>
                        <Text style={globalStyles.btnPrimaryTxt}>Créer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ fontSize: '15px' }} onPress={() => {navigation.navigate("joinHome")}}>
                        <Text style={authStyles.goToRegister}>Rejoindre une maison</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        padding: 30,
        marginTop: 50,
        width: '100%'
    },
    loginBtn: {
        backgroundColor: '#FFFFFF'
    },
    loginBtnTxt: {
        color: '#000000'
    }
});