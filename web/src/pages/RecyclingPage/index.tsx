import { useParams } from 'react-router'
import rawcycle from '../../assets/rawcycle_logo.svg'
import React, { useState } from 'react'
import { PropagateLoader } from 'react-spinners'
import axios from 'axios'

import './style.css'
import { Card } from '@mui/material'

const RecyclingPage = () => {
  const [loading, setLoading] = useState(false)
  const [recycleInstructions, setRecycleInstructions] = useState('')
  const { itemName } = useParams()

  React.useEffect(() => {
    setLoading(true)
    try {
      axios
        .get(`http://localhost:8080/recycle/${itemName}`)
        .then((response) => {
          setRecycleInstructions(response.data.instructions)
          setLoading(false)
        })
    } catch (err) {
      console.log('====================================')
      console.log(err)
      console.log('====================================')
    }
  }, [])

  return (
    <div className="recycle-container">
      <a href="/"><img className="rawcycle-logo-results" src={rawcycle}></img></a>
      <h1>How to recycle {itemName}</h1>
      {loading ? (
        <PropagateLoader color="white" />
      ) : (
        <Card style={{ padding: 16 }}><p>{recycleInstructions}</p></Card>
      )}
    </div>
  )
}

export default RecyclingPage
