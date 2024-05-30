import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
    safeContainer: {
        backgroundColor: '#B190F3',
        flex: 1,
        width: '100%',
        alignItems: 'center',
        minHeight: '100%',
        overflow: 'hidden'
    },
    container: {
        padding: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20
    },
    bgLines: {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '-1'
    },
    logo: {
        height: 170,
        resizeMode: 'contain'
    },
    formContainer: {
        backgroundColor: "#FFFFFF",
        padding: 30,
        borderRadius: 20,
        marginTop: 50,
        width: '100%'
    },
    goToRegister: {
        fontSize: '14px',
        textAlign: 'center',
        marginTop: 10
    }
});