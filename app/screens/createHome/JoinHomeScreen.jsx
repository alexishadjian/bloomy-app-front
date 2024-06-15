import { SafeAreaView, ScrollView, StyleSheet, TextInput, Text, Button, TouchableOpacity, View, Image, KeyboardAvoidingView } from 'react-native';
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import authStyles from "../../styles/auth";
import globalStyles from "../../styles/global";
import { bgLines, bloomyLogo } from "../../../assets/index";
import Notification from '../../components/Notification';



export default function JoinHomeScreen({navigation}) {

    const [shareCode, setShareCode] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    
    const { onJoinHome } = useAuth();
  
    const joinHome = async () => {
      const res = await onJoinHome(shareCode);
      
      if (res && res.error) setErrorMessage(res.msg);
    };



    return (
        <SafeAreaView style={authStyles.safeContainer}>
            <Image style={authStyles.bgLines} source={bgLines}/>

            <KeyboardAvoidingView behavior="padding" style={authStyles.container}>

                <Image style={authStyles.logo} source={bloomyLogo}/>
                <View style={authStyles.formContainer}>
                    {errorMessage && <Notification message={errorMessage} onHide={() => setErrorMessage(null)} />}

                    <Text style={authStyles.title}>Rejoindre une maison</Text>

                    <Text style={globalStyles.label}>Code de partage</Text>
                    <TextInput style={globalStyles.input} placeholder="4rf781o1" onChangeText={(text) => setShareCode(text)} value={shareCode}></TextInput>
                    <TouchableOpacity style={globalStyles.btnPrimary} onPress={joinHome}>
                        <Text style={globalStyles.btnPrimaryTxt}>Rejoindre</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ fontSize: '15px' }} onPress={() => {navigation.navigate("createHome")}}>
                        <Text style={authStyles.goToRegister}>Créer une maison</Text>
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