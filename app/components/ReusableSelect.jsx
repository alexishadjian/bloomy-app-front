import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import colors from "../styles/colors";

export default function ReusableSelect({ options, showMenu, action }) {

    const onPress = (value) => {
        action(value);
        showMenu(false);
    }

    return (
        <View style={styles.select}>
            {options.map((option, i) => (
                <TouchableOpacity style={styles.option} key={i} onPress={() => onPress(option.value)}>
                    <Text>{option.label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    select: {
        position: 'absolute',
        // top: -125,
        bottom: '40%',
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E1E1E1',
        // maxHeight: 150,
        // overflow: 'scroll'
        // zIndex: 1000,
    },
    option: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E1E1E1'
    },
    recurrenceOptionText: {
        fontSize: 16,
        color: '#333333'
    },
});
