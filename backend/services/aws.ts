import {
  RekognitionClient,
  DetectLabelsCommand,
  DetectCustomLabelsCommandInput,
  Label,
} from '@aws-sdk/client-rekognition'

export const detectObjectType = async (image: string) => {
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

  const validLabels = filterLabels(response?.Labels)
  const selectedLabel = findMostLikely(validLabels)
  return selectedLabel || null
}

const filterLabels = (labels: Label[]) => {
  return (
    labels?.filter(
      (label) =>
        label.Confidence > 90 &&
        !label.Categories.some((category) => category?.Name.includes('Person'))
    ) || []
  )
}

const findMostLikely = (labels: Label[]) => {
  let currentSelection = labels?.[0]?.Name
  let someChildFound = false
  const foundNames = []
  labels
    .sort((a, b) => a.Parents?.length - b.Parents?.length)
    .forEach((label) => {
      if (someChildFound && label.Parents?.length === 0) return currentSelection
      foundNames.push(label.Name)
      if (label.Parents) {
        if (
          foundNames.some((name) =>
            label.Parents.some((parent) => parent.Name === name)
          )
        ) {
          currentSelection = label.Name
        }
      }
    })
  return currentSelection
}
