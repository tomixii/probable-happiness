import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: Bun.env.OPENAI_API_KEY })

export const getInfoFromObjectType = async (types: string[]) => {
  console.log(types)

  const messageContent = `Given a set of object categories below, create a JSON object which enumerates a set of child objects.                       
  Each child object has a property named "material" and a property named "quantity".
  For each child object assign to the property named "material" a rare material generally found in the object described by provided the set of categories and to the property named "quantity" the amount of said rare material in grams.
  The resulting JSON object should be in this format: [{"material":"string","quantity":"number"}].\n\n
  The set of object categories:\n
  ${types}\n\n
  The JSON object:\n\n`

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

  const data = JSON.parse(completion?.choices?.[0]?.message?.content || '')
  console.log(data)

  return { message: data }
}
