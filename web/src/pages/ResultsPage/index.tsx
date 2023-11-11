import { useLocation, useNavigate, useParams } from 'react-router'
import Button from '@mui/material/Button'
import MaterialTable from './MaterialTable'
import { ObjectInfo } from '../../types'
import rawcycle from '../../assets/rawcycle_logo.svg'

import './style.css'

const ResultsScreen = () => {
  const { itemName } = useParams()
  const { state } = useLocation()
  const navigate = useNavigate()
  const data: ObjectInfo = state?.data || null

  return (
    <div className="container">
      <img className="rawcycle-logo-results" src={rawcycle}></img>
      <h2 className="header">
        {itemName !== 'unknown' ? itemName : 'Unknown object'}
      </h2>
      {itemName === 'unknown' && (
        <div className="item-not-found">
          <p>
            Rawcycle was not able to find an object in the photo, please try
            again.
          </p>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/capture')}
          >
            Retry
          </Button>
        </div>
      )}
      {itemName !== 'unknown' && (
        <div className="button-container">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate(`/recycle/${itemName}`)}
          >
            Recycle
          </Button>
          {data?.materials?.length > 0 && (
            <Button
              variant="contained"
              size="large"
              onClick={() =>
                navigate(`/sell/${itemName}`, {
                  state: { totalValue: data.totalValue },
                })
              }
            >
              Sell
            </Button>
          )}
        </div>
      )}
      {data?.materials?.length > 0 && itemName !== 'unknown' ? (
        <MaterialTable data={data} />
      ) : null}
    </div>
  )
}

export default ResultsScreen
