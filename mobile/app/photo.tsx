import React, { createRef, useState, useEffect } from 'react'
import { Camera, CameraType } from 'expo-camera'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import axios from 'axios'
import PhotoButton from '../components/PhotoButton'

export default function PhotoScreen() {
  const [type, setType] = useState(CameraType.back)
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const cameraRef = createRef<Camera>()

  useEffect(() => {
    requestPermission()
  }, [])

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    )
  }

  const takePicture = async () => {
    console.log('lol')
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync()
      console.log(photo)
      console.log(photo.base64?.length)
      const response = await axios.post('http://localhost:8080/items', {
        image: photo.base64,
      })
      console.log(response.data)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.flipCameraContainer}>
        <TouchableOpacity onPress={toggleCameraType}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
      </View>
      <Camera style={styles.camera} type={type} ref={cameraRef}></Camera>
      <PhotoButton onPress={takePicture} />
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
  flipCameraContainer: {
    marginBottom: 40,
  },
  camera: {
    height: 640,
    width: 480,
    borderRadius: 20,
  },
  text: {
    flex: 1,
  },
})
