import { Modal, SafeAreaView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import colors from "../styles/colors";

export default function ReusableModal({ visible, closeModal, children, inputRef, animationType = "fade", overlayStyle, modalContentStyle }) {

    const handleOnShow = () => {
        if (inputRef) {
            if (Platform.OS === 'android') {
                inputRef.current.blur();
                inputRef.current.focus();
            }
        }
    };

    return (
        <Modal
            animationType={animationType}
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}
            statusBarTranslucent={true}
            onShow={handleOnShow}
        >
            <TouchableOpacity style={[styles.overlay, overlayStyle]} activeOpacity={1} onPressOut={closeModal}>
                <KeyboardAvoidingView behavior="padding">
                    <SafeAreaView>
                        <TouchableOpacity activeOpacity={1} style={[styles.modalContent, modalContentStyle]}>
                            {children}
                        </TouchableOpacity>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "#000000a3",
        justifyContent: "center",
        paddingHorizontal: 15
    },
    modalContent: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 30,
    },
});
