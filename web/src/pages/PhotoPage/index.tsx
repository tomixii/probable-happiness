import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
import Camera from 'react-html5-camera-photo'
import PropagateLoader from 'react-spinners/PropagateLoader'
import 'react-html5-camera-photo/build/css/index.css'

import './style.css'
import { useNavigate } from 'react-router'
import { ObjectInfo } from '../../types'

export default function PhotoPage() {
  const [loading, setLoading] = useState(false)
  const [cameraLoaded, setCameraLoaded] = useState(false)
  const [dataUri, setDataUri] = useState('')
  const navigate = useNavigate()
  const handleTakePhoto = async (dataUri: string) => {
    setDataUri(dataUri)
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
      <div
        className={`camera-container ${cameraLoaded ? 'camera-loaded' : ''}`}
      >
        {dataUri ? (
          <>
            <div className="image-preview">
              <img src={dataUri} />
            </div>
            {loading && (
              <div className="loader-container">
                <p>Rawcycling</p>
                <PropagateLoader color="white" />
              </div>
            )}
          </>
        ) : (
          <Camera
            onTakePhoto={(dataUri) => {
              handleTakePhoto(dataUri)
            }}
            onCameraStart={() => setCameraLoaded(true)}
          />
        )}
      </div>
      {!cameraLoaded && <PropagateLoader color="white" />}
    </div>
  )
}
