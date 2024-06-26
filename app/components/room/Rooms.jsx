import { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import * as SecureStore from 'expo-secure-store';
import globalStyles from "../../styles/global";
import SvgIcon from "../SvgIcon";
import colors from "../../styles/colors";
import AddRoomModal from './AddRoomModal';
import RoomModal from './RoomModal';


export default function Rooms() {
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [rooms, setRooms] = useState([]);


    const navigation = useNavigation();



    const getRooms = async () => {
        try {
            const HOME_ID = await SecureStore.getItemAsync('HOME_ID');

            const res = await axios.get(`${API_URL}/rooms/homes/${HOME_ID}`);
            setRooms(res.data);

        } catch (error) {
            console.error(error);
        }
    };

    const createRoom = async (name) => {
        try {
            const HOME_ID = await SecureStore.getItemAsync('HOME_ID');

            const res = await axios.post(`${API_URL}/rooms`, { 
                id_home: HOME_ID,
                name: name
            });
            
            setRooms([...rooms, res.data]);
            setIsAddModalVisible(false)

        } catch (error) {
            console.log(error);
        }
    };

    const editRoom = async (id, name) => {
        try {
            const res = await axios.put(`${API_URL}/rooms/${id}`, { name: name });
    
            setRooms(rooms.map(room => room.id_room === id ? res.data : room));
            setIsEditModalVisible(false);
            setEditingRoom(null);
    
        } catch (error) {
            console.error(error);
        }
    };
    
    const deleteRoom = async (id) => {
        try {
            const res = await axios.delete(`${API_URL}/rooms/${id}`);

            setRooms(rooms.filter(room => room.id_room !== id));

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getRooms();
    }, []);
  
    return (
        <View style={styles.container}>
            
            <View style={styles.top_container}>
                <Text style={styles.sub_title}>Pièces</Text>
                <TouchableOpacity style={globalStyles.addBtn} onPress={() => setIsAddModalVisible(true)}>
                    <SvgIcon name="add" width={20}/>
                </TouchableOpacity>
            </View>

            <View style={styles.rooms_container}>
                {rooms.map((room, i) => (
                    <TouchableOpacity style={styles.room} key={i} 
                        onLongPress={() => {
                            setEditingRoom({id: room.id_room, name: room.name});
                            setIsEditModalVisible(true);
                        }}
                        onPress={() => navigation.navigate('task', { roomId: room.id_room, roomName: room.name })}
                    >
                        <View style={styles.room__name_container}>
                            <Text style={styles.room__name}>{room.name}</Text>
                        </View>
                        <View style={styles.room__actions}>
                            {/* <TouchableOpacity onPress={() => setIsAddModalVisible(true)}>
                                <SvgIcon name="edit" color="gray" width={20}/>
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={() => deleteRoom(room.id_room)}>
                                <SvgIcon name="delete" color="#aaaaaa" width={20}/>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}

                {rooms.length === 0 &&
                    <Text>Vous n'avez pas encore de pièces</Text>
                }

            </View>


            <RoomModal
                visible={isEditModalVisible}
                editRoom={editRoom}
                room={editingRoom}
                closeModal={() => setIsEditModalVisible(false)}
            />
            <AddRoomModal
                visible={isAddModalVisible}
                createRoom={createRoom}
                closeModal={() => setIsAddModalVisible(false)}
            />

        </View>
    );
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    top_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 15,

    },  
    sub_title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    rooms_container: {
        flex: 1,
        gap: 8
    },
    room: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: "#E1E1E1",
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    room__name_container: {
        width: '90%'
    },
    room__name: {
        fontSize: 18
    },
    room__actions: {
        flex: 1,
        justifyContent: "flex-end",
        flexDirection: 'row',
        gap: 16,
    },
});