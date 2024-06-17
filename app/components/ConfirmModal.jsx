import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import globalStyles from "../styles/global";
import { useState, useEffect } from 'react';
import Notification from "./Notification";
import ReusableModal from "./ReusableModal";

export default function ConfirmModal({ visible, closeModal, confirm, errorMessage, setErrorMessage }) {

    const [password, setPassword] = useState();

    return (
        <ReusableModal visible={visible} closeModal={closeModal}>

            {errorMessage && <Notification message={errorMessage} onHide={() => setErrorMessage(null)} />}

            <Text style={styles.title}>Confirmer</Text>
            <View>
                <Text style={globalStyles.label}>Mot de passe</Text>
                <TextInput 
                    style={globalStyles.input} 
                    placeholder="Mot de passe" 
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                    textContentType='oneTimeCode'
                    value={password}
                />
                <TouchableOpacity 
                    style={[globalStyles.btnPrimary, styles.btn_container]} 
                    onPress={() => {
                        confirm(password);
                        setPassword('');
                    }}
                >
                    <Text style={globalStyles.btnPrimaryTxt}>Confirmer</Text>
                </TouchableOpacity>
            </View>
        </ReusableModal>
    );
};

const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "#000000a3",
      justifyContent: "center",
      paddingHorizontal: 15
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 30,
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    btn_container: {
        marginTop: 16
    },
    leaveBtn: {
        marginTop: 20
    },
    leaveBtn_txt: {
        color: 'red',
        textAlign: 'center',
        textDecorationLine: 'underline'
    }
});