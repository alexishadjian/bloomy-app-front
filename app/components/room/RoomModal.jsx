import { Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import globalStyles from "../../styles/global";
import { useState, useEffect } from 'react';

export default function roomModal({ visible, closeModal, editRoom, room }) {

    const [name, setName] = useState('');

    useEffect(() => {
        if (room) setName(room.name);
    }, [room]);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}
        >
            <TouchableOpacity style={styles.overlay} activeOpacity={1} onPressOut={closeModal}>
                    <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
                        <Text style={styles.title}>Modifier la pièce</Text>
                        <View>
                            <Text style={globalStyles.label}>Nom</Text>
                            <TextInput 
                                style={globalStyles.input} 
                                placeholder="Nom de la pièce" 
                                onChangeText={(text) => setName(text)} 
                                value={name}
                            />
                            <TouchableOpacity 
                                style={[globalStyles.btnPrimary, styles.btn_container]} 
                                onPress={() => {
                                    editRoom(room.id, name);
                                    setName('');
                                }}
                            >
                                <Text style={globalStyles.btnPrimaryTxt}>Modifier</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
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
        marginTop: 16
    }
});