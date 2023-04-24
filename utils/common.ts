import * as tf from '@tensorflow/tfjs'

export const isUserAuthorRole = (role: string): role is 'user' => role === AuthorRole.USER

export const calcTopEmbeddingsIndex = (src: number[], embeddings: number[][], topN = 3) => {
  const scores = embeddings.map((e) => {
    const dotProduct = tf.dot(e, src)
    const norm = tf.norm(e)
    const srcNorm = tf.norm(src)
    const similarityScore = dotProduct.div(norm.mul(srcNorm))
    const score = similarityScore.arraySync() as number
    return score
  })

  return getTopNIndex(scores, topN)
}

export const getTopNIndex = (nums: number[], k: number) => {
  const heap = nums.slice(0, k)
  newHeap(heap)

  for (let i = k; i < nums.length; i++) {
    if (nums[i] > heap[0]) {
      heap[0] = nums[i]
      heapify(heap, 0, k)
    }
  }

  return heap.sort((a, b) => a - b).reverse().map((value) => nums.indexOf(value))
}

export const newHeap = (nums: number[]) => {
  for (let i = Math.floor(nums.length / 2) - 1; i >= 0; i--) {
    heapify(nums, i, nums.length);
  }
}

export const heapify = (nums: number[], i: number, n: number) => {
  const left = 2 * i + 1
  const right = 2 * i + 2
  let smallest = i

  if (left < n && nums[left] < nums[smallest]) {
    smallest = left
  }

  if (right < n && nums[right] < nums[smallest]) {
    smallest = right
  }

  if (smallest !== i) {
    [nums[i], nums[smallest]] = [nums[smallest], nums[i]];
    heapify(nums, smallest, n);
  }
}

