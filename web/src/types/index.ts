export interface MaterialResult {
  material: string
  quantity: number
  value: number
  consumption: number
}

export interface ObjectInfo {
  name: string
  materials: MaterialResult[]
}
