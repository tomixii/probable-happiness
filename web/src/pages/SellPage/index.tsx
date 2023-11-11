import { useLocation, useParams } from 'react-router'
import rawcycle from '../../assets/rawcycle_logo.svg'

import './style.css'
import { Button, Card } from '@mui/material'

const buyers = [
  { name: 'Gigantti' },
  { name: 'Power' },
  { name: 'Verkkokauppa.com' },
  { name: 'Fonum', url: 'https://www.fonum.fi/myy' },
  { name: 'Swappie', url: 'https://swappie.com/fi/myy/iphone/' },
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
      <a href="/">
        <img className="rawcycle-logo-results" src={rawcycle}></img>
      </a>
      <h1>Potential buyers for {itemName}</h1>
      <Card sx={{ padding: '16px', minWidth: '380px', background: 'white' }}>
        {buyers.map((buyer) => (
          <div className="sell-row" key={buyer.name}>
            <h4>{buyer.name}</h4>
            <div className="sell-row-right">
              <p>
                {getRandomValue(totalValue * 0.4, totalValue * 0.6).toFixed(1)}$
              </p>
              <Button
                variant="contained"
                target="_blank"
                href={
                  buyer.url ||
                  `https://www.google.com/maps/search/${buyer.name}`
                }
                sx={{ backgroundColor: '#F8D101', color: 'black' }}
              >
                Sell
              </Button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  )
}

export default SellPage
