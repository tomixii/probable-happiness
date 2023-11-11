import OpenAI from 'openai'
console.log(Bun.env.OPENAI_API_KEY)

const openai = new OpenAI({ apiKey: Bun.env.OPENAI_API_KEY })

export const getDataFromImage = async (image: string) => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    response_format: { type: 'text' },
    messages: [
      {
        role: 'user',
        content: 'what does my broken phone cost?' /*[
          {
            type: 'image_url',
            image_url: { url: image },
          },
        ],*/,
      },
    ],
  })
  console.dir(completion, { depth: null })

  const data = completion.choices[0].message.content || ''
  return { message: data }
}
