import {
  RekognitionClient,
  DetectLabelsCommand,
  DetectCustomLabelsCommandInput,
} from '@aws-sdk/client-rekognition'

export const detectObjectType = async (image: string) => {
  // a client can be shared by different commands.
  const client = new RekognitionClient({ region: 'eu-west-1' })

  const params: DetectCustomLabelsCommandInput = {
    Image: {
      Bytes: Buffer.from(image.split(',')[1], 'base64'),
    },
    MinConfidence: 80,
    ProjectVersionArn: undefined,
  }
  const command = new DetectLabelsCommand(params)
  const response = await client.send(command)
  console.log(console.dir(response, { depth: null }))

  const validLabels = response.Labels?.filter((label) => label.Confidence > 98)
  const setOfLabels = new Set(validLabels?.map((label) => label.Name))

  return [...setOfLabels] || null
}
