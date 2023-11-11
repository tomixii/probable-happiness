import { useLocation, useParams } from 'react-router'
import rawcycle from '../../assets/rawcycle_logo.svg'

import './style.css'
import { Button, Card } from '@mui/material'

const buyers = [
  { name: 'Gigantti' },
  { name: 'Power' },
  { name: 'Verkkokauppa.com' },
  { name: 'Fonum' },
  { name: 'Swappie' },
]

const SellPage = () => {
  const { itemName } = useParams()
  const { state } = useLocation()
  const totalValue: number = state?.totalValue || null

  const getRandomValue = (min: number, max: number) => {
    return Math.random() * (max - min) + min
  }

  return (
    <div className="sell-container">
      <img className="rawcycle-logo-results" src={rawcycle}></img>
      <h1>Potential buyers for {itemName}</h1>
      <Card sx={{ background: '#F8D101', padding: '16px' }}>
        {buyers.map((buyer) => (
          <div key={buyer.name}>
            <h4>{buyer.name}</h4>
            <p>{getRandomValue(totalValue * 0.4, totalValue * 0.6)}$</p>
            <Button
              variant="contained"
              href={`https://www.google.com/maps/search/${buyer.name}`}
            >
              Sell
            </Button>
          </div>
        ))}
      </Card>
    </div>
  )
}

export default SellPage
