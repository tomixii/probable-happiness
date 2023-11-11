import { useLocation, useParams } from 'react-router'
import MaterialTable from './MaterialTable'
import { ObjectInfo } from '../../types'

const ResultsScreen = () => {
  const { itemName } = useParams()
  const { state } = useLocation()
  const data: ObjectInfo = state?.data || null

  return (
    <div className="container">
      <h2 className="header">
        {itemName !== 'unknown' ? itemName : 'Unknown object'}
      </h2>
      {itemName !== 'unknown' ? (
        <MaterialTable materials={data.materials} />
      ) : null}
      <p>Total Value: {data.totalValue}</p>
    </div>
  )
}

export default ResultsScreen
