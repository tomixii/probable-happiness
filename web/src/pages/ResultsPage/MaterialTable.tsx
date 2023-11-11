import { FC } from 'react'
import { MaterialResult } from '../../types'

interface Props {
  materials: MaterialResult[]
}

const MaterialTable: FC<Props> = ({ materials }) => {
  return (
    <div>
      {materials.map((material, index) => {
        return (
          <div key={index}>
            <p>{material.material}</p>
            <p>{material.value}</p>
            <p>{material.quantity}</p>
          </div>
        )
      })}
    </div>
  )
}

export default MaterialTable
