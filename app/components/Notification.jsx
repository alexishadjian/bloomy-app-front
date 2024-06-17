import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import colors from '../styles/colors';

export default function Notification({ message, onHide }) {
    const [translateY] = useState(new Animated.Value(-20));
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        if (message) {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                })
            ]).start();

            const timer = setTimeout(() => {
                Animated.parallel([
                    Animated.timing(translateY, {
                        toValue: -20,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true,
                    })
                ]).start(() => {
                    onHide();
                });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    if (!message) {
        return null;
    }

    return (
        <Animated.View style={[styles.notification, { transform: [{ translateY }], opacity: fadeAnim }]}>
            <Text style={styles.message}>{message}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    notification: {
        position: 'absolute',
        backgroundColor: colors.lightPurple,
        top: 20,
        left: 20,
        right: 20,
        padding: 16,
        borderRadius: 5,
        zIndex: 10,
    },
    message: {
        color: colors.white,
        textAlign: 'center',
    },
});
