import { useParams } from 'react-router'
import rawcycle from '../../assets/rawcycle_logo.svg'
import React, { useState } from 'react'
import { PropagateLoader } from 'react-spinners'
import axios from 'axios'

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
    <div className="container">
      <img className="rawcycle-logo-results" src={rawcycle}></img>
      <h1>How to recycle</h1>
      <h4>{itemName}</h4>
      {loading ? (
        <PropagateLoader color="white" />
      ) : (
        <p>{recycleInstructions}</p>
      )}
    </div>
  )
}

export default RecyclingPage
