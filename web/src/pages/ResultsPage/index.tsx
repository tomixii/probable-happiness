import { useLocation, useParams } from 'react-router'
import MaterialTable from './MaterialTable'

const ResultsScreen = () => {
  const { itemName } = useParams()
  const { state } = useLocation()

  return (
    <div className="container">
      <h2 className="header">
        {itemName !== 'unknown' ? itemName : 'Unknown object'}
      </h2>
      {itemName !== 'unknown' ? (
        <MaterialTable materials={state.materials} />
      ) : null}
    </div>
  )
}

export default ResultsScreen
