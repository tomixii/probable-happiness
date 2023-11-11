import OpenAI from 'openai'

import prices from './prices.json'

const openai = new OpenAI({ apiKey: Bun.env.OPENAI_API_KEY })

interface OpenAIResult {
  material: string
  quantity: number
}

export const getInfoFromObjectType = async (types: string[]) => {
  console.log(types)

  const messageContent = `First, find the most probable consumer product from a list of words: "Electronics,Mobile Phone,Phone" and assign the value to variable X.
  Create an exhaustive list of rare materials found in X.
  From all the items in the list create a JSON object:
  
  Use the following template for the JSON object:
  
  [
    {
      "material": "MaterialName",
      "quantity": MaterialQuantityInGrams,
      "value": MaterialValueInUSD,
      "consumption": EnergyConsumptionInKWh
    },
    ...
  ]
  
  In this JSON structure:
  
  "MaterialName" is the name of the rare material used in X.
  "MaterialQuantityInGrams" is the amount of the material in grams found in X.
  "MaterialValueInUSD" is the real-world monetary value of the material, calculated as the quantity in grams multiplied by the real-world price per gram of the material.
  "EnergyConsumptionInKWh" represents the total amount of energy required to produce the specified quantity of the material, calculated as the quantity in grams multiplied by the energy required to produce one gram of the material.
  The last object in the array will provide the total sum of all quantities, values, and energy consumption for all materials listed.`

  console.log(messageContent)

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    response_format: { type: 'text' },
    messages: [
      {
        role: 'user',
        content: messageContent,
      },
    ],
  })
  console.dir(completion, { depth: null })

  const data: OpenAIResult[] = JSON.parse(
    completion?.choices?.[0]?.message?.content || ''
  )
  console.log(data)

  const transformedResults = parseOpenAIResults(data)

  return {
    name: types[0],
    materials: transformedResults,
    totalValue: transformedResults.reduce((acc, curr) => acc + curr.value, 0),
  }
}

const parseOpenAIResults = (results: OpenAIResult[]) => {
  return results.map((result) => ({
    ...result,
    value: prices[result.material.toLowerCase()] || 0,
    consumption: 0,
  }))
}
