import { StyleSheet } from "react-native";
import colors from "./colors";

export default StyleSheet.create({

    //**** Buttons ****//

    btnPrimary: {
        borderRadius: 5, 
        padding: 10,
        marginTop: 20,
        backgroundColor: colors.purple,
    },
    btnPrimaryTxt: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center' 
    },

    btnSecondary: {
        borderRadius: 5, 
        padding: 10,
        marginTop: 20,
        backgroundColor: colors.black,
    },

    addBtn: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#b190f329',   
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 12
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