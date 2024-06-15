import { Text, TextInput, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import globalStyles from "../../styles/global";
import { useState, useRef } from 'react';
import ReusableModal from "../ReusableModal";


export default function AddRoomModal({ visible, closeModal, createRoom }) {

    const [name, setName] = useState('');
    const inputRef = useRef(null);

    return (
        <ReusableModal visible={visible} closeModal={closeModal} inputRef={inputRef}>
            <Text style={styles.title}>Ajouter une pièce</Text>
            <View>
                <Text style={globalStyles.label}>Nom</Text>
                <TextInput 
                    style={globalStyles.input} 
                    placeholder="Nom de la pièce" 
                    onChangeText={(text) => setName(text)}
                    autoFocus={true}
                    ref={inputRef}
                    value={name}
                />
                <TouchableOpacity 
                    style={[globalStyles.btnPrimary, styles.btn_container]} 
                    onPress={() => {
                        createRoom(name);
                        setName('');
                    }}
                >
                    <Text style={globalStyles.btnPrimaryTxt}>Ajouter</Text>
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