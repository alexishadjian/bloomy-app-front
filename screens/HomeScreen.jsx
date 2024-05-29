import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { useEffect, useState } from 'react';
// import Svg, { Path } from 'react-native-svg';


export default function HomeScreen({ navigation }) {


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>Homeee</Text>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        minHeight: '100%'
    },
    title: {
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold'
    },
});