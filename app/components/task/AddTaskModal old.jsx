import { Modal, Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import globalStyles from "../../styles/global";
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_URL } from '../../context/AuthContext';
import { Picker } from '@react-native-picker/picker';
import colors from "../../styles/colors";
import SvgIcon from "../SvgIcon";
import Notification from '../../components/Notification';

export default function AddTaskModal({ visible, closeModal, createTask, errorMessage, setErrorMessage, room = true}) {

    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [idType, setIdType] = useState(null);
    const [idRoom, setIdRoom] = useState(null);
    const [idUser, setIdUser] = useState(null);
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

    const onChangeDeadline = (e, selectedDate) => {
        const currentDate = selectedDate || deadline;
        setDeadline(currentDate);
    };

    // console.log('idRoom', idRoom);
    // console.log('idType', idType);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}
            statusBarTranslucent={true}
        >
            <TouchableOpacity style={styles.overlay} activeOpacity={1} onPressOut={closeModal}>
                <SafeAreaView >
                    <KeyboardAvoidingView behavior="padding" style={styles.key}>
                        <View style={styles.modalContent}>
                            {errorMessage && <Notification message={errorMessage} onHide={() => setErrorMessage(null)} />}

                            <TouchableOpacity activeOpacity={1} >

                                        <Text style={styles.title}>Ajouter une tâche</Text>

                                        <View style={styles.input_container}>
                                            <View>
                                                <Text style={globalStyles.label}>Nom</Text>
                                                <TextInput 
                                                    style={globalStyles.input} 
                                                    placeholder="Nom de la tâche"
                                                    onChangeText={(text) => setTitle(text)}
                                                    placeholderTextColor="#cecece" 
                                                    autoFocus={true}
                                                    value={title}
                                                />
                                            </View>

                                            <View>
                                                <Text style={globalStyles.label}>Date limite</Text>
                                                {showDatePicker ? 
                                                    <DateTimePicker
                                                        value={deadline}
                                                        mode="date"
                                                        display="default"
                                                        onChange={onChangeDeadline}
                                                        style={styles.date_picker}
                                                    />
                                                    :
                                                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.assign_btn}>
                                                        <SvgIcon name="add" width={20} color={colors.lightPurple} />
                                                        <Text style={styles.assign_btn_txt}>Ajouter</Text>
                                                    </TouchableOpacity>
                                                }
                                            </View>

                                            <View>
                                                <Text style={globalStyles.label}>Personne</Text>
                                                {idUser ? 
                                                    <View style={styles.members_container}>
                                                        {members.map((member, i) => (
                                                            <TouchableOpacity 
                                                                style={[
                                                                    styles.member,
                                                                    idUser === member.User.id_user && styles.activeMember
                                                                ]}
                                                                key={i} 
                                                                onPress={() => setIdUser(member.User.id_user)}
                                                            >
                                                                <Text style={styles.member__name}>{member.User.firstname}</Text>
                                                            </TouchableOpacity>
                                                        ))}
                                                    </View>
                                                    :
                                                    <TouchableOpacity onPress={() => setIdUser(members[0].User.id_user)} style={styles.assign_btn}>
                                                        <SvgIcon name="add" width={20} color={colors.lightPurple} />
                                                        <Text style={styles.assign_btn_txt}>Ajouter</Text>
                                                    </TouchableOpacity>
                                                }

                                            </View>

                                            <View>
                                                <Text style={globalStyles.label}>Type</Text>
                                                <View>
                                                    <Picker
                                                        selectedValue={idType}
                                                        onValueChange={(itemValue, itemIndex) => setIdType(itemValue)}
                                                    >
                                                        {types.map(type => (
                                                            <Picker.Item key={type.id_type} label={type.name} value={type.id_type} />
                                                        ))}
                                                    </Picker>
                                                </View>
                                            </View>

                                            {room &&
                                                <View>
                                                    <Text style={globalStyles.label}>Room</Text>
                                                    <View>
                                                        <Picker
                                                            selectedValue={idRoom}
                                                            onValueChange={(itemValue, itemIndex) => setIdRoom(itemValue)}
                                                        >
                                                            {rooms.map(room => (
                                                                <Picker.Item key={room.id_room} label={room.name} value={room.id_room} />
                                                            ))}
                                                        </Picker>
                                                    </View>
                                                </View>
                                            }
                                        </View>
                            </TouchableOpacity>
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
                                <Text style={globalStyles.btnPrimaryTxt}>Créer</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        // alignItems: 'flex-end'
        // backgroundColor: "#000000a3",
        // justifyContent: "center",
        flex: 1,
        width: '100%',
        alignItems: 'center',
        height: '100%',
        // justifyContent: 'flex-end'
    },
    key: {
        // flex: 1,
        // alignItems: 'flex-end',
        // justifyContent: 'flex-end'

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    modalContent: {
        backgroundColor: colors.white,
        borderRadius: 20,
        margin: 20,
    },
    scrollView: {    
        padding: 30,
        // height: '80%'
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold'
    },
    input_container: {
        flex: 1,
        gap: 16
    },
    btn_container: {
        margin: 30,
    },
    assign_btn: {
        borderWidth: 1,
        borderColor: colors.lightPurple,
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 8,
        borderRadius: 10,
    },
    assign_btn_txt: {
        color: colors.lightPurple
    },
    date_picker: {
        alignSelf: 'flex-start'
    },

    members_container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8
    },
    member: {
        borderWidth: 1,
        borderColor: colors.lightPurple,
        padding: 10,
        borderRadius: 10
    },
    activeMember: {
        backgroundColor: colors.lightPurple,
        color: colors.white
    },
    member__name: {
        color: colors.black
    }
});