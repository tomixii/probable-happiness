import { FC } from 'react'
import { ObjectInfo } from '../../types'
import Card from '@mui/material/Card'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

interface Props {
  data: ObjectInfo
}

const MaterialTable: FC<Props> = ({ data }) => {
  return (
    <Card sx={{ padding: '16px', overflow: 'auto' }}>
      <p className="material-warning">
        Don't throw this item to mixed waste, it contains valuable materials:
      </p>
      <Table className="result-table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Material</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>
              Energy used to produce
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>{data.totalQuantity.toFixed(1)}g</TableCell>
            <TableCell>{data.totalValue.toFixed(2)}€</TableCell>
            <TableCell>{data.totalConsumption.toFixed(2)} kWh</TableCell>
          </TableRow>
          {data?.materials.map((material, index) => {
            return (
              <TableRow className="material-row" key={index}>
                <TableCell>
                  <>{material.material}</>
                  {material.critical && (
                    <p style={{ color: 'red', margin: '4px 0 0 0' }}>
                      Critical
                    </p>
                  )}
                </TableCell>
                <TableCell>{material.quantity} g</TableCell>
                <TableCell>{material.value.toFixed(2)}€</TableCell>
                <TableCell>{material.consumption.toFixed(2)} kWh</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Card>
  )
}

export default MaterialTable
