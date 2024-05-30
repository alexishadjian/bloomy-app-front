import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { bloomyLogo, bgLines } from "../../../assets/index";
import authStyles from "../../styles/auth";
import globalStyles from "../../styles/global";


export default function AuthHomeScreen() {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={authStyles.safeContainer}>
            <Image style={authStyles.bgLines} source={bgLines}/>
            <View style={authStyles.container}>

                <Image style={authStyles.logo} source={bloomyLogo}/>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={[globalStyles.btnPrimary, styles.loginBtn]} onPress={() => {navigation.navigate("login")}}>
                        <Text style={[globalStyles.btnPrimaryTxt, styles.loginBtnTxt]}>Se connecter</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={globalStyles.btnSecondary} onPress={() => {navigation.navigate("register")}}>
                        <Text style={globalStyles.btnPrimaryTxt}>S'inscrire</Text>
                    </TouchableOpacity>
                </View>

            </View>
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