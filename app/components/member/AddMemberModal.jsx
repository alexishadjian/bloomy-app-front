import { Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import globalStyles from "../../styles/global";
import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';

export default function AddMemberModal({ visible, closeModal, shareCode }) {

    const [copiedText, setCopiedText] = useState(false);


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}
        >
            <TouchableOpacity style={styles.overlay} activeOpacity={1} onPressOut={closeModal}>
                    <SafeAreaView>
                        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
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
                        </TouchableOpacity>
                    </SafeAreaView>
            </TouchableOpacity>
        </Modal>
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
    }
});