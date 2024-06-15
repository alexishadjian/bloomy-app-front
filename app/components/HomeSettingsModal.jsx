import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import globalStyles from "../styles/global";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from 'react';
import Notification from "./Notification";
import ReusableModal from "./ReusableModal";

export default function roomModal({ visible, closeModal, editHome, home, errorMessage, setErrorMessage }) {

    const { onExitHome } = useAuth();

    const [name, setName] = useState('');

    const exit = async () => {
        const res = await onExitHome();
      
        if (res && res.error) setErrorMessage(res.msg);
    };

    useEffect(() => {
        if (home) setName(home.name);
    }, [home]);

    return (
        <ReusableModal visible={visible} closeModal={closeModal}>

            {errorMessage && <Notification message={errorMessage} onHide={() => setErrorMessage(null)} />}

            <Text style={styles.title}>Modifier la maison</Text>
            <View>
                <Text style={globalStyles.label}>Nom</Text>
                <TextInput 
                    style={globalStyles.input} 
                    placeholder="Nom de la maison" 
                    onChangeText={(text) => setName(text)} 
                    value={name}
                />
                <Text style={globalStyles.label}>Code de partage</Text>
                <TextInput
                    style={globalStyles.input} 
                    value={home.share_code}
                    editable={false}
                />
                <TouchableOpacity 
                    style={[globalStyles.btnPrimary, styles.btn_container]} 
                    onPress={() => {
                        editHome(name);
                        setName('');
                    }}
                >
                    <Text style={globalStyles.btnPrimaryTxt}>Modifier</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.leaveBtn} onPress={exit}>
                    <Text style={styles.leaveBtn_txt}>Quitter la maison</Text>
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