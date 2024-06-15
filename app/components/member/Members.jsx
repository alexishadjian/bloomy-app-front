import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_URL } from '../../context/AuthContext';
import * as SecureStore from 'expo-secure-store';
import globalStyles from "../../styles/global";
import SvgIcon from "../SvgIcon";
import colors from "../../styles/colors";
import AddMemberModal from './AddMemberModal';


export default function Members({ shareCode }) {

    const [members, setMembers] = useState([]);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);



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
        getMembers();
    }, []);
  
    return (
        <View style={styles.container}>
                <View style={styles.top_container}>
                    <Text style={styles.sub_title}>Membres</Text>
                    <TouchableOpacity style={globalStyles.addBtn} onPress={() => setIsAddModalVisible(true)}>
                        <SvgIcon name="add" width={20}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.members_container}>
                    {members.map((member, i) => (
                        <View style={styles.member} key={i}>
                            <Text style={styles.member__name}>{member.User.firstname[0]}</Text>
                        </View>
                    ))}
                </View>

                <AddMemberModal
                    visible={isAddModalVisible}
                    closeModal={() => setIsAddModalVisible(false)}
                    shareCode={shareCode}
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
    members_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    member: {
        marginRight: -15,
        backgroundColor: colors.white,
        borderRadius: '50%',
        padding: 16,
        borderWidth: 1,
        borderColor: colors.lightPurple,
        
    },
    member__name: {
        color: colors.lightPurple,
        textTransform: 'uppercase',
        fontWeight: '500',
        fontSize: 18,   
        aspectRatio: 1/1,
        textAlign: 'center'
    }
});