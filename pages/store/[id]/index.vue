<script lang="ts" setup>
import * as tf from '@tensorflow/tfjs'
import { data as e } from '../embeddings.json'
import { data as i } from '../input.json'


interface ScoreItem {
  score: number
  index: number
}



const scores = ref<ScoreItem[]>([])

const src = e.map(({ embedding }) => embedding)
const newEmbedding = i[0].embedding

// 计算余弦相似度得分
scores.value = src.map((oldEmbedding, index) => {
  const dotProduct = tf.dot(oldEmbedding, newEmbedding);
  const oldEmbeddingNorm = tf.norm(oldEmbedding);
  const newEmbeddingNorm = tf.norm(newEmbedding);
  const similarityScore = dotProduct.div(oldEmbeddingNorm.mul(newEmbeddingNorm));
  const score = similarityScore.arraySync() as number;
  return { score, index }
});

</script>

<template>
  <div>
    {{ scores.sort(({ score: a }, { score: b }) => b - a) }}
  </div>
</template>