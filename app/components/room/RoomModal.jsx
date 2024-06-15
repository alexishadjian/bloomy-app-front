import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import globalStyles from "../../styles/global";
import { useState, useEffect } from 'react';
import ReusableModal from "../ReusableModal";

export default function roomModal({ visible, closeModal, editRoom, room }) {

    const [name, setName] = useState('');

    useEffect(() => {
        if (room) setName(room.name);
    }, [room]);

    return (
        <ReusableModal visible={visible} closeModal={closeModal}>            
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