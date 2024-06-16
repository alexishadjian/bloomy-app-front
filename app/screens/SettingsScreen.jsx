import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import globalStyles from "../styles/global";
import axios from 'axios';
import { API_URL } from '../context/AuthContext';
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from 'react';
import ConfirmModal from '../components/ConfirmModal';
import Notification from '../components/Notification';
import colors from '../styles/colors';


export default function SettingsScreen() {

    const { onLogout } = useAuth();

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [password, setPassword] = useState(null);

    const [user, setUser] = useState();

    const [errorMessage, setErrorMessage] = useState(null);


    const getUser = async () => {
        try {
            const res = await axios.get(`${API_URL}/users`);

            setUser(res.data);
        } catch (error) {
            console.error(error);
        }
    };
  
    const logout = async () => {
      const res = await onLogout();    
    };

    const updateUser = async (oldPassword) => {

        const updates = {
            oldPassword: oldPassword,
            email: email,
            firstname: firstname,
        };

        if (password) {
            updates.newPassword = password;
        }

        try {
            const res = await axios.put(`${API_URL}/users`, updates);

        } catch (error) {
            setEmail(user.email);
            setFirstname(user.firstname);

            console.error(error);
            setErrorMessage(error.response.data.message)
        }

        setShowConfirmModal(false);
    }

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setFirstname(user.firstname);
        } 
    }, [user]);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ScrollView>
                    {errorMessage && <Notification message={errorMessage} onHide={() => setErrorMessage(null)} />}

                    <View style={globalStyles.header}>
                        <Text style={styles.title}>Paramètres</Text>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.sub_title}>Compte</Text>
                        <Text style={globalStyles.label}>Prénom</Text>
                        <TextInput style={globalStyles.input} textContentType='oneTimeCode' placeholder="prénom" onChangeText={(text) => setFirstname(text)} value={firstname}></TextInput>

                        <Text style={globalStyles.label}>Email</Text>
                        <TextInput style={globalStyles.input} textContentType='oneTimeCode' placeholder="nom@domain.com" onChangeText={(text) => setEmail(text)} value={email}></TextInput>

                        <Text style={globalStyles.label}>Mot de passe</Text>
                        <TextInput style={globalStyles.input} textContentType='oneTimeCode' placeholder="password" onChangeText={(text) => setPassword(text)} value={password} secureTextEntry={true}></TextInput>

                        <TouchableOpacity style={globalStyles.btnPrimary} onPress={() => setShowConfirmModal(true)}>
                            <Text style={globalStyles.btnPrimaryTxt}>Modifier</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                            <Text style={styles.logout_txt}>Déconnexion</Text>
                        </TouchableOpacity>
                    </View>

                    {/* <Text>Supprimer compte</Text>
                    <Text>Mentions légales</Text> */}

                </ScrollView>

                <ConfirmModal
                    visible={showConfirmModal}
                    confirm={updateUser}
                    closeModal={() => setShowConfirmModal(false)}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        justifyContent: 'center',
        minHeight: '100%'
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: colors.white,
        marginVertical: 16
    },
    sub_title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    box: {
        backgroundColor: colors.white,
        padding: 24,
        borderRadius: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#E1E1E1",
    },
    logoutBtn: {
        marginTop: 20
    },
    logout_txt: {
        color: 'red',
        textAlign: 'center',
        textDecorationLine: 'underline'
    }
});