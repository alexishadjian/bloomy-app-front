import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import globalStyles from "../../styles/global";
import SvgIcon from "../SvgIcon";
import colors from "../../styles/colors";
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import * as SecureStore from 'expo-secure-store';



export default function Tasks({tasks, deleteTask}) {
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);

    const [rooms, setRooms] = useState([]);

    const getRooms = async () => {
        try {
            const HOME_ID = await SecureStore.getItemAsync('HOME_ID');
            const res = await axios.get(`${API_URL}/rooms/homes/${HOME_ID}`);
            setRooms(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useState(() => {
        getRooms();
    }, []);

    const getRoomName = (id) => {
        const room = rooms.find(room => room.id_room === id);
        return room?.name
    };


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.tasks_container}>
                    {tasks.map((task, i) => (
                        <TouchableOpacity style={styles.task} key={i} onPress={() => {
                            setEditingRoom({id: task.id_room, name: task.name});
                            setIsEditModalVisible(true);
                        }}>
                            <View>
                                <View style={styles.task__name_container}>
                                    <Text style={styles.task__name}>{task.title}</Text>
                                </View>
                                <View>
                                    <Text>{getRoomName(task.id_room)}</Text>
                                </View>
                                <Text>{task.id_user}</Text>
                            </View>
                            <View>
                                <Text>{task.deadline}</Text>
                            </View>
                            <View style={styles.task__actions}>
                                <TouchableOpacity onPress={() => deleteTask(task.id_task)}>
                                    <SvgIcon name="delete" color="gray" width={20}/>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}

                </View>

            </ScrollView>

        </View>
    );
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    tasks_container: {
        flex: 1,
        gap: 10
    },
    task: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E1E1E1",
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    task__name_container: {
        // width: '90%'
    },
    task__name: {
        fontSize: 18
    },
    task__actions: {
        flex: 1,
        justifyContent: "flex-end",
        flexDirection: 'row',
        gap: 16,
    },
});