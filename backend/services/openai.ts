import OpenAI from 'openai'
import CRMs from './critical_raw_materials.json'
import metals from './metals_data.json'

const openai = new OpenAI({ apiKey: Bun.env.OPENAI_API_KEY })

interface OpenAIResult {
  material: string
  quantity: number
}

export const getInfoFromObjectType = async (types: string[]) => {
  console.log(types)

  const messageContent = `[only JSON] Response with JSON only. First, find the most probable consumer product from a list of words: "${types}" and assign the value to variable X.
  Create an exhaustive list of critical raw materials found in X.
  Create a JSON object that lists all the critical raw materials in the list.. 
  
  For each critical raw material, include the following properties: 
  "material," which indicates the type of critical raw material; 
  "quantity," which specifies the amount of the material in grams;
  Use the following template for the JSON object:
  
  [
    {
      "material": "MaterialName",
      "quantity": MaterialQuantityInGrams
    },
    ...
  ]
  
  Replace "MaterialName" with the name of the material, "MaterialQuantityInGrams" with the number of grams. Assume hypothetical values where actual data is not available.`

  console.log(messageContent)

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    response_format: { type: 'text' },
    messages: [
      {
        role: 'user',
        content: messageContent,
      },
    ],
  })
  console.dir(completion, { depth: null })

  const data: any = JSON.parse(completion?.choices?.[0]?.message?.content)

  console.log(data)

  const transformedResults = parseOpenAIResults(
    Array.isArray(data) ? data : [data]
  )

  return {
    itemName: types[0],
    materials: transformedResults,
    totalQuantity: transformedResults.reduce(
      (acc, curr) => acc + curr.quantity,
      0
    ),
    totalValue: transformedResults.reduce((acc, curr) => acc + curr.value, 0),
    totalConsumption: transformedResults.reduce(
      (acc, curr) => acc + curr.consumption,
      0
    ),
  }
}

const parseOpenAIResults = (results: OpenAIResult[]) => {
  return results
    .flatMap((result) => {
      const critical = CRMs.find(
        (elem) => elem.material.toLowerCase() === result.material.toLowerCase()
      )
      const metal = metals.find(
        (elem) => elem.metal.toLowerCase() === result.material.toLowerCase()
      )
      if (!metal && !critical) return []

      const data = critical || metal
      return [
        {
          ...result,
          value: data.price_per_kg * (result.quantity / 1000),
          consumption: (data.energy_per_kg_kWh * result.quantity) / 1000,
          critical: !!critical,
        },
      ]
    })
    .sort((a, b) => (a === b ? 0 : a ? -1 : 1))
}
