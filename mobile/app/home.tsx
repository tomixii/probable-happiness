import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Link } from 'expo-router'
import { colors } from '../styles/colors'
import PhotoButton from '../components/PhotoButton'

const HomeScreen = () => {
  return (
    <LinearGradient colors={[colors.main, 'black']} style={styles.container}>
      <Text style={styles.headerStyle}>Rawcycle</Text>

      <Link href="/photo" asChild>
        <PhotoButton />
      </Link>
    </LinearGradient>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyle: {
    position: 'absolute',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    top: 30,
    width: '100%',
    color: 'white',
  },
  photoIconContainer: {
    borderRadius: 100,
    elevation: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 200,
  },
})
