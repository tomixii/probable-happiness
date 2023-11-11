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

const findMostLikely = (labels: Label[]): string => {
  const parents = []
  labels.forEach((label) => {
    label.Parents.forEach((parent) => {
      if (!parents.includes(parent)) {
        parents.push(parent.Name)
      }
    })
  })
  const withoutParent = labels.filter((label) => {
    return !parents.includes(label.Name)
  })
  const best = withoutParent.reduce((a, b) =>
    a.Confidence > b.Confidence ? a : b
  )

  return best.Name
}
