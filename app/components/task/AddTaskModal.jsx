import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Keyboard, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SvgIcon from "../SvgIcon";
import Notification from '../../components/Notification';
import ReusableModal from "../ReusableModal";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '../../context/AuthContext';
import colors from "../../styles/colors";
import globalStyles from "../../styles/global";
import ReusableSelect from "../ReusableSelect";

const recurrenceOptions = [
    { label: 'Ne pas répéter', value: 0 },
    { label: 'Tous les jours', value: 1 },
    { label: 'Toutes les semaines', value: 7 },
    { label: 'Tous les mois', value: 30 },
];

export default function AddTaskModal({ visible, closeModal, createTask, errorMessage, setErrorMessage, inRoom, navigation }) {
    
    const inputRef = useRef(null);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showRecurrenceMenu, setShowRecurrenceMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showRoomMenu, setShowRoomMenu] = useState(false);

    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState(null);
    const [idType, setIdType] = useState(1);
    const [idRoom, setIdRoom] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [recurrence, setRecurrence] = useState(0);

    const [types, setTypes] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [members, setMembers] = useState([]);

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

            const rooms = res.data.map(room => ({
                label: room.name,
                value: room.id_room
            }));
    
            setRooms(rooms);
        } catch (error) {
            console.error(error);
        }
    };

    const getMembers = async () => {
        try {
            const HOME_ID = await SecureStore.getItemAsync('HOME_ID');
            const res = await axios.get(`${API_URL}/homes/${HOME_ID}/members`);

            const members = res.data.map(member => ({
                label: member.User.firstname,
                value: member.User.id_user
            }));
            setMembers(members);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getTypes();
            getRooms();
            getMembers();
        });
      
        return unsubscribe;

    }, [navigation]);

    useEffect(() => {
        const keyboardHideListener = Platform.OS === 'ios'
            ? Keyboard.addListener('keyboardWillHide', () => {
                if (!showDatePicker) {
                    closeModal();
                }
            })
            : Keyboard.addListener('keyboardDidHide', () => {
                if (!showDatePicker) {
                    closeModal();
                }
            });

        return () => {
            keyboardHideListener.remove();
        };
    }, [showDatePicker, showRecurrenceMenu]);

    const onChangeDeadline = (selectedDate) => {
        const currentDate = selectedDate || deadline;
        setShowDatePicker(false);
        setDeadline(currentDate);
    };


    const closeMenus = () => {
        setShowDatePicker(false);
        setShowRecurrenceMenu(false);
        setShowRoomMenu(false);
        setShowUserMenu(false);
    }

    const resetTask = () => {
        closeModal();
        
        setTitle('');
        setDeadline(null);
        setIdType(1);
        setIdRoom(null);
        setIdUser(null);
        setRecurrence(0);
    }


    return (
        <ReusableModal 
            animationType="fade" 
            visible={visible} 
            closeModal={closeModal} 
            inputRef={inputRef} 
            overlayStyle={styles.customOverlay} 
            modalContentStyle={styles.customModalContent}
        >
            <View style={styles.modalContent}>
                {errorMessage && <Notification message={errorMessage} onHide={() => setErrorMessage(null)} />}

                <View style={styles.top}>
                    <View style={styles.name_container}>
                        <TextInput 
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
                            createTask(title, deadline, idType, idRoom, idUser, recurrence);
                            setTitle('');
                            setDeadline(null);
                            setIdType(1);
                            setIdUser(null);
                            setIdRoom(null);
                            setRecurrence(0);
                        }}
                    >
                        <SvgIcon name="check" color={colors.white} />
                    </TouchableOpacity>
                </View>

                <View style={styles.actions_container}>
                    <TouchableOpacity style={[styles.action, styles.action_first]} onPress={() => resetTask()}>
                        <SvgIcon name="delete" color="#aaaaaa" width={22} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={() => { closeMenus(); setShowDatePicker(true) }}>
                        <SvgIcon name="calendar" color={deadline ? colors.primary : "#aaaaaa"} width={22} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={() => { closeMenus(); setShowRecurrenceMenu(!showRecurrenceMenu)} }>
                        <SvgIcon name="repeat" color={recurrence != 0 ? colors.primary : "#aaaaaa"} width={22} />
                    </TouchableOpacity>
                    {!inRoom && rooms.length > 0 &&
                        <TouchableOpacity style={styles.action} onPress={() => { closeMenus(); setShowRoomMenu(!showRoomMenu)} }>
                            <SvgIcon name="home" color={idRoom ? colors.primary : "#aaaaaa"} width={22} />
                        </TouchableOpacity>
                    } 
                    <TouchableOpacity style={styles.action} onPress={() => { closeMenus(); setShowUserMenu(!showUserMenu)} }>
                        <SvgIcon name="userplus" color={idUser ? colors.primary : "#aaaaaa"} width={22} />
                    </TouchableOpacity>
                </View>

                {showRecurrenceMenu && (
                    <ReusableSelect options={recurrenceOptions} showMenu={setShowRecurrenceMenu} action={setRecurrence} />
                )}

                {showUserMenu && ( 
                    <ReusableSelect options={members} showMenu={setShowUserMenu} action={setIdUser} />
                )}

                {showRoomMenu && ( 
                    <ReusableSelect options={rooms} showMenu={setShowRoomMenu} action={setIdRoom} />
                )}

                {Platform.OS === 'android' && showDatePicker && (
                    <DateTimePicker
                        value={deadline || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, date) => {
                            onChangeDeadline(date);
                        }}
                        style={{ width: '100%' }}
                    />
                )}

                {Platform.OS === 'ios' && (
                    <DateTimePickerModal
                        isVisible={showDatePicker}
                        mode="date"
                        onConfirm={onChangeDeadline}
                        isDarkModeEnabled={true}
                        onCancel={() => setShowDatePicker(false)}
                        date={deadline || new Date()}
                        display="inline"
                    />
                )}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    name_container: {
        width: '80%',
    },
    btn_container: {
        borderRadius: 50,
        padding: 10,
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
    modalContent: {
        position: 'relative', // Ensure the modal content container can stack above the recurrence menu
    },
});