import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_URL } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';
import globalStyles from "../styles/global";
import SvgIcon from "../../app/components/SvgIcon";
import colors from "../styles/colors";


export default function Members() {

    const [members, setMembers] = useState([]);


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
  
    console.log(members);
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.members_container}>
                    {members.map((member, i) => (
                        <View style={styles.member} key={i}>
                            <Text style={styles.member__name}>{member.User.firstname[0]}</Text>
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
    members_container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    member: {
        marginRight: -15,
        backgroundColor: colors.lightPurple,
        borderRadius: '50%',
        padding: 16,
        borderWidth: 3,
        borderColor: colors.bgColor,
        
    },
    member__name: {
        color: '#FFFFFF',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontSize: 18,   
        aspectRatio: 1/1,
        textAlign: 'center'
    }
});