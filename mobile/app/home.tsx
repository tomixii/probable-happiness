import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';

export default function App() {

    return (
        <View style={styles.container}>

            <Link href="/photo" asChild>
                <Ionicons name="md-checkmark-circle" size={32} color="green" />
            </Link>

        </View>
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
