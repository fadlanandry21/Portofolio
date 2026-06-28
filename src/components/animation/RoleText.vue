<template>
  <span class="neon-wrapper" aria-label="Where Innovation, Meets Creativity.">
    <span
      v-for="(segment, sIdx) in segments"
      :key="sIdx"
      :class="['neon-segment', segment.type]"
      :style="{ '--delay': `${sIdx * 320}ms` }"
    >
      {{ segment.text }}
    </span>
  </span>
</template>

<script setup>
const segments = [
  { text: '"Where ',    type: 'dim'     },
  { text: 'Innovation', type: 'keyword' },
  { text: ', ',         type: 'dim'     },
  { text: 'Meets ',     type: 'mid'     },
  { text: 'Creativity', type: 'keyword' },
  { text: '."',         type: 'dim'     },
]
</script>

<style scoped>
.neon-wrapper {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: baseline;
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.85rem, 2vw, 1.1rem);
  letter-spacing: 0.2rem;
  line-height: 1.8;
  gap: 5px;
}

/* semua segment mulai tak terlihat, reveal via flicker sekali */
.neon-segment {
  opacity: 0;
  animation: flicker 0.5s steps(1) var(--delay) forwards;
}


.neon-segment.dim     { color: #ccc; }
.neon-segment.mid     { color: #ccc; }
.neon-segment.keyword {
  color: #d2ff00;
  text-shadow: 0 0 8px #d2ff00aa, 0 0 24px #d2ff0044;
}

/* flicker masuk: 3 kedipan cepat lalu stabil */
@keyframes flicker {
  0%   { opacity: 0; }
  20%  { opacity: 1; }
  30%  { opacity: 0; }
  50%  { opacity: 1; }
  60%  { opacity: 0.4; }
  80%  { opacity: 1; }
  100% { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .neon-segment { opacity: 1; animation: none; }
}
</style>