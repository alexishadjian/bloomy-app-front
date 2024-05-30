import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({

    //**** Buttons ****//

    btnPrimary: {
        borderRadius: '5px', 
        padding: 10,
        marginTop: 20,
        backgroundColor: colors.purple,
    },
    btnPrimaryTxt: {
        color: '#FFFFFF',
        fontSize: '18px',
        textAlign: 'center' 
    },

    btnSecondary: {
        borderRadius: '5px', 
        padding: 10,
        marginTop: 20,
        backgroundColor: colors.black,
    },

    //**** Input ****//

    label: {
        marginBottom: 10
    },
    input: {
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#F5F5F5'
    },
})