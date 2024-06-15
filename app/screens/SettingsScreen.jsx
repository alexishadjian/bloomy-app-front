import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Rooms from '../components/room/Rooms';
import Members from '../components/member/Members';


export default function SettingsScreen() {


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>Settings</Text>

                    <Text>Update nom email, paswword</Text>
                    <Text>Supprimer compte</Text>
                    <Text>Code de partage</Text>
                    <Text>Quitter la maison</Text>
                    <Text>Déconnexion</Text>
                    <Text>Mentions légales</Text>

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        minHeight: '100%'
    },
    title: {
        fontSize: 26,
        marginTop: 30,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    sub_title: {
        fontSize: 18,
        marginVertical: 15,
        fontWeight: 'bold'
    },
    section: {
        marginBottom: 30
    }
});