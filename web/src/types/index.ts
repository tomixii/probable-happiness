export interface MaterialResult {
  material: string
  critical: boolean
  quantity: number
  value: number
  consumption: number
}

export interface ObjectInfo {
  itemName: string
  materials: MaterialResult[]
  totalQuantity: number
  totalValue: number
  totalConsumption: number
}
