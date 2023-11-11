export interface MaterialResult {
  material: string
  quantity: number
  value: number
  consumption: number
}

export interface ObjectInfo {
  itemName: string
  materials: MaterialResult[]
  totalValue: number
}
