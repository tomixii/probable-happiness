import { useLocation, useParams } from 'react-router'
import Button from '@mui/material/Button'
import MaterialTable from './MaterialTable'
import { ObjectInfo } from '../../types'
import rawcycle from '../../assets/rawcycle_logo.svg'

import './style.css'

const ResultsScreen = () => {
  const { itemName } = useParams()
  const { state } = useLocation()
  const data: ObjectInfo = state?.data || null

  return (
    <div className="container">
      <img className="rawcycle-logo-results" src={rawcycle}></img>
      <h2 className="header">
        {itemName !== 'unknown' ? itemName : 'Unknown object'}
      </h2>
      <div className="button-container">
        <Button variant="contained" size="large">
          Recycle
        </Button>
        <Button variant="contained" size="large">
          Sell
        </Button>
      </div>
      {itemName !== 'unknown' ? <MaterialTable data={data} /> : null}
    </div>
  )
}

export default ResultsScreen
