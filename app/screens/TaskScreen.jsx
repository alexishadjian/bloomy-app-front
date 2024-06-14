import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { API_URL } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';
import Tasks from '../components/task/Tasks';
import { useEffect, useState } from 'react';
import AddTaskModal from '../components/task/AddTaskModal';
import colors from '../styles/colors';
import SvgIcon from '../components/SvgIcon';

// Start of today
const today = new Date();
today.setHours(0, 0, 0, 0); 

// Start of tomorrow
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1); 

// Start of the day after tomorrow
const dayAfterTomorrow = new Date(tomorrow);
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1); 


export default function TaskScreen({ route }) {
    
    const roomId = route.params?.roomId;
    const roomName = route.params?.roomName;
    
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [todayTasks, setTodayTasks] = useState([]);
    const [tomorrowTasks, setTomorrowTasks] = useState([]);
    const [upcomingTasks, setUpcomingTasks] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    const [roomTasks, setRoomTasks] = useState([]);


    const getTasks = async () => {
        try {
            const HOME_ID = await SecureStore.getItemAsync('HOME_ID');
            const res = await axios.get(`${API_URL}/tasks/homes/${HOME_ID}`);

            filterTasksByDeadline(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getRoomTasks = async (roomId) => {
        try {
            const res = await axios.get(`${API_URL}/tasks/rooms/${roomId}`);
            
            setRoomTasks(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createTask = async (title, deadline, type, room, user) => {
        try {
            const HOME_ID = await SecureStore.getItemAsync('HOME_ID');

            const res = await axios.post(`${API_URL}/tasks`, { 
                title: title,
                deadline: deadline,
                id_type: type,
                id_home: HOME_ID,
                id_room: (roomId) ? roomId : room,
                id_user: user,
                recurrence: 0
            });

            // if (roomId) setRoomTasks(res.data);
            if (roomId) setRoomTasks(prevTasks => [...prevTasks, res.data]);

            addTaskToCategory(res.data);
            setIsAddModalVisible(false);

        } catch (error) {
            console.log(error, error.response.data.message);
            setErrorMessage(error.response.data.message);
        }
    };

    const deleteTask = async (id) => {
        try {
            const res = await axios.delete(`${API_URL}/tasks/${id}`);

            setTodayTasks(prevTasks => prevTasks.filter(task => task.id_task !== id));
            setTomorrowTasks(prevTasks => prevTasks.filter(task => task.id_task !== id));
            setUpcomingTasks(prevTasks => prevTasks.filter(task => task.id_task !== id));

        } catch (error) {
            console.error(error);
        }
    }

    const filterTasksByDeadline = (tasks) => {

        const todayTasks = [];
        const tomorrowTasks = [];
        const upcomingTasks = [];

        tasks.forEach(task => {
            if (!task.deadline) return;

            const taskDeadline = new Date(task.deadline).getTime();
            if (taskDeadline < tomorrow.getTime()) {
                todayTasks.push(task);
            } else if (taskDeadline >= tomorrow.getTime() && taskDeadline < dayAfterTomorrow.getTime()) {
                tomorrowTasks.push(task);
            } else {
                upcomingTasks.push(task);
            }
        });

        setTodayTasks(todayTasks);
        setTomorrowTasks(tomorrowTasks);
        setUpcomingTasks(upcomingTasks);
    };

    const addTaskToCategory = (task) => {
        if (!task.deadline) return;
        
        const taskDeadline = new Date(task.deadline).getTime();
        if (taskDeadline < tomorrow.getTime()) {
            setTodayTasks(prevTasks => [...prevTasks, task]);
        } else if (taskDeadline >= tomorrow.getTime() && taskDeadline < dayAfterTomorrow.getTime()) {
            setTomorrowTasks(prevTasks => [...prevTasks, task]);
        } else {
            setUpcomingTasks(prevTasks => [...prevTasks, task]);
        }
    };

    useEffect(() => {
        if (roomId) getRoomTasks(roomId);
        else getTasks();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>

                    {!roomId &&
                        <>
                            <View style={styles.section}>
                                <Text style={styles.sub_title}>Aujourd'hui</Text>
                                {todayTasks.length > 0 ?
                                    <Tasks
                                        tasks={todayTasks} 
                                        deleteTask={deleteTask}
                                        setErrorMessage={setErrorMessage}
                                    />
                                :
                                    <Text>Aucune tâche pour aujourd'hui</Text>
                                }
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sub_title}>Demain</Text>
                                {tomorrowTasks.length > 0 ?
                                    <Tasks 
                                        tasks={tomorrowTasks}
                                        deleteTask={deleteTask}
                                        setErrorMessage={setErrorMessage}
                                    />
                                :
                                    <Text>Aucune tâche pour demain</Text>
                                }
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.sub_title}>À venir</Text>
                                {upcomingTasks.length > 0 ?
                                    <Tasks
                                        tasks={upcomingTasks}
                                        deleteTask={deleteTask}
                                        setErrorMessage={setErrorMessage}
                                    />
                                :
                                    <Text>Aucune tâche à venir</Text>
                                }
                            </View>
                        </>
                    }

                    {roomId &&
                        <View style={styles.section}>
                            {/* <Text style={styles.sub_title}>{roomName}</Text> */}
                            {roomTasks.length > 0 ?
                                <Tasks 
                                    tasks={roomTasks}
                                    deleteTask={deleteTask}
                                    setErrorMessage={setErrorMessage}
                                />
                            :
                                <Text>Aucune tâche</Text>
                            }
                        </View>
                        
                    }
            </ScrollView>

            <TouchableOpacity style={styles.add_btn} onPress={() => setIsAddModalVisible(true)}>
                <SvgIcon name="add" color={colors.white} />
            </TouchableOpacity>

            <AddTaskModal
                visible={isAddModalVisible}
                createTask={createTask}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                closeModal={() => setIsAddModalVisible(false)}
                room={!roomId}
            />
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        // justifyContent: 'center',
        minHeight: '100%',
        marginTop: 20
    },
    sub_title: {
        fontSize: 18,
        marginVertical: 15,
        fontWeight: 'bold'
    },
    section: {
        marginBottom: 30
    },
    add_btn: {
        padding: 16,
        backgroundColor: colors.purple,
        borderRadius: '50%',
        alignSelf: 'flex-end',
        margin: 20,
        position: 'absolute',
        bottom: 0,
        right: 0
    }

});
