import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { API_URL } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';
import Tasks from '../components/task/Tasks';
import { useEffect, useState } from 'react';
import AddTaskModal from '../components/task/AddTaskModal';
import colors from '../styles/colors';
import SvgIcon from '../components/SvgIcon';


const today = new Date();
today.setHours(0, 0, 0, 0); // Start of today
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow
const dayAfterTomorrow = new Date(tomorrow);
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1); // Start of the day after tomorrow

export default function TaskScreen() {

    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [todayTasks, setTodayTasks] = useState([]);
    const [tomorrowTasks, setTomorrowTasks] = useState([]);
    const [upcomingTasks, setUpcomingTasks] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);


    const getTasks = async () => {
        try {
            const HOME_ID = await SecureStore.getItemAsync('HOME_ID');
            const res = await axios.get(`${API_URL}/tasks/homes/${HOME_ID}`);

            filterTasksByDeadline(res.data);
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
                id_room: room,
                id_user: user,
                recurrence: 0
            });

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
        getTasks();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sub_title}>Aujourd'hui</Text>
                    <Tasks tasks={todayTasks} deleteTask={deleteTask} />
                </View>
                <View style={styles.section}>
                    <Text style={styles.sub_title}>Demain</Text>
                    <Tasks tasks={tomorrowTasks} deleteTask={deleteTask}/>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sub_title}>À venir</Text>
                    <Tasks tasks={upcomingTasks} deleteTask={deleteTask}/>
                </View>
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
            />
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        // justifyContent: 'center',
        minHeight: '100%'
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
