import { useParams } from 'react-router'
import rawcycle from '../../assets/rawcycle_logo.svg'
import React, { useState } from 'react'
import { PropagateLoader } from 'react-spinners'
import axios from 'axios'

import './style.css'
import { Card, Button } from '@mui/material'

const RecyclingPage = () => {
  const [loading, setLoading] = useState(false)
  const [recycleInstructions, setRecycleInstructions] = useState('')
  const { itemName } = useParams()

  React.useEffect(() => {
    setLoading(true)
    try {
      axios
        .get(`https://rawcycle.fly.dev/recycle/${itemName}`)
        .then((response) => {
          setRecycleInstructions(response.data.instructions)
          setLoading(false)
        })
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <div className="recycle-container">
      <a href="/">
        <img className="rawcycle-logo-results" src={rawcycle}></img>
      </a>
      <h1>How to recycle {itemName}</h1>
      {loading ? (
        <PropagateLoader color="black" />
      ) : (
        <Card style={{ padding: 16, maxWidth: '400px' }}>
          <p style={{ margin: 0 }}>{recycleInstructions}</p>
        </Card>
      )}
      <Button
        variant="contained"
        target="_blank"
        href="https://www.kierratys.info/?lat=60.29&lng=24.8233&zoom=11&filters=117#"
        sx={{
          marginTop: '30px',
          backgroundColor: '#F8D101',
          color: 'black',
          ':hover': { backgroundColor: '#ceffd3' },
        }}
      >
        Recycle!
      </Button>
    </div>
  )
}

export default RecyclingPage
