import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
import Camera from 'react-html5-camera-photo'
import DotLoader from 'react-spinners/DotLoader'
import 'react-html5-camera-photo/build/css/index.css'

import './style.css'
import { useNavigate } from 'react-router'
import { ObjectInfo } from '../../types'

export default function PhotoPage() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleTakePhoto = async (dataUri: string) => {
    console.log(dataUri)
    setLoading(true)
    try {
      const response = await axios.post<unknown, AxiosResponse<ObjectInfo>>(
        'http://localhost:8080/items',
        {
          image: dataUri,
        }
      )
      if (response?.data?.itemName !== '') {
        navigate(`/results/${response.data.itemName}`, {
          state: { data: response.data },
        })
      } else {
        navigate(`/results/unknown`)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="photo-page">
      {loading ? (
        <>
          <p>Retrieving info based on your object</p>
          <DotLoader />
        </>
      ) : (
        <Camera
          onTakePhoto={(dataUri) => {
            handleTakePhoto(dataUri)
          }}
        />
      )}
    </div>
  )
}
