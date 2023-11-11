import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { SplashScreen, Stack } from 'expo-router';

export default function App() {

    return (

        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" options={{}} />
            <Stack.Screen name="photo" options={{}} />
        </Stack>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})