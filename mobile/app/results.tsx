import { StyleSheet, Text, View } from 'react-native'
import { Result } from '../types'

interface Props {
  results: Result[]
  objectName: string
}

const ResultsScreen = ({ results, objectName }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{objectName}</Text>
      <View>
        {results.map((result, index) => {
          return <View key={index}></View>
        })}
      </View>
    </View>
  )
}

export default ResultsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
})
