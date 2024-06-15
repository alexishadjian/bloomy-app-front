import { Modal, Text, TextInput, TouchableOpacity, View, StyleSheet, Keyboard, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import globalStyles from "../../styles/global";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '../../context/AuthContext';
import { Picker } from '@react-native-picker/picker';
import colors from "../../styles/colors";
import SvgIcon from "../SvgIcon";
import Notification from '../../components/Notification';
import ReusableModal from "../ReusableModal";

export default function AddTaskModal({ visible, closeModal, createTask, errorMessage, setErrorMessage, room = true}) {

    const inputRef = useRef(null);

    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [idType, setIdType] = useState(null);
    const [idRoom, setIdRoom] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [types, setTypes] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [members, setMembers] = useState([]);


    const handleOnShow = () => {
        if (inputRef) {
            if (Platform.OS === 'android') {
                inputRef.current.blur();
                inputRef.current.focus();
            }
        }
    };


    const getTypes = async () => {
        try {
            const res = await axios.get(`${API_URL}/types`);
            setTypes(res.data);
            setIdType(res.data[0]?.id_type);
        } catch (error) {
            console.error(error);
        }
    };

    const getRooms = async () => {
        try {
            const HOME_ID = await SecureStore.getItemAsync('HOME_ID');

            const res = await axios.get(`${API_URL}/rooms/homes/${HOME_ID}`);
            setRooms(res.data);
            // setIdRoom(res.data[0]?.id_room);

        } catch (error) {
            console.error(error);
        }
    };

    const getMembers = async () => {
        try {
            const HOME_ID = await SecureStore.getItemAsync('HOME_ID');

            const res = await axios.get(`${API_URL}/homes/${HOME_ID}/members`);
            setMembers(res.data);

        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        getTypes();
        getRooms();
        getMembers();
    }, []);


    useEffect(() => {
        const keyboardHideListener = Platform.OS === 'ios'
            ? Keyboard.addListener('keyboardWillHide', closeModal)
            : Keyboard.addListener('keyboardDidHide', closeModal);

        return () => {
            keyboardHideListener.remove();
        };
    }, []);

    const onChangeDeadline = (e, selectedDate) => {
        const currentDate = selectedDate || deadline;
        setDeadline(currentDate);
    };

    // console.log('idRoom', idRoom);
    // console.log('idType', idType);

    return (
        <ReusableModal 
            animationType="animationType" 
            visible={visible} 
            closeModal={closeModal} 
            inputRef={inputRef} 
            overlayStyle={styles.customOverlay} 
            modalContentStyle={styles.customModalContent}
        >
            <View style={styles.modalContent}>
                {/* {errorMessage && <Notification message={errorMessage} onHide={() => setErrorMessage(null)} />} */}

                <View style={styles.top}>

                    <View style={styles.name_container}>
                        <TextInput 
                            // style={globalStyles.input} 
                            placeholder="Nom de la tâche"
                            onChangeText={(text) => setTitle(text)}
                            placeholderTextColor="#cecece" 
                            autoFocus={true}
                            ref={inputRef}
                            value={title}
                        />
                    </View>
                    <TouchableOpacity
                        style={[globalStyles.btnPrimary, styles.btn_container]} 
                        onPress={() => {
                            createTask(title, (showDatePicker) ? deadline : null, idType, idRoom, idUser);
                            setTitle('');
                            setDeadline(new Date());
                            setIdType(null);
                            setIdUser(null);
                            setIdRoom(null);
                        }}
                    >
                        <SvgIcon name="check" color={colors.white} />
                    </TouchableOpacity>
                            
                </View>

                <View style={styles.actions_container}>
                    
                    <TouchableOpacity style={[styles.action, styles.action_first]} onPress={closeModal}>
                        <SvgIcon name="delete" color="#aaaaaa" width={22} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action}>
                        <SvgIcon name="calendar" color="#aaaaaa" width={22} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action}>
                        <SvgIcon name="repeat" color="#aaaaaa" width={22} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action}>
                        <SvgIcon name="userplus" color="#aaaaaa" width={22} />
                    </TouchableOpacity>
                    
                </View>
            </View>
        </ReusableModal>
    );
};

const styles = StyleSheet.create({
    customOverlay: {
      flex: 1,
      justifyContent: "flex-end",
      paddingHorizontal: 0,
      backgroundColor: 'transparent'
    },
    customModalContent: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: "#E1E1E1",
        borderRadius: 24,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        padding: 30,
    },
    top: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    btn_container: {
        borderRadius: 50,
        marginTop: 0
    },
    actions_container: {
        flexDirection: 'row'
    },
    action: {
        padding: 8,
        paddingBottom: 0
    },
    action_first: {
        paddingLeft: 0
    },
});