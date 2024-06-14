import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import SvgIcon from "../SvgIcon";
import colors from "../../styles/colors";
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import * as SecureStore from 'expo-secure-store';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}


export default function Tasks({tasks, deleteTask, setErrorMessage}) {
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [checkedTasks, setCheckedTasks] = useState({});
    const [expandedTaskId, setExpandedTaskId] = useState(null);
    const [members, setMembers] = useState([]);

    const getRooms = async () => {
        try {
            const HOME_ID = await SecureStore.getItemAsync('HOME_ID');
            const res = await axios.get(`${API_URL}/rooms/homes/${HOME_ID}`);
            setRooms(res.data);
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
            setErrorMessage(error.response.data.message);
        }
    };

    useEffect(() => {
        getRooms();
        getMembers();
    }, []);

    const getRoomName = (id) => {
        const room = rooms.find(room => room.id_room === id);
        return room?.name;
    };

    const getUserName = (id) => {
        const user = members.find(member => member.User.id_user === id);
        return user?.User.firstname[0];
    };

    const toggleCheckbox = async (taskId) => {
        try {
            const res = await axios.patch(`${API_URL}/tasks/${taskId}/status`, {
                finished: !checkedTasks[taskId]
            });

            setCheckedTasks(prev => ({
                ...prev,
                [taskId]: !prev[taskId],
            }));

        } catch (error) {
            console.error(error);
            console.log(error.response.data);
            setErrorMessage(error.response.data.message);

        }
    };

    const formatDate = (rawDate) => {
        if (!rawDate) return '';
    
        const date = new Date(rawDate);
        const day = date.getDate();
        const month = date.toLocaleString('fr-FR', { month: 'long' });
        return `${day} ${month}`;
    };

    const toggleExpandTask = (taskId) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.tasks_container}>
                    {tasks.map((task, i) => (
                        <View 
                            style={[
                                styles.task, 
                                expandedTaskId === task.id_task && styles.expandedTask,
                                checkedTasks[task.id_task] && styles.checkedTask
                            ]} 
                            key={i}
                        >
                            <View style={styles.task__folded}>
                                <TouchableOpacity onPress={() => toggleCheckbox(task.id_task)} style={styles.task__checkboxContainer}>
                                    <View style={[styles.checkbox, checkedTasks[task.id_task] && styles.checkedCheckbox]}>
                                        {checkedTasks[task.id_task] && <SvgIcon name="check" color="white" width={16}/>}
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.task__content} onPress={() => toggleExpandTask(task.id_task)}>
                                    <View>
                                        <View style={styles.task__name_container}>
                                            <Text style={styles.task__name}>{task.title}</Text>
                                        </View>
                                        <View style={styles.taskInfo}>
                                            {formatDate(task.deadline) && <Text style={styles.task__date}>{formatDate(task.deadline)}</Text>}
                                        </View>
                                    </View>
                                    {task.id_user &&
                                        <View style={styles.member}>
                                            <Text style={styles.member__name}>{getUserName(task.id_user)}</Text>
                                        </View>
                                    }
                                </TouchableOpacity>
                            </View>

                            {expandedTaskId === task.id_task && (
                                <View style={styles.task__expanded}>
                                            
                                    <Text style={styles.task__room}>{getRoomName(task.id_room)}</Text>

                                    <View style={styles.task__actions}>
                                        <TouchableOpacity onPress={() => console.log('Planifier')}>
                                            <SvgIcon name="repeat" color="#aaaaaa" width={20}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => deleteTask(task.id_task)}>
                                            <SvgIcon name="delete" color="#aaaaaa" width={20}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
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
        gap: 8,
    },
    task: {
        backgroundColor: colors.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E1E1E1",
    },
    task__folded: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    // expandedTask: {
    //     padding: 16,
    // },
    task__checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        paddingRight: 10,
    },
    task__content: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingRight: 16,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: colors.lightPurple,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkedCheckbox: {
        backgroundColor: colors.lightPurple,
    },
    taskInfo: {
        flex: 1,
        flexDirection: 'row',
        gap: 6,
    },
    task__date: {
        color: '#888888',
    },
    task__room: {
        color: colors.purple,
    },
    task__name_container: {
        // width: '90%',
    },
    task__name: {
        fontSize: 18,
    },
    task__expanded: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingLeft: 46,
        paddingRight: 16,
        paddingBottom: 16
    },
    task__actions: {
        flexDirection: 'row',
        justifyContent: "flex-end",
        flex: 1,
        gap: 16,
        // paddingVertical: 16,
    },

    member: {
        // marginRight: -15,
        backgroundColor: colors.bgColor,
        borderRadius: '50%',
        padding: 4,
        borderWidth: 1,
        borderColor: colors.lightPurple,
        alignSelf: 'flex-start'
        
    },
    member__name: {
        color: colors.lightPurple,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 12,   
        aspectRatio: 1/1,
        textAlign: 'center'
    },
    checkedTask: {
        opacity: 0.5,
    },
});