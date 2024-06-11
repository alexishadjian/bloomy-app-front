import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Rooms from '../components/Rooms';
import Members from '../components/Members';


export default function HomeScreen() {


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>Nom de la maison</Text>

                    <View style={styles.section}>
                        <Text style={styles.sub_title}>Membres</Text>
                        <Members />
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sub_title}>Pièces</Text>
                        <Rooms />
                    </View>

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