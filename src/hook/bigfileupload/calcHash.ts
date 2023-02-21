import SparkMD5 from 'spark-md5'

type ChunkFileList = {
  file: Blob
  index: number
}[]

export const calculateHashByFilechunks = (
  chunks: ChunkFileList
): Promise<string> => {
  return new Promise(resolve => {
    const spark = new SparkMD5.ArrayBuffer()
    let count = 0

    const appendToSpark = (file: Blob) => {
      return new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = ev => {
          const buffer = ev.target.result
          spark.append(buffer as ArrayBuffer)
          resolve({})
        }
      })
    }

    const workLoop = async (deadline: IdleDeadline) => {
      if (count < chunks.length && deadline.timeRemaining() > 0) {
        await appendToSpark(chunks[count].file)
        count++
      }

      if (count === chunks.length) {
        resolve(spark.end())
      }

      window.requestIdleCallback(workLoop)
    }

    window.requestIdleCallback(workLoop)
  })
}
