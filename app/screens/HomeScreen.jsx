import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { API_URL } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';
import Rooms from '../components/room/Rooms';
import Members from '../components/member/Members';
import { useEffect, useState } from 'react';
import SvgIcon from '../components/SvgIcon';
import colors from '../styles/colors';
import HomeSettingsModal from '../components/HomeSettingsModal';



export default function HomeScreen() {

    const [home, setHome] = useState(false);
    const [isEditingHome, setIsEditingHome] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);



    const getHome = async () => {
        try {
            const HOME_ID = await SecureStore.getItemAsync('HOME_ID');

            const res = await axios.get(`${API_URL}/homes/${HOME_ID}`);
            
            setHome(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const editHome = async (name) => {
        try {
            const HOME_ID = await SecureStore.getItemAsync('HOME_ID');

            const res = await axios.put(`${API_URL}/homes/${HOME_ID}`, {
                name: name,
            });
            
            setIsEditingHome(false);
            setHome(res.data.home);
        } catch (error) {
            console.error(error);
            setErrorMessage(error.response.data.message);
        }
    };

    useEffect(() => {
        getHome();
    }, []);

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.header}>
                        <Text style={styles.title}>{home.name}</Text>
                        <TouchableOpacity
                            style={styles.userTasksButton}
                            onPress={() => setIsEditingHome(true)}
                        >
                            <SvgIcon name="parameters" color={colors.white} width={24} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Members shareCode={home.share_code} />
                    </View>

                    <View style={styles.section}>
                        <Rooms />
                    </View>

                </ScrollView>

                <HomeSettingsModal
                    visible={isEditingHome}
                    editHome={editHome}
                    home={home}
                    closeModal={() => setIsEditingHome(false)}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        padding: 15,
        minHeight: '100%'
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: colors.white,
    },
    section: {
        marginBottom: 30
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.purple,
        borderRadius: 10,
        padding: 16,
        marginVertical: 10,
    },
});