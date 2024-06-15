import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import globalStyles from "../../styles/global";
import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import ReusableModal from "../ReusableModal";

export default function AddMemberModal({ visible, closeModal, shareCode }) {

    const [copiedText, setCopiedText] = useState(false);


    return (
        <ReusableModal visible={visible} closeModal={closeModal}>
            <Text style={styles.title}>Code de partage</Text>
            <View>
                <Text style={globalStyles.label}>Code unique à votre maison</Text>
                <TextInput
                    style={globalStyles.input} 
                    value={shareCode}
                    editable={false}
                />
                <TouchableOpacity 
                    style={[globalStyles.btnPrimary, styles.btn_container]} 
                    onPress={() => {
                        Clipboard.setStringAsync(shareCode)
                        setCopiedText(true);
                    }} 
                >
                    <Text style={globalStyles.btnPrimaryTxt}>{copiedText ? 'Copié' : 'Copier'}</Text>
                </TouchableOpacity>
            </View>
        </ReusableModal>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    btn_container: {
        marginTop: 0
    }
});