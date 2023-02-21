import { props } from '@/components/BigfileUpload/props'

type ChunkFileList = {
  file: Blob
  index: number
}[]

export type Props<T> = {
  [k in keyof T]: T[k] extends { default: infer U } ? U : T[k]
}

export const createFileChunks = (file: File, options: Props<typeof props>) => {
  let max = 1024 * 1024 * options.maxSize
  let count = Math.ceil(file.size / max)
  let index = 0
  const chunks: ChunkFileList = []

  if (count > options.maxCount) {
    max = file.size / options.maxCount
    count = options.maxCount
  }

  while (index < count) {
    chunks.push({
      file: file.slice(index * max, (index + 1) * max),
      index,
    })
    index++
  }

  return chunks
}
