import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { colors } from '../styles/colors'

interface Props {
  onPress?: () => void
}

const PhotoButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.photoIconContainer} onPress={onPress}>
      <Ionicons name="camera" color="white" size={96} />
    </TouchableOpacity>
  )
}

export default PhotoButton

const styles = StyleSheet.create({
  photoIconContainer: {
    borderRadius: 100,
    elevation: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.highlight,
    height: 200,
    width: 200,
  },
})
