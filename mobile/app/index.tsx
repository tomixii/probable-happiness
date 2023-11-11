import React from 'react'
import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router';
import { Stack } from 'expo-router';
import { colors } from '../styles/colors';
import PhotoButton from '../components/PhotoButton';

const HomeScreen = () => {
  return (
      <LinearGradient colors={[colors.main, 'black']} style={styles.container}>
            <Stack.Screen
                options={{
                    headerStyle: false,
                }}
            />
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
